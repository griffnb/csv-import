import { Select } from "@chakra-ui/select";
import { MergeStrategy, MergeStrategies } from "../types";

interface MergeStrategyDropdownProps {
  value: MergeStrategy;
  disabled?: boolean;
  onChange: (value: MergeStrategy) => void;
}

const mergeStrategyOptions: { label: string; value: MergeStrategy }[] = [
  { label: "Overwrite", value: MergeStrategies.OVERWRITE },
  { label: "Fill If Empty", value: MergeStrategies.FILL_IF_EMPTY },
  { label: "Append Collection", value: MergeStrategies.APPEND_COLLECTION },
];

export default function MergeStrategyDropdown({ value, disabled, onChange }: MergeStrategyDropdownProps) {
  return (
    <Select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as MergeStrategy)}
      size="sm"
      variant="outline"
      placeholder={disabled ? "Select column first" : undefined}
    >
      {mergeStrategyOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
