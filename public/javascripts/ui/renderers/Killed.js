class KilledCard {
    static width = 140;
    static height = 210;
    constructor(card, x, y, img, charmander, building, spell) {
        this.card = card;
        this.x = x;
        this.y = y;
        this.img = img;
        this.charmander = charmander;
        this.building = building;
        this.spell = spell;
    }
    draw() {
        if (this.card.cardId == 1) {
            image(this.img, this.x, this.y, KilledCard.width, KilledCard.height);
            text(this.card.current_hp, this.x + 100, this.y)
            text(this.card.current_damage, this.x, this.y)

        }
        if (this.card.cardId == 2) {
            image(this.charmander, this.x, this.y, KilledCard.width, KilledCard.height);
            text(this.card.current_hp, this.x + 100, this.y)
            text(this.card.current_damage, this.x, this.y)
        }
        if (this.card.cardId == 3) {
            image(this.building, this.x, this.y, KilledCard.width, KilledCard.height);
            text(this.card.current_hp, this.x + 100, this.y)
            text(this.card.current_damage, this.x, this.y)
        }
        if (this.card.cardId == 4) {
            image(this.spell, this.x, this.y, KilledCard.width, KilledCard.height);
            text(this.card.current_hp, this.x + 100, this.y)
            text(this.card.current_damage, this.x, this.y)
        }
    }
}


class KilledDeck {

    constructor(cardsInfo, x, y, cardImg, charmander, building, spell) {
        this.x = x;
        this.y = y;
        this.width = KilledCard.width * KilledDeck.nCards;
        this.cardImg = cardImg;
        this.charmanderImg = charmander;
        this.building = building;
        this.spell = spell
        this.cards = this.createCards(cardsInfo);
    }

    createCards(cardsInfo) {
        let cards = [];
        let y = this.y;
        for (let cardInfo of cardsInfo) {
            cards.push(new KilledCard(cardInfo, this.x, y, this.cardImg, this.charmanderImg, this.building, this.spell));
            y += 105;
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