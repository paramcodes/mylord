import { mutationGeneric as mutation } from "convex/server";
import { v } from "convex/values";

export const send = mutation({
  args: {
    channelId: v.id("channels"),
    authorId: v.id("users"),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      channelId: args.channelId,
      authorId: args.authorId,
      body: args.body,
      createdAt: Date.now(),
    });
  },
});

export const edit = mutation({
  args: {
    messageId: v.id("messages"),
    authorId: v.id("users"),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);
    if (!message) throw new Error("Message not found");
    if (message.authorId !== args.authorId) throw new Error("Not authorized");
    await ctx.db.patch(args.messageId, {
      body: args.body,
      editedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: {
    messageId: v.id("messages"),
    authorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);
    if (!message) throw new Error("Message not found");
    if (message.authorId !== args.authorId) throw new Error("Not authorized");
    await ctx.db.delete(args.messageId);
  },
});
