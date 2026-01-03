export enum CardStatus {
	NEW = 'new',
	LEARN = 'learn',
	KNOWN = 'known',
}

export class Card {
	setId: string;
	question: string;
	answer: string;
	status: CardStatus;
	createdAt?: Date;

	constructor(
		setId: string,
		question: string,
		answer: string,
		status: CardStatus = CardStatus.NEW
	) {
		this.setId = setId;
		this.question = question;
		this.answer = answer;
		this.status = status;
		this.createdAt = new Date();
	}
}
