import ChatPanel from "./Chat";
import Conversation from "./Conversation";

export default function ChatLayout({ projectId, taskId, variant }: any) {
  return (
    <div className="h-full w-full grid grid-cols-12 min-h-0">
      <div className="col-span-12 lg:col-span-5 min-h-0">
        <Conversation projectId={projectId} taskId={taskId} variant={variant} />
      </div>
      <div className="col-span-12 lg:col-span-7 h-full min-h-0">
        <ChatPanel />
      </div>
    </div>
  );
}
