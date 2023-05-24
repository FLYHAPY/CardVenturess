class BoardCard {
    static width = 140;
    static height = 210;
    static pos1x = 530;
    static pos1y = 600;
    constructor(card, img, charmander, building, spell, machopig) {
        this.card = card;
        this.img = img;
        this.charmander = charmander;
        this.building = building;
        this.spell = spell;
        this.machopig = machopig;
    }
    draw() {
        switch (this.card.cardId) {
            case 1:
                image(
                    this.img,
                    BoardCard.pos1x + 200 * (this.card.pos - 1),
                    BoardCard.pos1y,
                    BoardCard.width,
                    BoardCard.height
                );
                text(
                    this.card.current_hp,
                    BoardCard.pos1x + 100 + 200 * (this.card.pos - 1),
                    BoardCard.pos1y
                );
                text(
                    this.card.current_damage,
                    BoardCard.pos1x + 200 * (this.card.pos - 1),
                    BoardCard.pos1y
                );
                break;
            case 2:
                image(
                    this.charmander,
                    BoardCard.pos1x + 200 * (this.card.pos - 1),
                    BoardCard.pos1y,
                    BoardCard.width,
                    BoardCard.height
                );
                text(
                    this.card.current_hp,
                    BoardCard.pos1x + 100 + 200 * (this.card.pos - 1),
                    BoardCard.pos1y
                );
                text(
                    this.card.current_damage,
                    BoardCard.pos1x + 200 * (this.card.pos - 1),
                    BoardCard.pos1y
                );
                break;
            case 3:
                image(
                    this.building,
                    BoardCard.pos1x + 200 * (this.card.pos - 1),
                    BoardCard.pos1y + 100,
                    BoardCard.width,
                    BoardCard.height
                );
                text(
                    this.card.current_hp,
                    BoardCard.pos1x + 100 + 200 * (this.card.pos - 1),
                    BoardCard.pos1y + 100
                );
                text(
                    this.card.current_damage,
                    BoardCard.pos1x + 200 * (this.card.pos - 1),
                    BoardCard.pos1y + 100
                );
                break;
            case 4:
                image(
                    this.spell,
                    BoardCard.pos1x + 200 * (this.card.pos - 1),
                    BoardCard.pos1y + 200,
                    BoardCard.width,
                    BoardCard.height
                );
                fill(255, 255, 255);
                text(
                    this.card.current_hp,
                    BoardCard.pos1x + 100 + 200 * (this.card.pos - 1),
                    BoardCard.pos1y + 200
                );
                text(
                    this.card.current_damage,
                    BoardCard.pos1x + 200 * (this.card.pos - 1),
                    BoardCard.pos1y + 200
                );
                break;
            case 5:
                image(GameInfo.images.machopig, BoardCard.pos1x + 200 * (this.card.pos - 1), BoardCard.pos1y, BoardCard.width, BoardCard.height);
                text(this.card.current_hp, BoardCard.pos1x + 100 + 200 * (this.card.pos - 1), BoardCard.pos1y);
                text(this.card.current_damage, BoardCard.pos1x + 200 * (this.card.pos - 1), BoardCard.pos1y);
                break;
            default:
                break;
        }
    }
}

class Board {
    constructor(cardsInfo, cardImg, charmander, building, spell, font, machopig) {
        this.width = BoardCard.width * Deck.nCards;
        this.cardImg = cardImg;
        this.machopig = machopig;
        this.charmanderImg = charmander;
        this.building = building;
        this.spell = spell;
        this.font = font;
        this.cards = this.createCards(cardsInfo);
    }

    createCards(cardsInfo) {
        let Board1 = [];
        let x = this.x;
        for (let cardInfo of cardsInfo) {
            Board1.push(
                new BoardCard(cardInfo, this.cardImg, this.charmanderImg, this.building, this.spell, this.machopig)
            );
        }
        return Board1;
    }

    update(cardsInfo) {
        this.cards = this.createCards(cardsInfo);
    }

    draw() {
        for (let BoardCard of this.cards) {
            BoardCard.draw();
        }
    }
}
