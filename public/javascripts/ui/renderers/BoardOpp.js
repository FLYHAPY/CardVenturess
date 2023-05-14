class BoardCardOpp {
    static width = 140;
    static height = 210;
    static pos1x = 450
    static pos1y = 500
    constructor(card, img, charmander, building, spell) {
        this.card = card;
        this.img = img;
        this.charmander = charmander;
        this.building = building;
        this.spell = spell;
    }
    draw() {
        switch (this.card.cardId) {
            case 1:
                push();
                scale(1, -1);
                image(this.img, BoardCardOpp.pos1x + 200 * (this.card.pos - 1), -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                text(this.card.current_hp, BoardCardOpp.pos1x + 100 + 200 * (this.card.pos - 1), BoardCardOpp.pos1y)
                text(this.card.current_damage, BoardCardOpp.pos1x + 200 * (this.card.pos - 1), BoardCardOpp.pos1y)
                break;
            case 2:
                push();
                scale(1, -1);
                image(this.charmander, BoardCardOpp.pos1x + 200 * (this.card.pos - 1), -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                text(this.card.current_hp, BoardCardOpp.pos1x + 100 + 200 * (this.card.pos - 1), BoardCardOpp.pos1y)
                text(this.card.current_damage, BoardCardOpp.pos1x + 200 * (this.card.pos - 1), BoardCardOpp.pos1y)
                break;
            case 3:
                push();
                scale(1, -1);
                image(this.building, BoardCardOpp.pos1x + 200 * (this.card.pos - 1), -BoardCardOpp.pos1y + 100, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                text(this.card.current_hp, BoardCardOpp.pos1x + 100 + 200 * (this.card.pos - 1), BoardCardOpp.pos1y - 100)
                text(this.card.current_damage, BoardCardOpp.pos1x + 200 * (this.card.pos - 1), BoardCardOpp.pos1y - 100)
                break;
            case 4:
                push();
                scale(1, -1);
                image(this.spell, BoardCardOpp.pos1x + 200 * (this.card.pos - 1), -BoardCardOpp.pos1y + 200, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(255, 255, 255);
                text(this.card.current_hp, BoardCardOpp.pos1x + 100 + 200 * (this.card.pos - 1), BoardCardOpp.pos1y - 200)
                text(this.card.current_damage, BoardCardOpp.pos1x + 200 * (this.card.pos - 1), BoardCardOpp.pos1y - 200)
                break;
            default:
                break;
        }
    }
}

class OppBoard {

    constructor(cardsInfo, cardImg, charmander, building, spell) {
        this.width = BoardCardOpp.width * Deck.nCards;
        this.cardImg = cardImg;
        this.charmanderImg = charmander;
        this.building = building
        this.spell = spell
        this.cards = this.createCards(cardsInfo);
    }

    createCards(cardsInfo) {
        let Board2 = [];
        let x = this.x;
        if (cardsInfo) {
            for (let cardInfo of cardsInfo) {
                Board2.push(new BoardCardOpp(cardInfo, this.cardImg, this.charmanderImg, this.building, this.spell));
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