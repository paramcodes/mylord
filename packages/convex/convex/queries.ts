import { queryGeneric as query, paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

export const listChannels = query({
  args: { serverId: v.id("servers") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("channels")
      .withIndex("by_server", (q) => q.eq("serverId", args.serverId))
      .collect();
  },
});

export const paginatedMessages = query({
  args: {
    channelId: v.id("channels"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_channel_created_at", (q) => q.eq("channelId", args.channelId))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
