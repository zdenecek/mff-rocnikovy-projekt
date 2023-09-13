import { Player } from "./Player";

export class TournamentData {
    
    
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    results : TournamentResultData[] = [];


    constructor(data: TournamentData) {
        this.name = data.name;
        this.location = data.location;
        this.startDate = data.startDate;
        this.endDate = data.endDate;  
        this.results = data.results;    
    }

}

/**
 *Class to send correct player data to the backend
 */
export type PlayerResultData = NewPlayerResultData | ExistingPlayerResultData;


export class NewPlayerResultData {
    type :  "new";
    newPlayerData : PlayerData;

    constructor(player: PlayerData) {
        this.type = "new";
        this.newPlayerData = player;
    }
}

export class ExistingPlayerResultData {
    type : "existing" ;
    playerId : number;

    constructor(player : Player) {
        this.type = "existing";
        this.playerId = player.id;
    }
}

export class PlayerData {
    name: string;
    federation_id?: number;

    constructor(data: PlayerData) {
        this.name = data.name;
        this.federation_id = data.federation_id;
    }
}

export class TournamentResultData {
    rank: number;
    players: PlayerResultData[];
    title: string;

    constructor(data: TournamentResultData) {
        this.rank = data.rank;
        this.players = data.players;
        this.title = data.title;
    }
}




