import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
type CreateConversationProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    type: string;
    participants: string[];
  }) => void;
};
export default function CreateConversationDialog({
  isOpen,
  onClose,
  onCreate,
}: CreateConversationProps) {
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
    onCreate?.(payload);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Conversation</DialogTitle>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Conversation Name"
              />
            </Field>

            <Field>
              <Label>Type</Label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border rounded px-2 py-2 text-sm"
              >
                <option value="channel">Channel</option>
                <option value="project">Project</option>
                <option value="task">Task</option>
                <option value="direct">Direct</option>
              </select>
            </Field>

            <Field>
              <Label>Participants</Label>
              <Input
                value={form.participants}
                onChange={(e) =>
                  setForm({ ...form, participants: e.target.value })
                }
                placeholder="user1, user2"
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={submit} variant="default" size="sm">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
