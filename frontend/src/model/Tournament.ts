
type TournamentData = {
    id: number;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
}

export class Tournament {
    
    id: number;
    name : string;
    location : string;
    startDate : string;
    endDate : string;


    constructor(data: TournamentData) {
        this.id = data.id;
        this.name = data.name;
        this.location = data.location;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
    }

        

    public static empty(): Tournament {
        return new Tournament({
            id: 0,
            name: '',
            location: '',
            startDate: "",
            endDate: ""
        });
    }

}