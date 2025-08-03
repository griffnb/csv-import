import { Template } from "../../../types";
import { FileData } from "../../main/types";
export declare const MergeStrategies: {
    readonly OVERWRITE: "overwrite";
    readonly FILL_IF_EMPTY: "fill_if_empty";
    readonly APPEND_COLLECTION: "append_collection";
};
export type MergeStrategy = typeof MergeStrategies[keyof typeof MergeStrategies];
export type TemplateColumnMapping = {
    key: string;
    name: string;
    include: boolean;
    selected?: boolean;
    primary_key?: boolean;
    merge_strategy?: MergeStrategy;
};
export type MapColumnsProps = {
    template: Template;
    data: FileData;
    columnMapping: {
        [index: number]: TemplateColumnMapping;
    };
    selectedHeaderRow: number | null;
    skipHeaderRowSelection?: boolean;
    onSuccess: (columnMapping: {
        [index: number]: TemplateColumnMapping;
    }) => void;
    onCancel: () => void;
    isSubmitting: boolean;
};
