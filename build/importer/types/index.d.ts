export type Template = {
    columns: TemplateColumn[];
};
export type TemplateColumn = {
    name: string;
    key: string;
    description?: string;
    required?: boolean;
    suggested_mappings?: string[];
    primary_key?: boolean;
};
export type UploadColumn = {
    index: number;
    name: string;
    sample_data: string[];
};
