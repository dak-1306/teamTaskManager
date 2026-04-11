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
import Filter from "../../../components/common/Filter";

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
  memberOfProject: any[];
  projectId: string;
};

const options = [
  { value: "channel", label: "Channel" },
  { value: "project", label: "Project" },
  { value: "task", label: "Task" },
  { value: "direct", label: "Direct" },
];

export default function CreateConversationDialog({
  isOpen,
  onClose,
  onCreate,
  memberOfProject,
  projectId,
}: CreateConversationProps) {
  const [form, setForm] = useState({
    name: "",
    type: "channel",
    participants: "",
  });

  const submit = () => {
    const payload = {
      project: projectId,
      name: form.name,
      type: form.type,
      participants: form.participants
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    console.log("payload in create conversation", payload);
    onCreate?.(payload);
    onClose();
  };

  console.log("member of project in create conversation", memberOfProject);

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
              <Filter
                name="type"
                options={options}
                value={form.type}
                onFilterChange={(value) => setForm({ ...form, type: value })}
              />
            </Field>

            {memberOfProject && (
              <Field>
                <Label>Participants</Label>
                <Filter
                  name="participants"
                  options={memberOfProject}
                  value={form.participants}
                  onFilterChange={(value) =>
                    setForm({ ...form, participants: value })
                  }
                />
              </Field>
            )}
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
