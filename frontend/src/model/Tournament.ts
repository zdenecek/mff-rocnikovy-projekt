import { makeSlug } from "@/util/url";
import { Player } from "./Player";

export class Result {
  rank: number;
  scoreAchieved?: number;
  players: Player[];
  title?: string;

  static empty() {
    return new Result({ rank: 1, players: [], title: "" });
  }

  constructor(data: Result) {
    this.rank = data.rank;
    this.scoreAchieved = data.scoreAchieved;
    this.players = data.players.map((player) => new Player(player));
    this.title = data.title;
  }
}

export type TournamentType = "team" | "individual" | "pair";

export const TournamentTypes = [
  { title: "Individuál", value: "individual" },
  { title: "Párový turnaj", value: "pair" },
  { title: "Týmový turnaj", value: "team" },
];

export function getTournamentTypeTitle(type: TournamentType) {
  return TournamentTypes.find((t) => t.value === type)?.title || "";
}

export class Tournament {
  id: number;
  title: string;
  place?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  externalDocumentationLink?: string;
  type: TournamentType;
  resultsCount?: number;

  results?: Result[];

  static empty() {
    return new Tournament({
      id: 0,
      title: "",
      type: "pair",
      results: [] as Result[],
    } as Tournament);
  }

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
      this.resultsCount = this.results.length;
    } else if (data.resultsCount) this.resultsCount = data.resultsCount;
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

  get slug(): string {
    return makeSlug(this.title ?? "");
  }

  toJSON(): any {
    const data = {
      ...this,
      startDate: undefined as string | undefined,
      endDate: undefined as string | undefined,
    };
    // @ts-ignore
    data.startDate = this.startDate?.toISOString().split("T")[0];
    // @ts-ignore
    data.endDate = this.endDate?.toISOString().split("T")[0];
    return data;
  }
}
