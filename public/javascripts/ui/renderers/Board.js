class BoardCard {
    static width = 140;
    static height = 210;
    static pos1x = 450
    static pos1y = 600
    constructor(card, img, charmander, building, spell) {
        this.card = card;
        this.img = img;
        this.charmander = charmander;
        this.building = building;
        this.spell = spell;
    }
    draw() {
        if (this.card.pos == 1) {
            if (this.card.cardId == 1) {
                image(this.img, BoardCard.pos1x, BoardCard.pos1y, BoardCard.width, BoardCard.height);
                text(this.card.current_hp, BoardCard.pos1x + 100, BoardCard.pos1y)
                text(this.card.current_damage, BoardCard.pos1x, BoardCard.pos1y)
            }
            if (this.card.cardId == 2) {
                image(this.charmander, BoardCard.pos1x, BoardCard.pos1y, BoardCard.width, BoardCard.height);
                text(this.card.current_hp, BoardCard.pos1x + 100, BoardCard.pos1y)
                text(this.card.current_damage, BoardCard.pos1x, BoardCard.pos1y)
            }
            if (this.card.cardId == 3) {
                image(this.building, BoardCard.pos1x, BoardCard.pos1y + 100, BoardCard.width, BoardCard.height);
                text(this.card.current_hp, BoardCard.pos1x + 100, BoardCard.pos1y + 100)
                text(this.card.current_damage, BoardCard.pos1x, BoardCard.pos1y + 100)
            }
            if (this.card.cardId == 4) {
                image(this.spell, BoardCard.pos1x, BoardCard.pos1y+ 200, BoardCard.width, BoardCard.height);
                fill(255, 255, 255);
                text(this.card.current_hp, BoardCard.pos1x + 100, BoardCard.pos1y + 200)
                text(this.card.current_damage, BoardCard.pos1x, BoardCard.pos1y + 200)
            }
        }
        if (this.card.pos == 2) {
            if (this.card.cardId == 1) {
                image(this.img, BoardCard.pos1x + 200, BoardCard.pos1y, BoardCard.width, BoardCard.height);
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCard.pos1x + 200 + 100, BoardCard.pos1y)
                text(this.card.current_damage, BoardCard.pos1x + 200, BoardCard.pos1y)
            }
            if (this.card.cardId == 2) {
                image(this.charmander, BoardCard.pos1x + 200, BoardCard.pos1y, BoardCard.width, BoardCard.height);
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCard.pos1x + 200 + 100, BoardCard.pos1y)
                text(this.card.current_damage, BoardCard.pos1x + 200, BoardCard.pos1y)
            }
            if (this.card.cardId == 3) {
                image(this.building, BoardCard.pos1x + 200, BoardCard.pos1y + 100, BoardCard.width, BoardCard.height);
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCard.pos1x + 200 + 100, BoardCard.pos1y + 100)
                text(this.card.current_damage, BoardCard.pos1x + 200, BoardCard.pos1y + 100)
            }
            if (this.card.cardId == 4) {
                image(this.spell, BoardCard.pos1x + 200, BoardCard.pos1y+ 200, BoardCard.width, BoardCard.height);
                fill(255, 255, 255);
                text(this.card.current_hp, BoardCard.pos1x + 200 + 100, BoardCard.pos1y + 200)
                text(this.card.current_damage, BoardCard.pos1x + 200, BoardCard.pos1y + 200)
            }
        }
        if (this.card.pos == 3) {
            if (this.card.cardId == 1) {
                image(this.img, BoardCard.pos1x + 400, BoardCard.pos1y, BoardCard.width, BoardCard.height);
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCard.pos1x + 400 + 100, BoardCard.pos1y)
                text(this.card.current_damage, BoardCard.pos1x + 400, BoardCard.pos1y)
            }
            if (this.card.cardId == 2) {
                image(this.charmander, BoardCard.pos1x + 400, BoardCard.pos1y, BoardCard.width, BoardCard.height);
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCard.pos1x + 400 + 100, BoardCard.pos1y)
                text(this.card.current_damage, BoardCard.pos1x + 400, BoardCard.pos1y)
            }
            if (this.card.cardId == 3) {
                image(this.building, BoardCard.pos1x + 400, BoardCard.pos1y + 100, BoardCard.width, BoardCard.height);
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCard.pos1x + 400 + 100, BoardCard.pos1y + 100)
                text(this.card.current_damage, BoardCard.pos1x + 400, BoardCard.pos1y + 100)
            }
            if (this.card.cardId == 4) {
                image(this.spell, BoardCard.pos1x + 400, BoardCard.pos1y+ 200, BoardCard.width, BoardCard.height);
                fill(255, 255, 255);
                text(this.card.current_hp, BoardCard.pos1x + 400 + 100, BoardCard.pos1y + 200)
                text(this.card.current_damage, BoardCard.pos1x + 400, BoardCard.pos1y + 200)
            }
        }
        if (this.card.pos == 4) {
            if (this.card.cardId == 1) {
                image(this.img, BoardCard.pos1x + 600, BoardCard.pos1y, BoardCard.width, BoardCard.height);
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCard.pos1x + 600 + 100, BoardCard.pos1y)
                text(this.card.current_damage, BoardCard.pos1x + 600, BoardCard.pos1y)
            }
            if (this.card.cardId == 2) {
                image(this.charmander, BoardCard.pos1x + 600, BoardCard.pos1y, BoardCard.width, BoardCard.height);
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCard.pos1x + 600 + 100, BoardCard.pos1y)
                text(this.card.current_damage, BoardCard.pos1x + 600, BoardCard.pos1y)
            }
            if (this.card.cardId == 3) {
                image(this.building, BoardCard.pos1x + 600, BoardCard.pos1y + 100, BoardCard.width, BoardCard.height);
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCard.pos1x + 600 + 100, BoardCard.pos1y + 100)
                text(this.card.current_damage, BoardCard.pos1x + 600, BoardCard.pos1y + 100)
            }
            if (this.card.cardId == 4) {
                image(this.spell, BoardCard.pos1x + 600, BoardCard.pos1y+ 200, BoardCard.width, BoardCard.height);
                fill(255, 255, 255);
                text(this.card.current_hp, BoardCard.pos1x + 600 + 100, BoardCard.pos1y + 200)
                text(this.card.current_damage, BoardCard.pos1x + 600, BoardCard.pos1y + 200)
            }
        }
    }
}


class Board {

    constructor(cardsInfo, cardImg, charmander, building, spell) {
        this.width = BoardCard.width * Deck.nCards;
        this.cardImg = cardImg;
        this.charmanderImg = charmander;
        this.building = building;
        this.spell = spell;
        this.cards = this.createCards(cardsInfo);
    }

    createCards(cardsInfo) {
        let Board1 = [];
        let x = this.x;
        for (let cardInfo of cardsInfo) {
            Board1.push(new BoardCard(cardInfo, this.cardImg, this.charmanderImg, this.building, this.spell));
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