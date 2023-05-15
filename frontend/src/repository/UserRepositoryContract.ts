import { Paginator } from "@/api/Paginator";
import { User, UserFilter } from "@/model/User";

export interface UserRepositoryContract {

    login(email: string, password: string): Promise<unknown>; 
    register(email: string, name: string, password: string, confirmPassword: string): Promise<unknown>;
    logout(): Promise<void>;
    getCurrentUser(): Promise<User | undefined>;
    getUser(id: number): Promise<User>;
    getUsers(perPage: number, page: number, filter: UserFilter): Promise<Paginator<User>>;
}
