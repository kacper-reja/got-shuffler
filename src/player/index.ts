interface TPlayer {
  name: string;
  id: number;
  house: string;
  isToBEnjoyer?: boolean;
}

export class Player implements TPlayer {
  name: string;
  id: number;
  isToBEnjoyer: boolean = false;
  house: string;
  constructor(opt: TPlayer) {
    this.name = opt.name;
    this.id = opt.id;
    this.house = opt.house;
  }
}

export class ToBEnjoyer extends Player {
  constructor(opt: TPlayer) {
    super(opt);
    this.isToBEnjoyer = true;
  }
}
