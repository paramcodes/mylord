import { ChatView } from "@/components/chat-view";
import { PresenceTracker } from "@/components/presence-tracker";

export default function ProtectedHome() {
  return (
    <>
      <PresenceTracker />
      <ChatView />
    </>
  );
}
