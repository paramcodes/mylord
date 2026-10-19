import { mutationGeneric as mutation, queryGeneric as query } from "convex/server";
import { v } from "convex/values";

export const markRead = mutation({
  args: { userId: v.id("users"), channelId: v.id("channels") },
  handler: async (ctx, args) => {
    const reads = await ctx.db
      .query("reads")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    const existing = reads.find((r) => String(r.channelId) === String(args.channelId));
    const now = Date.now();
    if (existing) await ctx.db.patch(existing._id, { lastReadAt: now });
    else await ctx.db.insert("reads", { ...args, lastReadAt: now });
  },
});

export const unreadCounts = query({
  args: { userId: v.id("users"), channelIds: v.array(v.id("channels")) },
  handler: async (ctx, args) => {
    const result: { channelId: string; count: number; mentions: number }[] = [];
    for (const channelId of args.channelIds) {
      const reads = await ctx.db
        .query("reads")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .collect();
      const read = reads.find((r) => String(r.channelId) === String(channelId));
      const lastReadAt = read?.lastReadAt ?? 0;
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_channel", (q) => q.eq("channelId", channelId))
        .collect();
      let count = 0;
      let mentions = 0;
      for (const m of messages) {
        if (m.createdAt <= lastReadAt) continue;
        if (m.authorId === args.userId) continue;
        count += 1;
        if (m.body.includes("@")) mentions += 1;
      }
      result.push({ channelId: String(channelId), count, mentions });
    }
    return result;
  },
});
