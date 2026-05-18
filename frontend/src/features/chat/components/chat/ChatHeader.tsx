import React from "react";
import Menu from "../Menu";

interface ChatHeaderProps {
  selectedConv: any;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedConv }) => {
  return (
    <div className="px-5 py-4 flex items-center justify-between border-b backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-lg shadow-md shrink-0">
          {selectedConv?.name?.charAt(0)?.toUpperCase() || "C"}
        </div>
        <div className="flex flex-col overflow-hidden">
          <h2 className="text-md font-semibold text-gray-900 dark:text-gray-100 truncate">
            {selectedConv?.name || "Conversation"}
          </h2>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
            {selectedConv?.participants?.length || 0} participants
          </span>
        </div>
      </div>
      <Menu messageId="" handleDelete={() => {}} handleEdit={() => {}} />
    </div>
  );
};
