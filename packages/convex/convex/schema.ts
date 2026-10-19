import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),

  servers: defineTable({
    name: v.string(),
    ownerId: v.id("users"),
    iconUrl: v.optional(v.string()),
  }).index("by_owner", ["ownerId"]),

  channels: defineTable({
    serverId: v.id("servers"),
    name: v.string(),
    type: v.union(v.literal("text"), v.literal("voice")),
  }).index("by_server", ["serverId"]),

  messages: defineTable({
    channelId: v.id("channels"),
    authorId: v.id("users"),
    body: v.string(),
    createdAt: v.number(),
    editedAt: v.optional(v.number()),
  })
    .index("by_channel", ["channelId"])
    .index("by_author", ["authorId"])
    .index("by_created_at", ["createdAt"])
    .index("by_channel_created_at", ["channelId", "createdAt"]),

  members: defineTable({
    serverId: v.id("servers"),
    userId: v.id("users"),
    role: v.union(v.literal("owner"), v.literal("admin"), v.literal("member")),
  })
    .index("by_server", ["serverId"])
    .index("by_user", ["userId"])
    .index("by_server_user", ["serverId", "userId"]),

  presence: defineTable({
    userId: v.id("users"),
    serverId: v.optional(v.id("servers")),
    channelId: v.optional(v.id("channels")),
    status: v.union(v.literal("online"), v.literal("away")),
    lastSeen: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_server", ["serverId"])
    .index("by_channel", ["channelId"]),

  typing: defineTable({
    userId: v.id("users"),
    channelId: v.id("channels"),
    lastTyped: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_channel", ["channelId"]),
});
