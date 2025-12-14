export class User {
	id?: string;
	email: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}
