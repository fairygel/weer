export class User {
	username: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(username: string, password: string) {
		this.username = username;
		this.password = password;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}
