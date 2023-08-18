export class TournamentData {
    
    
    name: string;
    location: string;
    startDate: string;
    endDate: string;


    constructor(data: TournamentData) {
        this.name = data.name;
        this.location = data.location;
        this.startDate = data.startDate;
        this.endDate = data.endDate;      
    }

}