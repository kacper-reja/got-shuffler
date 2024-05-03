import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function PlayerTable() {
  return (
    <DataTable>
      <Column field="enabled" header="Enabled" />
      <Column field="name" header="Player Name" />
      <Column field="tobenjoyer" header="ToB Enjoyer" />
      <Column field="nation" header="Nation" />
    </DataTable>
  );
}
