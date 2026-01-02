import { Db } from 'mongodb';
import { CardRepository } from '../repository/cardRepository';
import { SetRepository } from '../repository/setRepository';
import { CardController } from '../controllers/cardController';
import { SetController } from '../controllers/setController';

export type Container = {
    cardRepository: CardRepository;
    setRepository: SetRepository;
    cardController: CardController;
    setController: SetController;
};

export function createContainer(db: Db): Container {
    const cardRepository = new CardRepository(db);
    const setRepository = new SetRepository(db);

    const cardController = new CardController(cardRepository);
    const setController = new SetController(setRepository);

    return { cardRepository, setRepository, cardController, setController };
}
