class KilledCard {
    static width = 140;
    static height = 210;
    constructor(card, x, y) {
        this.card = card;
        this.x = x;
        this.y = y;
    }
    draw() {
        if (this.card.cardId == 1) {
            image(GameInfo.images.corn_archer, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 115, this.y + 23)
            text(this.card.current_damage, this.x + 45, this.y + 23)
            pop()
        }
        if (this.card.cardId == 2) {
            image(GameInfo.images.tomato_guy, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 115, this.y + 23)
            text(this.card.current_damage, this.x + 45, this.y + 23)
            pop()
        }
        if (this.card.cardId == 3) {
            image(GameInfo.images.castle, this.x, this.y, Card.width, Card.height);
        }
        if (this.card.cardId == 4) {
            image(GameInfo.images.fireball, this.x, this.y, Card.width, Card.height);
        }
        if (this.card.cardId == 5) {
            image(GameInfo.images.macho_pig, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 115, this.y + 23)
            text(this.card.current_damage, this.x + 45, this.y + 23)
            pop()
        }
        if (this.card.cardId == 6) {
            image(GameInfo.images.farmer, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 115, this.y + 23)
            text(this.card.current_damage, this.x + 45, this.y + 23)
            pop()
        }
        if (this.card.cardId == 7) {
            image(GameInfo.images.corn_witch, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 115, this.y + 23)
            text(this.card.current_damage, this.x + 45, this.y + 23)
            pop()
        }
        if (this.card.cardId == 8) {
            image(GameInfo.images.great_wall, this.x, this.y, Card.width, Card.height);
        }
        if (this.card.cardId == 9) {
            image(GameInfo.images.barn, this.x, this.y, Card.width, Card.height);
        }
        if (this.card.cardId == 10) {
            image(GameInfo.images.farm_house, this.x, this.y, Card.width, Card.height);
        }
        if (this.card.cardId == 11) {
            image(GameInfo.images.corn_field, this.x, this.y, Card.width, Card.height);
        }
        if (this.card.cardId == 12) {
            image(GameInfo.images.icebal, this.x, this.y, Card.width, Card.height);
        }
        if (this.card.cardId == 13) {
            image(GameInfo.images.holy_beam, this.x, this.y, Card.width, Card.height);
        }
        if (this.card.cardId == 14) {
            image(GameInfo.images.darkness_beam, this.x, this.y, Card.width, Card.height);
        }
        if (this.card.cardId == 15) {
            image(GameInfo.images.grass_touch, this.x, this.y, Card.width, Card.height);
        }
    }
}


class KilledDeck {

    constructor(cardsInfo, x, y) {
        this.x = x;
        this.y = y;
        this.width = KilledCard.width * KilledDeck.nCards;
        this.cards = this.createCards(cardsInfo);
    }

    createCards(cardsInfo) {
        let cards = [];
        let y = this.y;
        for (let cardInfo of cardsInfo) {
            cards.push(new KilledCard(cardInfo, this.x, y));
            y += 50;
        }
        return cards;
    }

    update(cardsInfo) {
        this.cards = this.createCards(cardsInfo);
    }

    draw() {
        for (let card of this.cards) {
            card.draw();
        }
    }
}