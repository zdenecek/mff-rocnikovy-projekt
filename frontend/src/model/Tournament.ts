

export class Tournament {
    
    id: number;
    title: string;
    description: string;


    constructor(data: Tournament) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
    }

}