export type UserFilter = {
  query?: string;
};

export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: unknown;

  constructor(params: User) {
    Object.assign(this, params);
  }

  isAdmin(): boolean {
    return false;
  }
}
