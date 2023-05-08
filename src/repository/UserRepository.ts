import { UserRepositoryContract } from "./UserRepositoryContract";
import { ApiContract } from "@/api/ApiContract";
import { User, UserFilter } from "@/model/User";
import { Paginator } from "@/api/Paginator";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserRepository implements UserRepositoryContract {
    constructor(
        @inject('ApiContract') private api: ApiContract) {}

    getUsers(perPage = 15, page = 1, filter: UserFilter): Promise<Paginator<User>> {
        return this.api
            .get("users", {
                params: {
                    query: filter.query,
                    page,
                    perPage,
                },
            })
            .then((response: any) => {
                return new Paginator(response);
            });
    }

    getCurrentUser(): Promise<User | undefined> {
        return this.api.get("user").then((response: any) => {
            const x = new User(response);
            return x;
    }).catch((error) => {
            if(error.response?.status === 401) return undefined;
        });
    }

    logout(): Promise<void> {
        return this.api.post("logout");
    }

    getUser(id: number): Promise<User> {
        return this.api.get(`user/${id}`).then((response: any) => {
            return new User(response);
        });
    }

    updateUser(data: User): Promise<void> {
        return this.api.put(`user/${data.id}`, { params: data });
    }

    deleteUser(id: number): Promise<void> {
        return this.api.delete(`user/${id}`);
    }

    async register(email: string, name: string, password: string, confirmPassword: string): Promise<void> {
        await this.api
            .post("register", {
                email,
                name,
                password,
                password_confirmation: confirmPassword,
            })
            .then(() => {
                console.debug("registered");
            });
    }

    async login(email: string, password: string): Promise<void> {
        await this.api
            .post("login", {
                email,
                password,
            })
            .then(() => {
                console.debug("logged in");
            });
    }
}
