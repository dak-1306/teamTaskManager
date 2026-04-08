import Modal from "../../ui/Modal";

import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { useState, useEffect } from "react";

export default function EditConversationModal({
  isOpen,
  onClose,
  conversation,
  onUpdate,
}) {
  const [form, setForm] = useState({ name: conversation?.name || "" });

  useEffect(() => {
    setForm({ name: conversation?.name || "" });
  }, [conversation]);

  const submit = () => {
    if (onUpdate) onUpdate({ ...conversation, name: form.name });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Conversation">
      <div className="space-y-3">
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          label="Name"
          placeHolder="Conversation Name"
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit} variant="primary">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
