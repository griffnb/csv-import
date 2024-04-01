import { HTMLAttributes } from "react";
import { Template } from "../importer/types";

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
  columns: {key:string,name:string}[];
  rows: MappedRow[];
}

 export type MappedRow = {
  index: number;
  values: Record<string, number | string>;
};