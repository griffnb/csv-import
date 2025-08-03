import { HTMLAttributes } from "react";
import { Template } from "../importer/types";
import type { MergeStrategy } from "../importer/features/map-columns/types";

type ModalParams = {
  isModal?: boolean;
  modalIsOpen?: boolean;
  modalOnCloseTriggered?: () => void;
  modalCloseOnOutsideClick?: boolean;
};

export type CSVImporterProps = (HTMLAttributes<HTMLDialogElement> & HTMLAttributes<HTMLDivElement>) & {
  template?: Template | string;
  darkMode?: boolean;
  primaryColor?: string;
  className?: string;
  onComplete?: (data: CompleteData) => void;
  waitOnComplete?: boolean;
  customStyles?: Record<string, string> | string;
  showDownloadTemplateButton?: boolean;
  skipHeaderRowSelection?: boolean;
} & ModalParams;


export type CompleteData = {
  num_rows: number;
  num_columns: number;
  error: string | null;
  columns: {key:string,name:string,primary_key?:boolean,merge_strategy?:MergeStrategy}[];
  rows: MappedRow[];
}

 export type MappedRow = {
  index: number;
  values: Record<string, number | string>;
};

// Export merge strategy constants for external use
export { MergeStrategies } from "../importer/features/map-columns/types";
export type { MergeStrategy } from "../importer/features/map-columns/types";