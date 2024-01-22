import { Player } from "./Player";

export class Unit {
  title?: string;
  players: Player[];

  constructor(data: Unit) {
    this.title = data.title;
    this.players = data.players.map((player) => new Player(player));
  }
}

export class Result {
  scoreAchieved: number;
  unit: Unit;

  constructor(data: Result) {
    this.scoreAchieved = data.scoreAchieved;
    this.unit = new Unit(data.unit);
  }
}

export type TournamentType = "team" | "individual" | "pair";

export class Tournament {
  id: number;
  title: string;
  place?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  externalDocumentationLink?: string;
  type: TournamentType;

  results?: Result[];

  constructor(data: Tournament) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.place = data.place;
    if (data.startDate) this.startDate = new Date(data.startDate);
    if (data.endDate) this.endDate = new Date(data.endDate);
    this.externalDocumentationLink = data.externalDocumentationLink;
    this.type = data.type;

    if (data.results) {
      this.results = data.results.map((result) => new Result(result));
    }
  }

  get dateString(): string {
    if (this.startDate && this.endDate) {
      return `${this.startDate.toLocaleDateString()} - ${this.endDate.toLocaleDateString()}`;
    }

    if (this.startDate) {
      return this.startDate.toLocaleDateString();
    }

    return "";
  }
}
