class BoardCardOpp {
    static width = 120;
    static height = 190;
    static pos1x = 570
    static pos1y = 400
    constructor(card) {
        this.card = card;
    }
    draw() {
        switch (this.card.cardId) {
            case 1:
                textFont(GameInfo.fonts.font)
                push();
                scale(1, -1);
                image(GameInfo.images.corn_archer, BoardCardOpp.pos1x + 155 * (this.card.pos - 1), -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                text(this.card.current_hp, BoardCardOpp.pos1x + 91 + 155 * (this.card.pos - 1), BoardCardOpp.pos1y - 25)
                text(this.card.current_damage, BoardCardOpp.pos1x + 33 + 155 * (this.card.pos - 1), BoardCardOpp.pos1y - 25)
                break;
            case 2:
                textFont(GameInfo.fonts.font)
                push();
                scale(1, -1);
                image(GameInfo.images.tomato_guy, BoardCardOpp.pos1x + 155 * (this.card.pos - 1), -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                text(this.card.current_hp, BoardCardOpp.pos1x + 91 + 155 * (this.card.pos - 1), BoardCardOpp.pos1y - 25)
                text(this.card.current_damage, BoardCardOpp.pos1x + 33 + 155 * (this.card.pos - 1), BoardCardOpp.pos1y - 25)
                break;
            case 3:
                textFont(GameInfo.fonts.font)
                push();
                scale(1, -1);
                image(GameInfo.images.castle, BoardCardOpp.pos1x + 155 * (this.card.pos - 1), -BoardCardOpp.pos1y + 40, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                break;
            case 4:
                textFont(GameInfo.fonts.font)
                push();
                scale(1, -1);
                image(GameInfo.images.fireball, BoardCardOpp.pos1x + 155 * (this.card.pos - 1), -BoardCardOpp.pos1y + 80, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                break;
            case 5:
                textFont(GameInfo.fonts.font)
                push();
                scale(1, -1);
                image(GameInfo.images.macho_pig, BoardCardOpp.pos1x + 155 * (this.card.pos - 1), -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                text(this.card.current_hp, BoardCardOpp.pos1x + 91 + 155 * (this.card.pos - 1), BoardCardOpp.pos1y - 25)
                text(this.card.current_damage, BoardCardOpp.pos1x + 33 + 155 * (this.card.pos - 1), BoardCardOpp.pos1y - 25)
                break;
            case 6:
                textFont(GameInfo.fonts.font)
                push();
                scale(1, -1);
                image(GameInfo.images.farmer, BoardCard.pos1x + 155 * (this.card.pos - 1), -BoardCard.pos1y, BoardCard.width, BoardCard.height);
                pop()
                text(this.card.current_hp, BoardCard.pos1x + 90 + 155 * (this.card.pos - 1), BoardCard.pos1y - 25);
                text(this.card.current_damage, BoardCard.pos1x + 33 + 155 * (this.card.pos - 1), BoardCard.pos1y - 25);
                break;
            case 7:
                textFont(GameInfo.fonts.font)
                push();
                scale(1, -1);
                image(GameInfo.images.corn_witch, BoardCard.pos1x + 155 * (this.card.pos - 1), -BoardCard.pos1y, BoardCard.width, BoardCard.height);
                pop()
                text(this.card.current_hp, BoardCard.pos1x + 90 + 155 * (this.card.pos - 1), BoardCard.pos1y - 25);
                text(this.card.current_damage, BoardCard.pos1x + 33 + 155 * (this.card.pos - 1), BoardCard.pos1y - 25);
                break;
            case 8:
                push();
                scale(1, -1);
                image(GameInfo.images.great_wall, BoardCard.pos1x + 155 * (this.card.pos - 1), -BoardCard.pos1y + 40, BoardCard.width, BoardCard.height);
                pop()
                break;
            case 9:
                push();
                scale(1, -1);
                image(GameInfo.images.barn, BoardCard.pos1x + 155 * (this.card.pos - 1), -BoardCard.pos1y + 40, BoardCard.width, BoardCard.height);
                break;
            case 10:
                push();
                scale(1, -1);
                image(GameInfo.images.farm_house, BoardCard.pos1x + 155 * (this.card.pos - 1), -BoardCard.pos1y + 40, BoardCard.width, BoardCard.height);
                pop()
                break;
            case 11:
                push();
                scale(1, -1);
                image(GameInfo.images.corn_field, BoardCard.pos1x + 155 * (this.card.pos - 1), -BoardCard.pos1y + 40, BoardCard.width, BoardCard.height);
                pop()
                break;
            case 12:
                push();
                scale(1, -1);
                image(GameInfo.images.iceball, BoardCard.pos1x + 155 * (this.card.pos - 1), -BoardCard.pos1y + 80, BoardCard.width, BoardCard.height);
                pop()
                break;
            case 13:
                push();
                scale(1, -1);
                image(GameInfo.images.holy_beam, BoardCard.pos1x + 155 * (this.card.pos - 1), -BoardCard.pos1y + 80, BoardCard.width, BoardCard.height);
                pop()
                break;
            case 14:
                push();
                scale(1, -1);
                image(GameInfo.images.darkness_beam, BoardCard.pos1x + 155 * (this.card.pos - 1), -BoardCard.pos1y + 80, BoardCard.width, BoardCard.height);
                pop()
                break;
            case 15:
                push();
                scale(1, -1);
                image(GameInfo.images.grass_touch, BoardCard.pos1x + 155 * (this.card.pos - 1), -BoardCard.pos1y + 80, BoardCard.width, BoardCard.height);
                pop()
                break;
            default:
                break;
        }
    }
}

class OppBoard {

    constructor(cardsInfo) {
        this.width = BoardCardOpp.width * Deck.nCards;
        this.cards = this.createCards(cardsInfo);
    }

    createCards(cardsInfo) {
        let Board2 = [];
        let x = this.x;
        if (cardsInfo) {
            for (let cardInfo of cardsInfo) {
                Board2.push(new BoardCardOpp(cardInfo));
            }
        }
        return Board2;
    }

    update(cardsInfo) {
        this.cards = this.createCards(cardsInfo);
    }

    draw() {
        for (let BoardCardOpp of this.cards) {
            BoardCardOpp.draw();
        }
    }
}