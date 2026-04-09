import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { InputGroup } from "@/components/ui/input-group";

type Option = {
  label: string;
  value: string;
};

type FilterProps = {
  name: string;
  options: Option[];
  value?: string;
  onFilterChange: (value: string) => void;
  className?: string;
};

function Filter({
  onFilterChange,
  name,
  options,
  value,
  className,
}: FilterProps) {
  return (
    <div className={"flex items-center space-x-2 " + (className || "")}>
      <InputGroup className="w-fit">
        <Select
          value={value ?? ""}
          onValueChange={(val) => onFilterChange(val === "all" ? "" : val)}
        >
          <SelectTrigger size="default">
            <SelectValue placeholder={`Filter by ${name}`} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputGroup>
    </div>
  );
}

export default Filter;
