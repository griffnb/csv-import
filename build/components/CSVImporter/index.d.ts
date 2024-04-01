import React from "react";
import "../../importer/style/index.scss";
import "./style/csv-importer.css";
declare const CSVImporter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDialogElement> & React.HTMLAttributes<HTMLDivElement> & {
    template?: string | Record<string, unknown> | undefined;
    darkMode?: boolean | undefined;
    primaryColor?: string | undefined;
    className?: string | undefined;
    onComplete?: ((data: any) => void) | undefined;
    waitOnComplete?: boolean | undefined;
    customStyles?: string | Record<string, string> | undefined;
    showDownloadTemplateButton?: boolean | undefined;
    skipHeaderRowSelection?: boolean | undefined;
} & {
    isModal?: boolean | undefined;
    modalIsOpen?: boolean | undefined;
    modalOnCloseTriggered?: (() => void) | undefined;
    modalCloseOnOutsideClick?: boolean | undefined;
} & React.RefAttributes<unknown>>;
export default CSVImporter;
