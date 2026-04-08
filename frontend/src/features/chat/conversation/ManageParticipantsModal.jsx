import Modal from "../../../shared/ui/Modal";
import { useState } from "react";

export default function ManageParticipantsModal({
  isOpen,
  onClose,
  conversation,
  onAdd,
  onRemove,
}) {
  const [userId, setUserId] = useState("");

  const add = () => {
    if (userId && onAdd) onAdd(conversation.id, userId);
    setUserId("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Participants">
      <div className="space-y-3">
        <div className="text-sm">Participants</div>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {conversation?.participants?.length ? (
            conversation.participants.map((p) => (
              <div
                key={p}
                className="flex items-center justify-between border rounded px-2 py-1"
              >
                <div className="text-sm truncate">{p}</div>
                <button
                  onClick={() => onRemove && onRemove(conversation.id, p)}
                  className="text-sm text-red-500"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-500">No participants</div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="userId to add"
            className="flex-1 border rounded px-2 py-1"
          />
          <button
            onClick={add}
            className="px-3 py-1 rounded bg-green-500 text-white"
          >
            Add
          </button>
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="px-3 py-1 rounded border">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
