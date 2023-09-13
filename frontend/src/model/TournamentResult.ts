import { Player } from "./Player";
import { Tournament } from "./Tournament";


export class TournamentResult {
    id: number;
    tournament: Tournament;
    rank: number;
    players: Player[];
    title: string;

    constructor(data: TournamentResult) {
        this.id = data.id;
        this.tournament = data.tournament;
        this.rank = data.rank;
        this.players = data.players;
        this.title = data.title;
    }

}


