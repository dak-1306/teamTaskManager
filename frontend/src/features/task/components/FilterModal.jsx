import { useState } from "react";
import Modal from "../../../shared/ui/Modal";
import Button from "../../../shared/ui/Button";

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
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Tasks">
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
            <option value="">Any</option>
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
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
            <option value="">Any</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
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
            <option value="">Default</option>
            <option value="dueDateAsc">Due Date (Asc)</option>
            <option value="dueDateDesc">Due Date (Desc)</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="secondary"
            size="small"
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>
          <Button variant="primary" size="small" type="submit">
            Apply
          </Button>
        </div>
      </form>
    </Modal>
  );
}
