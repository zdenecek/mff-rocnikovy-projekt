export class Player {
  id: number;
  firstName: string;
  lastName: string;
  federationId?: string;

  constructor(data: Player) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.federationId = data.federationId;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
