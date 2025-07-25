import { useEffect, useMemo, useState } from "react";
import Checkbox from "../../../components/Checkbox";
import { InputOption } from "../../../components/Input/types";
import DropdownFields from "../components/DropDownFields";
import MergeStrategyDropdown from "../components/MergeStrategyDropdown";
import { TemplateColumn, UploadColumn } from "../../../types";
import style from "../style/MapColumns.module.scss";
import { TemplateColumnMapping, MergeStrategy, MergeStrategies } from "../types";
import stringsSimilarity from "../../../utils/stringSimilarity";

export default function useMapColumnsTable(
  uploadColumns: UploadColumn[],
  templateColumns: TemplateColumn[] = [],
  columnsValues: { [uploadColumnIndex: number]: TemplateColumnMapping },
  isLoading?: boolean
) {

  useEffect(() => {
    Object.keys(columnsValues).map((uploadColumnIndexStr) => {
      const uploadColumnIndex = Number(uploadColumnIndexStr);
      const templateKey = columnsValues[uploadColumnIndex].key;
      handleTemplateChange(uploadColumnIndex, templateKey);
    });
  }, []);

  const checkSimilarity = (templateColumnKey: string, uploadColumnName: string) => {
    const templateColumnKeyFormatted = templateColumnKey.replace(/_/g, " ");
    return stringsSimilarity(templateColumnKeyFormatted, uploadColumnName.toLowerCase()) > 0.9;
  };

  const isSuggestedMapping = (templateColumn: TemplateColumn, uploadColumnName: string) => {
    if (!templateColumn?.suggested_mappings) {
      return false;
    }
    return templateColumn.suggested_mappings.some((suggestion) => suggestion.toLowerCase() === uploadColumnName.toLowerCase());
  };

  const [values, setValues] = useState<{ [key: number]: TemplateColumnMapping }>(() => {
    const usedTemplateColumns = new Set<string>();
    const initialObject: { [key: number]: TemplateColumnMapping } = {};

    return uploadColumns.reduce((acc, uc) => {
      const matchedSuggestedTemplateColumn = templateColumns?.find((tc) => isSuggestedMapping(tc, uc.name));

      if (matchedSuggestedTemplateColumn && matchedSuggestedTemplateColumn.key) {
        usedTemplateColumns.add(matchedSuggestedTemplateColumn.key);
        acc[uc.index] = {
          key: matchedSuggestedTemplateColumn.key,
          include: true,
          name: uc.name,
          primary_key: matchedSuggestedTemplateColumn.primary_key || false,
          merge_strategy: MergeStrategies.OVERWRITE
        };
        return acc;
      }

      const similarTemplateColumn = templateColumns?.find((tc) => {
        if (tc.key && !usedTemplateColumns.has(tc.key) && checkSimilarity(tc.key, uc.name)) {
          usedTemplateColumns.add(tc.key);
          return true;
        }
        return false;
      });

      acc[uc.index] = {
        key: similarTemplateColumn?.key || "",
        include: !!similarTemplateColumn?.key,
        selected: !!similarTemplateColumn?.key,
        name: uc.name,
        primary_key: !!similarTemplateColumn?.primary_key,
        merge_strategy: MergeStrategies.OVERWRITE
      };
      return acc;
    }, initialObject);
  });

  const [selectedValues, setSelectedValues] = useState<{ key: string; selected: boolean | undefined }[]>(
    Object.values(values).map(({ key, selected }) => ({ key, selected }))
  );

  const templateFields: { [key: string]: InputOption } = useMemo(
    () => templateColumns.reduce((acc, tc) => ({ ...acc, [tc.name]: { value: tc.key, required: tc.required } }), {}),
    [JSON.stringify(templateColumns)]
  );

  const handleTemplateChange = (uploadColumnIndex: number, key: string) => {
    setValues((prev) => {
      const templatesFields = { ...prev, [uploadColumnIndex]: { ...prev[uploadColumnIndex], key: key, include: !!key, selected: !!key, primary_key: prev[uploadColumnIndex]?.primary_key || false, merge_strategy: prev[uploadColumnIndex]?.merge_strategy || MergeStrategies.OVERWRITE } };
      const templateFieldsObj = Object.values(templatesFields).map(({ key, selected }) => ({ key, selected }));
      setSelectedValues(templateFieldsObj);
      return templatesFields;
    });
  };

  const handleUseChange = (id: number, value: boolean) => {
    setValues((prev) => ({ ...prev, [id]: { ...prev[id], include: !!prev[id].key && value } }));
  };

  const handlePKChange = (id: number, value: boolean) => {
    setValues((prev) => ({ ...prev, [id]: { ...prev[id], primary_key: !!prev[id].key && value } }));
  };

  const handleMergeStrategyChange = (id: number, value: MergeStrategy) => {
    setValues((prev) => ({ ...prev, [id]: { ...prev[id], merge_strategy: value } }));
  };

  const rows = useMemo(() => {
    return uploadColumns.map((uc, index) => {
      const { name, sample_data } = uc;
      const suggestion = values?.[index] || {};
      const samples = sample_data.filter((d) => d);

      // Find the template column to check if primary_key is required
      const templateColumn = templateColumns.find(tc => tc.key === suggestion.key);
      const isPrimaryKeyRequired = templateColumn?.primary_key;
      const isFieldRequired = templateColumn?.required;

      return {
        "Your File Column": {
          raw: name || false,
          content: name || <em>- empty -</em>,
        },
        "Your Sample Data": {
          raw: "",
          content: (
            <div title={samples.join(", ")} className={style.samples}>
              {samples.map((d, i) => (
                <small key={i}>{d}</small>
              ))}
            </div>
          ),
        },
        "Destination Column": {
          raw: "",
          content: (
            <DropdownFields
              options={templateFields}
              value={suggestion.key}
              placeholder="- Select one -"
              onChange={(key: string) => handleTemplateChange(index, key)}
              selectedValues={selectedValues}
              updateSelectedValues={setSelectedValues}
            />
          ),
        },
        Include: {
          raw: false,
          content: (
            <Checkbox
              checked={suggestion.include || false}
              disabled={!suggestion.key || isLoading || isFieldRequired}
              onChange={(e) => handleUseChange(index, e.target.checked)}
            />
          ),
        },
        "Primary Key": {
          raw: false,
          content: (
            <Checkbox
              checked={suggestion.primary_key || false}
              disabled={!suggestion.key || isLoading || isPrimaryKeyRequired}
              onChange={(e) => handlePKChange(index, e.target.checked)}
            />
          ),
        },
        "Merge Strategy": {
          raw: suggestion.merge_strategy || MergeStrategies.OVERWRITE,
          content: (
            <MergeStrategyDropdown
              value={suggestion.merge_strategy || MergeStrategies.OVERWRITE}
              disabled={!suggestion.key || !suggestion.include || isLoading}
              onChange={(value) => handleMergeStrategyChange(index, value)}
            />
          ),
        },
      };
    });
  }, [values, isLoading]);
  return { rows, formValues: values };
}
