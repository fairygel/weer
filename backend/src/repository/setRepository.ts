import { ObjectId, Db } from 'mongodb';
import { CardSet } from '../models/CardSet';

export class SetRepository {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    private collection() {
        return this.db.collection('sets');
    }

    async getAllSets() {
        return await this.collection().find().toArray();
    }

    async getSetById(id: string) {
        return await this.collection().findOne({ _id: new ObjectId(id) });
    }

    async createSet(set: CardSet) {
        return await this.collection().insertOne(set);
    }

    async updateSet(id: string, set: Partial<CardSet>) {
        return await this.collection().updateOne({ _id: new ObjectId(id) }, { $set: set });
    }

    async deleteSet(id: string) {
        return await this.collection().deleteOne({ _id: new ObjectId(id) });
    }
}
