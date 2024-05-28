import { PlayerCategory } from "./PlayerCategory";

export class Player {
  id: number;
  firstName: string;
  lastName: string;
  federationId?: string;
  birthdate?: Date;
  category?: PlayerCategory;

  static empty() {
    return new Player({
      id: 0,
      firstName: "",
      lastName: "",
      federationId: "",
      birthdate: undefined,
      category: undefined,
    } as Player);
  }

  constructor(data: Player) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.federationId = data.federationId;
    if (data.birthdate) this.birthdate = new Date(data.birthdate);
    this.category = data.category;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  toJSON(): any {
    const data = { ...this, birthdate: "" };
    // @ts-ignore
    data.birthdate = this.birthdate?.toISOString().split("T")[0];
    return data;
  }
}
