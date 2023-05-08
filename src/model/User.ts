type UserFilter = {
    query?: string;
};

class User {
    id?: number;
    name?: string;
    email?: string;
    role?: unknown;

    constructor(params: any) {
        Object.assign(this, params);
      }

    isAdmin(): boolean {
        return false;
    }
}

export {User, UserFilter};