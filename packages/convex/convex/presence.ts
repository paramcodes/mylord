import { mutationGeneric as mutation, queryGeneric as query } from "convex/server";
import { v } from "convex/values";

export const setPresence = mutation({
  args: {
    userId: v.id("users"),
    serverId: v.optional(v.id("servers")),
    channelId: v.optional(v.id("channels")),
    status: v.union(v.literal("online"), v.literal("away")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("presence")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();
    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, {
        serverId: args.serverId,
        channelId: args.channelId,
        status: args.status,
        lastSeen: now,
      });
      return existing._id;
    }
    return await ctx.db.insert("presence", {
      userId: args.userId,
      serverId: args.serverId,
      channelId: args.channelId,
      status: args.status,
      lastSeen: now,
    });
  },
});

export const clearPresence = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("presence")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();
    if (existing) await ctx.db.delete(existing._id);
  },
});

export const listPresence = query({
  args: { serverId: v.id("servers") },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("presence")
      .withIndex("by_server", (q) => q.eq("serverId", args.serverId))
      .collect();
    const cutoff = Date.now() - 60000;
    return rows.filter((r) => r.lastSeen >= cutoff);
  },
});
