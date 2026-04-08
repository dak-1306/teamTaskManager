import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import { useState } from "react";

export default function CreateConversationModal({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    type: "channel",
    participants: "",
  });

  const submit = () => {
    const payload = {
      name: form.name,
      type: form.type,
      participants: form.participants
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (onCreate) onCreate(payload);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Conversation">
      <div className="space-y-3">
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          label="Name"
          placeHolder="Conversation Name"
        />

        <label className="block text-sm">Type</label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full border rounded px-2 py-1"
        >
          <option value="channel">Channel</option>
          <option value="project">Project</option>
          <option value="task">Task</option>
          <option value="direct">Direct</option>
        </select>

        <label className="block text-sm">
          Participants (comma separated userIds)
        </label>
        <Input
          value={form.participants}
          onChange={(e) => setForm({ ...form, participants: e.target.value })}
          label="Participants"
          placeHolder="User IDs (comma separated)"
        />

        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={submit} variant="primary">
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
}
