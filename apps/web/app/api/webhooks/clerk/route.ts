import { Webhook } from "svix";
import { headers } from "next/headers";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  const payload = await req.text();
  const h = await headers();
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const event = wh.verify(payload, {
    "svix-id": h.get("svix-id")!,
    "svix-timestamp": h.get("svix-timestamp")!,
    "svix-signature": h.get("svix-signature")!,
  }) as { type: string; data: any };

  if (event.type === "user.created" || event.type === "user.updated") {
    const u = event.data;
    await convex.mutation("users:syncUser" as any, {
      clerkId: u.id,
      email: u.email_addresses?.[0]?.email_address,
      name: [u.first_name, u.last_name].filter(Boolean).join(" ") || undefined,
      imageUrl: u.image_url,
    });
  } else if (event.type === "user.deleted") {
    await convex.mutation("users:deleteUser" as any, { clerkId: event.data.id });
  }
  return new Response("ok", { status: 200 });
}
