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
    onComplete?: (data: any) => void;
    waitOnComplete?: boolean;
    customStyles?: Record<string, string> | string;
    showDownloadTemplateButton?: boolean;
    skipHeaderRowSelection?: boolean;
} & ModalParams;
export {};
