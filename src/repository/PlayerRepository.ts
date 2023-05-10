import { PlayerRepositoryContract } from "./PlayerRepositoryContract";
import { ApiContract } from "@/api/ApiContract";
import { Player } from "@/model/Player";
import { Paginator } from "@/api/Paginator";
import { inject, injectable } from "tsyringe";

@injectable()
export class PlayerRepository implements PlayerRepositoryContract {
    constructor(
        @inject('ApiContract') private api: ApiContract) {}
        
    get(id: number): Promise<Player> {
        return this.api.get(`player/${id}`).then((response: any) => {
            return new Player(response);
        });
    }

    getMany(perPage = 15, page = 1): Promise<Paginator<Player>> {
        return this.api
            .get("players", {
                params: {
                    page,
                    per_page: perPage,
                },
            })
            .then((response: any) => {
                return new Paginator<Player>(response);
            });
    }

    update(data: Player): Promise<void> {
        return this.api.put(`player/${data.id}`, { params: data });
    }

    delete(id: number): Promise<void> {
        return this.api.delete(`player/${id}`);
    }

}
