import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

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

function Filter({ onFilterChange, name, options, value }: FilterProps) {
  return (
    <Combobox
      value={value}
      onValueChange={(val) => onFilterChange(val)}
      items={options.map((o) => o.value)}
    >
      <ComboboxInput
        placeholder={`Filter by ${name}`}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      />

      <ComboboxContent className="z-[9999] pointer-events-auto">
        <ComboboxEmpty>No items found.</ComboboxEmpty>

        <ComboboxList>
          {options.map((option) => (
            <ComboboxItem key={option.value} value={option.value} asChild>
              <button type="button" className="w-full text-left">
                {option.label}
              </button>
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export default Filter;
