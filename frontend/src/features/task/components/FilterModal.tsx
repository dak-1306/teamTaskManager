// @ts-nocheck
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import Filter from "../../../components/common/Filter";
import { Button } from "../../../components/ui/button";

const filterStatus = [
  { value: "", label: "Any" },
  { value: "todo", label: "To Do" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
];
const filterPriority = [
  { value: "", label: "Any" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];
const filterTime = [
  { value: "", label: "Default" },
  { value: "dueDateAsc", label: "Due Date (Asc)" },
  { value: "dueDateDesc", label: "Due Date (Desc)" },
];

export default function FilterModal({
  isOpen,
  onClose,
  initialFilters = {},
  onApply,
}) {
  const [filters, setFilters] = useState({
    status: initialFilters.status || "",
    priority: initialFilters.priority || "",
    date: initialFilters.date || "",
  });

  const handleSubmit = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(openState) => !openState && onClose()}>
      <DialogContent>
        <DialogTitle>Filter Tasks</DialogTitle>
        <div className="space-y-4">
          <Filter
            name="Status"
            options={filterStatus}
            value={filters.status}
            onFilterChange={(value) =>
              setFilters((p) => ({ ...p, status: value }))
            }
          />
          <Filter
            name="Priority"
            options={filterPriority}
            value={filters.priority}
            onFilterChange={(value) =>
              setFilters((p) => ({ ...p, priority: value }))
            }
          />
          <Filter
            name="Time"
            options={filterTime}
            value={filters.date}
            onFilterChange={(value) =>
              setFilters((p) => ({ ...p, date: value }))
            }
          />

          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              type="button"
              onClick={handleSubmit}
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
