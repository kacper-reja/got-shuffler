import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { ColumnEditorOptions } from "primereact/column";
import { Tag } from "primereact/tag";

type Props = {
  field: "name" | "isToBEnjoyer";
  options: ColumnEditorOptions;
};
export default function CellEditors({ field, options }: Props) {
  switch (field) {
    case "name":
      return (
        <InputText
          type={"text"}
          value={options.value}
          onChange={(e) => options.editorCallback?.(e.target.value)}
          onKeyDown={(e) => e.stopPropagation()}
          size="large"
        />
      );
    case "isToBEnjoyer":
      return (
        <Dropdown
          value={options.value}
          options={["ToB Enjoyer", "Has self respect"]}
          onChange={(e) =>
            options.editorCallback?.(e.value === "ToB Enjoyer" ? true : false)
          }
          placeholder="Select a Status"
          itemTemplate={(option) => {
            return <Tag value={option} severity={getSeverity(option)}></Tag>;
          }}
        />
      );
  }
}

export const getSeverity = (opt: ToBLabel) => {
  switch (opt) {
    case "ToB Enjoyer":
      return "danger";
    case "Has self respect":
      return "success";
  }
};

export const ToBEnjoyerBody = (rowData: any) => {
  return (
    <Tag
      value={getToBLabel(rowData.isToBEnjoyer)}
      severity={getSeverity(getToBLabel(rowData.isToBEnjoyer))}
    ></Tag>
  );
};

export const getToBLabel = (isEnjoyer: boolean): ToBLabel => {
  return isEnjoyer ? "ToB Enjoyer" : "Has self respect";
};

export const getToBBoolean = (label: ToBLabel): boolean => {
  return label === "Has self respect" ? false : true;
};

export type ToBLabel = "ToB Enjoyer" | "Has self respect";
