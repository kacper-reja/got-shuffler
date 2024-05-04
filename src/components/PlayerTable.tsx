import { DataTable } from "primereact/datatable";
import { Column, ColumnEvent } from "primereact/column";
import { Player } from "../player";
import CellEditors, { ToBEnjoyerBody } from "./cells/CellEditors";
import { useState } from "react";
import { Button } from "primereact/button";
import { assingHouses } from "../logic/houseAssigner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PlayerTable() {
  const [players, setPlayers] = useState([
    new Player({ id: 1, name: "Player 1" }),
  ]);

  const onCellEditComplete = (e: ColumnEvent) => {
    if (e.field == "name") {
      if (players.findIndex((p) => p.name === e.newValue) !== -1) {
        toast.error("Name must be unique");
        return;
      }
      e.rowData.setName(e.newValue);
    }
    if (e.field == "isToBEnjoyer") {
      e.rowData.setIsToBEnjoyer(e.newValue);
    }
  };

  return (
    <div>
      <DataTable
        size="large"
        stripedRows
        value={players}
        editMode="cell"
        width={"100%"}
        tableStyle={{ minWidth: "60rem" }}
        rowClassName={"h-24" as any}
      >
        <Column field="id" header="Id" className="w-[60px]" />
        <Column
          className="w-[320px]"
          field="name"
          header="Player Name"
          editor={(options) => <CellEditors options={options} field="name" />}
          onCellEditComplete={onCellEditComplete}
        />
        <Column
          className="w-[240px]"
          field="isToBEnjoyer"
          header="ToB Enjoyer"
          body={ToBEnjoyerBody}
          editor={(options) => (
            <CellEditors options={options} field="isToBEnjoyer" />
          )}
          onCellEditComplete={onCellEditComplete}
        />
        <Column field="house" header="House" className="w-[240px]" />
      </DataTable>
      <div className="flex gap-4 mt-2 justify-end">
        <Button
          severity="danger"
          label="Clear Table"
          className="bg-red-100"
          onClick={() => setPlayers([])}
        />
        <Button
          severity="info"
          label="Add next Player"
          className="bg-blue-100"
          onClick={() =>
            setPlayers([
              ...players,
              new Player({
                id: players.length + 1,
                name: "Player " + (players.length + 1),
              }),
            ])
          }
          disabled={players.length === 6}
        />
        <Button
          severity="success"
          disabled={players.length < 4}
          label="Assing Houses"
          className="bg-green-100"
          onClick={() => {
            const p = assingHouses(players);
            setPlayers(p);
          }}
        />
        <ToastContainer limit={1} />
      </div>
    </div>
  );
}
