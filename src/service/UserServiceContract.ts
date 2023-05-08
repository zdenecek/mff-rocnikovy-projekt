import { User } from "@/model/User";

export interface UserServiceContract {

    login(email: string, password: string): Promise<void> ;
    register(email: string, name: string, password: string, confirmPassword: string): Promise<void>;
    logout(): Promise<void>;
isLoggedIn(): Promise<boolean>;
    user(): Promise<User | undefined>;
}