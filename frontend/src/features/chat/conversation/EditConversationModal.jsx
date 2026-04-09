import { useState, useEffect } from "react";

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

export default function EditConversationDialog({
  isOpen,
  onClose,
  conversation,
  onUpdate,
}) {
  const [form, setForm] = useState({ name: "" });

  useEffect(() => {
    setForm({ name: conversation?.name || "" });
  }, [conversation]);

  const submit = () => {
    onUpdate?.({ ...conversation, name: form.name });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Conversation</DialogTitle>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ name: e.target.value })}
                placeholder="Conversation Name"
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={submit}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
