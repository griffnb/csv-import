import { MergeStrategy } from "../types";
interface MergeStrategyDropdownProps {
    value: MergeStrategy;
    disabled?: boolean;
    onChange: (value: MergeStrategy) => void;
}
export default function MergeStrategyDropdown({ value, disabled, onChange }: MergeStrategyDropdownProps): import("react/jsx-runtime").JSX.Element;
export {};
