class BoardCard {
    static width = 120;
    static height = 190;
    static pos1x = 570;
    static pos1y = 420;
    constructor(card) {
        this.card = card;
    }
    draw() {
        switch (this.card.cardId) {
            case 1:
                textFont(GameInfo.fonts.font)
                image(GameInfo.images.corn_archer, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y, BoardCard.width, BoardCard.height);
                text(this.card.current_hp, BoardCard.pos1x + 90 + 155 * (this.card.pos - 1), BoardCard.pos1y + 19);
                text(this.card.current_damage, BoardCard.pos1x + 33 + 155 * (this.card.pos - 1), BoardCard.pos1y + 19);
                break;
            case 2:
                textFont(GameInfo.fonts.font)
                image(GameInfo.images.tomato_guy, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y, BoardCard.width, BoardCard.height);
                text(this.card.current_hp, BoardCard.pos1x + 90 + 155 * (this.card.pos - 1), BoardCard.pos1y + 19);
                text(this.card.current_damage, BoardCard.pos1x + 33 + 155 * (this.card.pos - 1), BoardCard.pos1y + 19);
                break;
            case 3:
                image(GameInfo.images.castle, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y + 40, BoardCard.width, BoardCard.height);
                break;
            case 4:
                image(GameInfo.images.fireball, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y + 80, BoardCard.width, BoardCard.height);
                break;
            case 5:
                textFont(GameInfo.fonts.font)
                image(GameInfo.images.macho_pig, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y, BoardCard.width, BoardCard.height);
                text(this.card.current_hp, BoardCard.pos1x + 90 + 155 * (this.card.pos - 1), BoardCard.pos1y + 19);
                text(this.card.current_damage, BoardCard.pos1x + 33 + 155 * (this.card.pos - 1), BoardCard.pos1y + 19);
                break;
            case 6:
                textFont(GameInfo.fonts.font)
                image(GameInfo.images.farmer, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y, BoardCard.width, BoardCard.height);
                text(this.card.current_hp, BoardCard.pos1x + 90 + 155 * (this.card.pos - 1), BoardCard.pos1y + 19);
                text(this.card.current_damage, BoardCard.pos1x + 33 + 155 * (this.card.pos - 1), BoardCard.pos1y + 19);
                break;
            case 7:
                textFont(GameInfo.fonts.font)
                image(GameInfo.images.corn_witch, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y, BoardCard.width, BoardCard.height);
                text(this.card.current_hp, BoardCard.pos1x + 90 + 155 * (this.card.pos - 1), BoardCard.pos1y + 19);
                text(this.card.current_damage, BoardCard.pos1x + 33 + 155 * (this.card.pos - 1), BoardCard.pos1y + 19);
                break;
            case 8:
                image(GameInfo.images.great_wall, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y + 40, BoardCard.width, BoardCard.height);
                break;
            case 9:
                image(GameInfo.images.barn, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y + 40, BoardCard.width, BoardCard.height);
                break;
            case 10:
                image(GameInfo.images.farm_house, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y + 40, BoardCard.width, BoardCard.height);
                break;
            case 11:
                image(GameInfo.images.corn_field, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y + 40, BoardCard.width, BoardCard.height);
                break;
            case 12:
                image(GameInfo.images.iceball, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y + 80, BoardCard.width, BoardCard.height);
                break;
            case 13:
                image(GameInfo.images.holy_beam, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y + 80, BoardCard.width, BoardCard.height);
                break;
            case 14:
                image(GameInfo.images.darkness_beam, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y + 80, BoardCard.width, BoardCard.height);
                break;
            case 15:
                image(GameInfo.images.grass_touch, BoardCard.pos1x + 155 * (this.card.pos - 1), BoardCard.pos1y + 80, BoardCard.width, BoardCard.height);
                break;
            default:
                break;
        }
    }
}

class Board {
    constructor(cardsInfo) {
        this.width = BoardCard.width * Deck.nCards;
        this.cards = this.createCards(cardsInfo);
    }

    createCards(cardsInfo) {
        let Board1 = [];
        let x = this.x;
        for (let cardInfo of cardsInfo) {
            Board1.push(
                new BoardCard(cardInfo)
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
