import { mutationGeneric as mutation } from "convex/server";
import { v } from "convex/values";

export const createServer = mutation({
  args: {
    name: v.string(),
    ownerId: v.id("users"),
    iconUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const serverId = await ctx.db.insert("servers", {
      name: args.name,
      ownerId: args.ownerId,
      iconUrl: args.iconUrl,
    });
    await ctx.db.insert("members", {
      serverId,
      userId: args.ownerId,
      role: "owner",
    });
    return serverId;
  },
});

export const updateServer = mutation({
  args: {
    serverId: v.id("servers"),
    name: v.optional(v.string()),
    iconUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { serverId, ...patch } = args;
    await ctx.db.patch(serverId, patch);
    return serverId;
  },
});

export const deleteServer = mutation({
  args: { serverId: v.id("servers") },
  handler: async (ctx, args) => {
    const channels = await ctx.db
      .query("channels")
      .withIndex("by_server", (q) => q.eq("serverId", args.serverId))
      .collect();
    for (const channel of channels) {
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_channel", (q) => q.eq("channelId", channel._id))
        .collect();
      for (const message of messages) await ctx.db.delete(message._id);
      await ctx.db.delete(channel._id);
    }
    const members = await ctx.db
      .query("members")
      .withIndex("by_server", (q) => q.eq("serverId", args.serverId))
      .collect();
    for (const member of members) await ctx.db.delete(member._id);
    await ctx.db.delete(args.serverId);
  },
});
