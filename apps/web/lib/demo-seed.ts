import type { Channel, Member, Message, Server } from "@/lib/app-data";

export const DEMO_CURRENT_USER = {
  id: "u-alex",
  name: "Alex Morgan",
};

const DEMO_EPOCH = Date.UTC(2026, 9, 19, 9, 0, 0);
const MINUTE = 60_000;

export type DemoMessage = Message & { channelId: string };

export type DemoTyping = {
  id: string;
  name: string;
  channelId: string;
};

export type DemoState = {
  servers: Server[];
  channels: Channel[];
  members: Member[];
  messages: DemoMessage[];
  typing: DemoTyping[];
  unread: Record<string, { count: number; mentions: number }>;
  activeServerId: string;
  activeChannelId: string;
  serverCounter: number;
  channelCounter: number;
  messageCounter: number;
};

export function createDemoState(): DemoState {
  return {
    servers: [
      { id: "srv-hq", name: "MyLord HQ" },
      { id: "srv-side", name: "Side Quest" },
    ],
    channels: [
      { id: "ch-general", name: "general", type: "text", serverId: "srv-hq" },
      { id: "ch-random", name: "random", type: "text", serverId: "srv-hq" },
      { id: "ch-design", name: "design-review", type: "text", serverId: "srv-hq" },
      { id: "ch-announce", name: "announcements", type: "text", serverId: "srv-hq" },
      { id: "ch-gaming", name: "gaming", type: "text", serverId: "srv-side" },
      { id: "ch-music", name: "music", type: "text", serverId: "srv-side" },
    ],
    members: [
      { id: "u-alex", name: "Alex Morgan", status: "online" },
      { id: "u-priya", name: "Priya Raman", status: "online" },
      { id: "u-jonas", name: "Jonas Weber", status: "idle" },
      { id: "u-mei", name: "Mei Tanaka", status: "online" },
      { id: "u-sam", name: "Sam Okafor", status: "offline" },
    ],
    messages: [
      {
        id: "m-1",
        channelId: "ch-general",
        author: "Alex Morgan",
        body: "Morning! Demo mode is live, no Clerk or Convex keys needed.",
        createdAt: DEMO_EPOCH,
      },
      {
        id: "m-2",
        channelId: "ch-general",
        author: "Priya Raman",
        body: "Typecheck and lint are green on this branch.",
        createdAt: DEMO_EPOCH + 12 * MINUTE,
      },
      {
        id: "m-3",
        channelId: "ch-general",
        author: "Jonas Weber",
        body: "Reminder: the whole e2e suite runs offline.",
        createdAt: DEMO_EPOCH + 26 * MINUTE,
      },
      {
        id: "m-4",
        channelId: "ch-general",
        author: "Mei Tanaka",
        body: "Member list shows online, idle and offline dots.",
        createdAt: DEMO_EPOCH + 41 * MINUTE,
      },
      {
        id: "m-5",
        channelId: "ch-general",
        author: "Alex Morgan",
        body: "Seeded four channels and two servers for the walkthrough.",
        createdAt: DEMO_EPOCH + 55 * MINUTE,
      },
      {
        id: "m-6",
        channelId: "ch-general",
        author: "Priya Raman",
        body: "Typing indicator works too.",
        createdAt: DEMO_EPOCH + 67 * MINUTE,
      },
      {
        id: "m-7",
        channelId: "ch-random",
        author: "Jonas Weber",
        body: "Anyone up for lunch after the demo?",
        createdAt: DEMO_EPOCH + 92 * MINUTE,
      },
      {
        id: "m-8",
        channelId: "ch-random",
        author: "Mei Tanaka",
        body: "I am in.",
        createdAt: DEMO_EPOCH + 96 * MINUTE,
      },
      {
        id: "m-9",
        channelId: "ch-design",
        author: "Alex Morgan",
        body: "Header spacing is settled.",
        createdAt: DEMO_EPOCH + 120 * MINUTE,
      },
    ],
    typing: [{ id: "u-priya", name: "Priya Raman", channelId: "ch-general" }],
    unread: {
      "ch-general": { count: 3, mentions: 1 },
      "ch-random": { count: 0, mentions: 0 },
      "ch-design": { count: 1, mentions: 0 },
    },
    activeServerId: "srv-hq",
    activeChannelId: "ch-general",
    serverCounter: 3,
    channelCounter: 7,
    messageCounter: 10,
  };
}
