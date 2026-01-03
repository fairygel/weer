import { ObjectId } from 'mongodb';
import { User } from '../models/User';
import { Service } from 'typedi';
import { Database } from '../config/Database';

@Service()
export class UserRepository {
    constructor (
        private database: Database
    ) {}

    private collection() {
        const db = this.database.getDB();
        return db.collection('users');
    }

    async getAllUsers() {
        return await this.collection().find().toArray();
    }

    async createUser(user: User) {
        return await this.collection().insertOne(user);
    }

    async updateUser(id: string, user: Partial<User>) {
        return await this.collection().updateOne({ _id: new ObjectId(id) }, { $set: user });
    }

    async deleteUser(id: string) {
        return await this.collection().deleteOne({ _id: new ObjectId(id) });
    }

    async getUserByUsername(userName: string) {
        return await this.collection().findOne({ username: userName });
    }
}

