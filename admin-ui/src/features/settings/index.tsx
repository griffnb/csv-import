import { Box } from "@tableflow/ui-library";
import { Importer } from "../../api/types";
import useComponentsStore from "../../stores/componentsStore";
import Domains from "./forms/Domains";
import SkipHeaderRowSelection from "./forms/SkipHeaderRowSelection";
import style from "./style/Settings.module.scss";
import React from "react";

export default function Settings({ importer }: { importer: Importer }) {
  const components = useComponentsStore((state) => state.components);
  const { importerSettings: SettingsComponents } = components;
  const renderedComponent = SettingsComponents ? <SettingsComponents /> : null;
  const shouldRenderColumn = renderedComponent && React.Children.count(renderedComponent.props.children) > 0;

  return (
    <div className={style.container}>
      {shouldRenderColumn && (
        <div className={style.column}>
          {renderedComponent}
        </div>
      )}
      <div className={style.column}>
        <h3>Allowed Domains</h3>
        <p>Add domains to restrict where the importer can be hosted. If no domains are added, the importer will allow uploads from anywhere.</p>

        <Box className={style.box} variants={["bg-shade"]}>
          <Domains importer={importer} />
        </Box>
      </div>

      <div className={style.column}>
        <SkipHeaderRowSelection />
      </div>
    </div>
  );
}
