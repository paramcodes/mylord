// @ts-nocheck
import { describe, expect, test } from "bun:test";
import { convexTest } from "convex-test";
import schema from "./schema";

const modules = {
  "convex/schema.ts": () => import("./schema"),
  "convex/messages.ts": () => import("./messages"),
  "convex/_generated/api.ts": () => import("./_generated/api"),
};

describe("messages", () => {
  test("send inserts a message", async () => {
    const t = convexTest(schema, modules);
    const userId = await (t as any).run(async (ctx: any) => ctx.db.insert("users", { clerkId: "u1" }));
    const serverId = await (t as any).run(async (ctx: any) => ctx.db.insert("servers", { name: "s", ownerId: userId }));
    const channelId = await (t as any).run(async (ctx: any) => ctx.db.insert("channels", { serverId, name: "general", type: "text" }));
    const id = await (t as any).mutation("messages:send", { channelId, authorId: userId, body: "hi" });
    const msg = await (t as any).run(async (ctx: any) => ctx.db.get(id));
    expect(msg?.body).toBe("hi");
  });

  test("edit requires author", async () => {
    const t = convexTest(schema, modules);
    const u1 = await (t as any).run(async (ctx: any) => ctx.db.insert("users", { clerkId: "u1" }));
    const u2 = await (t as any).run(async (ctx: any) => ctx.db.insert("users", { clerkId: "u2" }));
    const serverId = await (t as any).run(async (ctx: any) => ctx.db.insert("servers", { name: "s", ownerId: u1 }));
    const channelId = await (t as any).run(async (ctx: any) => ctx.db.insert("channels", { serverId, name: "general", type: "text" }));
    const id = await (t as any).mutation("messages:send", { channelId, authorId: u1, body: "hi" });
    await expect((t as any).mutation("messages:edit", { messageId: id, authorId: u2, body: "x" })).rejects.toThrow("Not authorized");
  });

  test("remove deletes message", async () => {
    const t = convexTest(schema, modules);
    const userId = await (t as any).run(async (ctx: any) => ctx.db.insert("users", { clerkId: "u1" }));
    const serverId = await (t as any).run(async (ctx: any) => ctx.db.insert("servers", { name: "s", ownerId: userId }));
    const channelId = await (t as any).run(async (ctx: any) => ctx.db.insert("channels", { serverId, name: "general", type: "text" }));
    const id = await (t as any).mutation("messages:send", { channelId, authorId: userId, body: "hi" });
    await (t as any).mutation("messages:remove", { messageId: id, authorId: userId });
    const msg = await (t as any).run(async (ctx: any) => ctx.db.get(id));
    expect(msg).toBeNull();
  });
});
