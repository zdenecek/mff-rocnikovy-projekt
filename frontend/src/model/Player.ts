

export class Player {

    id: number;
    name: string;
    federation_id?: number;


    constructor(data: Player) {
        this.id = data.id;
        this.name = data.name;
        this.federation_id = data.federation_id;
    }

}
