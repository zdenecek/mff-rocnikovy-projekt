import { TournamentRepositoryContract } from "./TournamentRepositoryContract";
import { ApiContract } from "@/api/ApiContract";
import { Tournament } from "@/model/Tournament";
import { Paginator } from "@/api/Paginator";
import { inject, injectable } from "tsyringe";

@injectable()
export class TournamentRepository implements TournamentRepositoryContract {
    constructor(
        @inject('ApiContract') private api: ApiContract) {}
        
    get(id: number): Promise<Tournament> {
        return this.api.get(`tournament/${id}`).then((response: any) => {
            return new Tournament(response);
        });
    }

    getMany(perPage = 15, page = 1): Promise<Paginator<Tournament>> {
        return this.api
            .get("tournaments", {
                params: {
                    page,
                    per_page: perPage,
                },
            })
            .then((response: any) => {
                return new Paginator<Tournament>(response);
            });
    }

    update(data: Tournament): Promise<void> {
        return this.api.put(`tournament/${data.id}`, { params: data });
    }

    delete(id: number): Promise<void> {
        return this.api.delete(`tournament/${id}`);
    }

}
