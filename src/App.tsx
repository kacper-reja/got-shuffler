import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import "./App.css";
import { Houses, Player } from "./components/types";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [textValue, setTextValue] = useState<string>("");
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);

  return (
    <>
      <div style={{ display: "flex" }}>
        <InputText
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        <Checkbox
          checked={checkboxValue}
          onChange={() => setCheckboxValue(!checkboxValue)}
        />
        <Button
          label={players.length < 6 ? "Add Player" : "Shuffle"}
          onClick={() => {
            if (players.length < 6) {
              if (players.findIndex((p) => p.playerName === textValue) === -1) {
                setPlayers([
                  ...players,
                  {
                    playerName: textValue,
                    isTidesOfBattleEnjoyer: checkboxValue,
                    house: "0",
                  },
                ]);
              } else {
                alert("Daj unikalną nazwe gracza mordo");
              }
              setTextValue("");
              setCheckboxValue(false);
            } else {
              const remainingHouses: Array<string> = Object.keys(Houses).slice(
                0,
                Object.keys(Houses).length,
              );
              const playersCopy: Array<Player> = [...players];
              let remainingPlayers: Array<Player> = [...players];

              const tidesOfBattleEnjoyers: Array<Player> =
                remainingPlayers.filter((p) => p.isTidesOfBattleEnjoyer);
              const rand = Math.floor(
                Math.random() * tidesOfBattleEnjoyers.length,
              );
              const playerIndex = players.findIndex(
                (p) => p.playerName === tidesOfBattleEnjoyers[rand]?.playerName,
              );
              if (playerIndex !== -1) {
                playersCopy[playerIndex].house = remainingHouses.shift() ?? "0";
              }

              while (remainingHouses.length > 0) {
                remainingPlayers = remainingPlayers.filter(
                  (p) => p.house === "0",
                );

                const rand = Math.floor(
                  Math.random() * remainingPlayers.length,
                );
                const playerIndex = players.findIndex(
                  (p) => p.playerName === remainingPlayers[rand].playerName,
                );
                playersCopy[playerIndex].house = remainingHouses.shift() ?? "0";
              }
              setPlayers(playersCopy);
            }
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {players.map((p: Player) => {
          return (
            <div>
              {p.playerName}
              {p.isTidesOfBattleEnjoyer ? " - Tides of Battle enjoyer lol" : ""}
              {p.house !== "0" ? ` - ${p.house as Houses}` : ""}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
