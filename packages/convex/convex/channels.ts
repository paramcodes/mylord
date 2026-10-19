import { mutationGeneric as mutation } from "convex/server";
import { v } from "convex/values";

export const createChannel = mutation({
  args: {
    serverId: v.id("servers"),
    name: v.string(),
    type: v.union(v.literal("text"), v.literal("voice")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("channels", args);
  },
});

export const updateChannel = mutation({
  args: {
    channelId: v.id("channels"),
    name: v.optional(v.string()),
    type: v.optional(v.union(v.literal("text"), v.literal("voice"))),
  },
  handler: async (ctx, args) => {
    const { channelId, ...patch } = args;
    await ctx.db.patch(channelId, patch);
    return channelId;
  },
});

export const deleteChannel = mutation({
  args: { channelId: v.id("channels") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_channel", (q) => q.eq("channelId", args.channelId))
      .collect();
    for (const message of messages) await ctx.db.delete(message._id);
    await ctx.db.delete(args.channelId);
  },
});
