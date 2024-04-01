import { TemplateColumn } from "../../../types";
export default function useTemplateTable(fields?: TemplateColumn[]): {
    "Expected Column": string | {
        raw: string;
        content: import("react/jsx-runtime").JSX.Element;
    };
    Required: {
        raw: number;
        content: import("react/jsx-runtime").JSX.Element;
    };
}[];
