// @ts-nocheck
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(filters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(openState) => !openState && onClose()}>
      <DialogContent>
        <DialogTitle>Filter Tasks</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
            >
              {filterStatus.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={filters.priority}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
            >
              {filterPriority.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort by due date
            </label>
            <select
              name="date"
              value={filters.date}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
            >
              {filterTime.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="default" size="sm" type="submit">
              Apply
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
