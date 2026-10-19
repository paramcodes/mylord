import { mutationGeneric as mutation, queryGeneric as query } from "convex/server";
import { v } from "convex/values";

export const setTyping = mutation({
  args: {
    userId: v.id("users"),
    channelId: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("typing")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    const now = Date.now();
    const current = existing.find((r) => r.channelId === args.channelId);
    if (current) {
      await ctx.db.patch(current._id, { lastTyped: now });
      return current._id;
    }
    return await ctx.db.insert("typing", {
      userId: args.userId,
      channelId: args.channelId,
      lastTyped: now,
    });
  },
});

export const clearTyping = mutation({
  args: { userId: v.id("users"), channelId: v.id("channels") },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("typing")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    for (const r of rows) {
      if (r.channelId === args.channelId) await ctx.db.delete(r._id);
    }
  },
});

export const listTyping = query({
  args: { channelId: v.id("channels") },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("typing")
      .withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
      .collect();
    const cutoff = Date.now() - 5000;
    return rows.filter((r) => r.lastTyped >= cutoff);
  },
});
