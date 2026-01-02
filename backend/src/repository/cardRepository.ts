import { ObjectId, Db } from 'mongodb';
import { Card } from '../models/Card';

export class CardRepository {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    private collection() {
        return this.db.collection('cards');
    }

    async getAllCards(setId?: string) {
        const query = setId ? { setId: String(setId) } : {};
        return await this.collection().find(query).toArray();
    }

    async getCardById(id: string) {
        return await this.collection().findOne({ _id: new ObjectId(id) });
    }

    async createCard(card: Card) {
        return await this.collection().insertOne(card);
    }

    async updateCard(id: string, card: Card) {
        return await this.collection().updateOne({ _id: new ObjectId(id) }, { $set: card });
    }

    async deleteCard(id: string) {
        return await this.collection().deleteOne({ _id: new ObjectId(id) });
    }
}
