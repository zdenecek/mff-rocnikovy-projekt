import { Api } from "./api/Api";
import { UserRepository } from "./repository/UserRepository";
import { UserService } from "./service/UserService";
import { Lifecycle, container } from "tsyringe";
import { ApiContract } from "./api/ApiContract";
import { UserRepositoryContract } from "./repository/UserRepositoryContract";
import { UserServiceContract } from "./service/UserServiceContract";
import { TournamentRepositoryContract } from "./repository/TournamentRepositoryContract";
import { TournamentRepository } from "./repository/TournamentRepository";
import { PlayerRepositoryContract } from "./repository/PlayerRepositoryContract";
import { PlayerRepository } from "./repository/PlayerRepository";

container
    .register<ApiContract>(
        "ApiContract",
        { useClass: Api },
        { lifecycle: Lifecycle.Singleton }
    )
    .register<UserRepositoryContract>(
        "UserRepositoryContract",
        { useClass: UserRepository },
        { lifecycle: Lifecycle.Singleton }
    )
    .register<UserServiceContract>(
        "UserServiceContract",
        { useClass: UserService },
        { lifecycle: Lifecycle.Singleton }
    )
    .register<TournamentRepositoryContract>(
        "TournamentRepositoryContract",
        { useClass: TournamentRepository },
        { lifecycle: Lifecycle.Singleton }
    )
    .register<PlayerRepositoryContract>(
        "PlayerRepositoryContract",
        { useClass: PlayerRepository },
        { lifecycle: Lifecycle.Singleton }
    );

export { container };
