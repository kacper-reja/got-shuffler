import { Player } from "../player";
import { Houses } from "../types";
import { cloneDeep } from "lodash";

export const assingHouses = (players: Player[]) => {
  let remainingHouses: Array<string> = Object.keys(Houses);
  let remainingPlayersIds: Array<number> = cloneDeep(players).map((p) => p.id);

  const toBEnjoyersIds: Array<number> = cloneDeep(
    players.filter((p) => p.isToBEnjoyer).map((p) => p.id),
  );

  if (toBEnjoyersIds.length > 0) {
    const rand = Math.floor(Math.random() * toBEnjoyersIds.length);
    const id = toBEnjoyersIds[rand];
    players.find((p) => p.id == id)?.assingHouse(Houses.GREYJOY);

    remainingPlayersIds = remainingPlayersIds.filter((pid) => pid !== id);
    remainingHouses = remainingHouses.filter((h) => h !== Houses.GREYJOY);
  }

  while (remainingHouses.length > 0) {
    const randIdx = Math.floor(Math.random() * remainingPlayersIds.length);
    console.log(randIdx);
    const house = remainingHouses.shift();

    if (house) {
      const id = remainingPlayersIds[randIdx];
      console.log("Player hit ", players[randIdx].id);
      players.find((p) => p.id === id)?.assingHouse(house);
      remainingPlayersIds = remainingPlayersIds.filter((pid) => pid !== id);
    } else {
      break;
    }
  }
  return cloneDeep(players);
};
