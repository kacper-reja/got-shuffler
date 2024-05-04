interface TPlayer {
  name: string;
  id: number;
  house?: string;
  isToBEnjoyer?: boolean;
  setIsToBEnjoyer(isEnjoyer: boolean): void;
  setName(name: string): void;
}

interface TPlayerConstructor {
  name: string;
  id: number;
}

export class Player implements TPlayer {
  name: string;
  id: number;
  isToBEnjoyer?: boolean = false;
  house?: string = undefined;

  constructor(opt: TPlayerConstructor) {
    this.name = opt.name;
    this.id = opt.id;
  }

  setIsToBEnjoyer(isEnjoyer: boolean): void {
    this.isToBEnjoyer = isEnjoyer;
  }

  setName(name: string) {
    this.name = name;
  }

  assingHouse(house: string) {
    this.house = house;
  }
}
