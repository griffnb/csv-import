import { TemplateColumn, UploadColumn } from "../../../types";
import { TemplateColumnMapping } from "../types";
export default function useMapColumnsTable(uploadColumns: UploadColumn[], templateColumns: TemplateColumn[] | undefined, columnsValues: {
    [uploadColumnIndex: number]: TemplateColumnMapping;
}, isLoading?: boolean): {
    rows: {
        "Your File Column": {
            raw: string | boolean;
            content: string | import("react/jsx-runtime").JSX.Element;
        };
        "Your Sample Data": {
            raw: string;
            content: import("react/jsx-runtime").JSX.Element;
        };
        "Destination Column": {
            raw: string;
            content: import("react/jsx-runtime").JSX.Element;
        };
        Include: {
            raw: boolean;
            content: import("react/jsx-runtime").JSX.Element;
        };
    }[];
    formValues: {
        [key: number]: TemplateColumnMapping;
    };
};
