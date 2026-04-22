import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export default function SearchBar({
  placeholder,
  value,
  onChange,
  onSubmit,
}: SearchBarProps) {
  return (
    <InputGroup className="w-full">
      <InputGroupInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <InputGroupAddon
        align="inline-end"
        onClick={onSubmit}
        className="cursor-pointer"
      >
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
