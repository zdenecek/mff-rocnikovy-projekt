import { UserServiceContract } from "./UserServiceContract";
import { User } from "@/model/User";
import { UserRepositoryContract } from "@/repository/UserRepositoryContract";
import { inject, injectable } from "tsyringe";
import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events"

@injectable()
export class UserService implements UserServiceContract {
    private currentUser?: Promise<User | undefined>;
    public loggedIn?: boolean = undefined;

    protected _userStatusChanged = new SimpleEventDispatcher<void>();

    public get userStatusChanged(): ISimpleEvent<void> {
        return this._userStatusChanged.asEvent();
    }

    constructor(
        @inject("UserRepositoryContract")
        private userRepository: UserRepositoryContract
    ) {
        const user = localStorage.getItem("user");
        if (user) {
            if (user === "none") {
                this.currentUser = Promise.resolve(undefined);
                this.loggedIn = false;
                console.debug("loaded user from local storage (none)");
            } else {
                const userObj = JSON.parse(user);
                this.currentUser = Promise.resolve(new User(userObj));
                this.loggedIn = true;
                console.debug(
                    `loaded user from local storage (${userObj.name})`
                );
            }
            this._userStatusChanged.dispatch();
        }
    }

    async logout(): Promise<void> {
        this.loggedIn = false;
        this._userStatusChanged.dispatch();
        await this.userRepository.logout();
        this.currentUser = undefined;
        localStorage.removeItem("user");
        console.debug("logged out");
    }

    async isLoggedIn(): Promise<boolean> {
        if (this.loggedIn !== undefined) return this.loggedIn;

        return (await this.user()) !== undefined;
    }

    async login(email: string, password: string): Promise<void> {
        await this.userRepository.login(email, password);
        this._userStatusChanged.dispatch();
        this.loggedIn = true;
        this.loadUser(true);
    }

    async register(
        email: string,
        name: string,
        password: string,
        confirmPassword: string
    ): Promise<void> {
        await this.userRepository.register(
            email,
            name,
            password,
            confirmPassword
        );
    }

    async user(): Promise<User | undefined> {
        if (!this.loggedIn) return undefined;
        return this.loadUser();
    }

    private persistUser(user: User | undefined): void {
        if (!user) localStorage.setItem("user", "none");
        else localStorage.setItem("user", JSON.stringify(user));
        console.debug("persisted user");
    }

    private async loadUser(forced = false): Promise<User | undefined> {
        if (!this.currentUser || forced)
            this.currentUser = this.userRepository
                .getCurrentUser()
                .then((user) => {
                    this.persistUser(user);
                    return user;
                });

        return this.currentUser;
    }
}
