import { Tournament } from "@/model/Tournament";
import { RepositoryContract } from "./RepositoryContract";
import { TournamentData } from "@/model/TournamentData";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TournamentRepositoryContract extends RepositoryContract<Tournament> {
    create(data: TournamentData): Promise<Tournament>;
}
