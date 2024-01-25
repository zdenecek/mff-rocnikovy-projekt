import { PlayerCategory } from "./PlayerCategory";

export class Player {
  id: number;
  firstName: string;
  lastName: string;
  federationId?: string;
  birthDate?: Date;
  category?: PlayerCategory;

  constructor(data: Player) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.federationId = data.federationId;
    if (data.birthDate)
      this.birthDate = new Date(data.birthDate);
    this.category = data.category;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
