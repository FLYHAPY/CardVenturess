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
        if (this.card.pos == 1) {
            if (this.card.cardId == 1) {
                push();
                scale(1, -1);
                image(this.img, BoardCardOpp.pos1x, -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop();
                text(this.card.current_hp, BoardCardOpp.pos1x + 100, BoardCardOpp.pos1y)
                text(this.card.current_damage, BoardCardOpp.pos1x, BoardCardOpp.pos1y)
            }
            if (this.card.cardId == 2) {
                push();
                scale(1, -1);
                image(this.charmander, BoardCardOpp.pos1x, -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop();
                text(this.card.current_hp, BoardCardOpp.pos1x + 100, BoardCardOpp.pos1y)
                text(this.card.current_damage, BoardCardOpp.pos1x, BoardCardOpp.pos1y)
            }
            if (this.card.cardId == 3) {
                push();
                scale(1, -1);
                image(this.building, BoardCardOpp.pos1x, -BoardCardOpp.pos1y + 100, BoardCardOpp.width, BoardCardOpp.height);
                pop();
                text(this.card.current_hp, BoardCardOpp.pos1x + 100, BoardCardOpp.pos1y - 100)
                text(this.card.current_damage, BoardCardOpp.pos1x, BoardCardOpp.pos1y - 100)
            }
            if (this.card.cardId == 4) {
                push();
                scale(1, -1);
                image(this.spell, BoardCardOpp.pos1x, -BoardCardOpp.pos1y+ 200, BoardCardOpp.width, BoardCardOpp.height);
                pop();
                fill(255, 255, 255);
                text(this.card.current_hp, BoardCardOpp.pos1x + 100, BoardCardOpp.pos1y - 200)
                text(this.card.current_damage, BoardCardOpp.pos1x, BoardCardOpp.pos1y - 200)
            }
        }
        if (this.card.pos == 2) {
            if (this.card.cardId == 1) {
                push();
                scale(1, -1);
                image(this.img, BoardCardOpp.pos1x + 200, -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCardOpp.pos1x + 200 + 100, BoardCardOpp.pos1y)
                text(this.card.current_damage, BoardCardOpp.pos1x + 200, BoardCardOpp.pos1y)
            }
            if (this.card.cardId == 2) {
                push();
                scale(1, -1);
                image(this.charmander, BoardCardOpp.pos1x + 200, -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCardOpp.pos1x + 200 + 100, BoardCardOpp.pos1y)
                text(this.card.current_damage, BoardCardOpp.pos1x + 200, BoardCardOpp.pos1y)
            }
            if (this.card.cardId == 3) {
                push();
                scale(1, -1);
                image(this.building, BoardCardOpp.pos1x + 200, -BoardCardOpp.pos1y + 100, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCardOpp.pos1x + 200 + 100, BoardCardOpp.pos1y - 100)
                text(this.card.current_damage, BoardCardOpp.pos1x + 200, BoardCardOpp.pos1y - 100)
            }
            if (this.card.cardId == 4) {
                push();
                scale(1, -1);
                image(this.spell, BoardCardOpp.pos1x + 200, -BoardCardOpp.pos1y+ 200, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(255, 255, 255);
                text(this.card.current_hp, BoardCardOpp.pos1x + 200 + 100, BoardCardOpp.pos1y - 200)
                text(this.card.current_damage, BoardCardOpp.pos1x + 200, BoardCardOpp.pos1y - 200)
            }
        }
        if (this.card.pos == 3) {
            if (this.card.cardId == 1) {
                push();
                scale(1, -1);
                image(this.img, BoardCardOpp.pos1x + 400, -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCardOpp.pos1x + 400 + 100, BoardCardOpp.pos1y)
                text(this.card.current_damage, BoardCardOpp.pos1x + 400, BoardCardOpp.pos1y)
            }
            if (this.card.cardId == 2) {
                push();
                scale(1, -1);
                image(this.charmander, BoardCardOpp.pos1x + 400, -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCardOpp.pos1x + 400 + 100, BoardCardOpp.pos1y)
                text(this.card.current_damage, BoardCardOpp.pos1x + 400, BoardCardOpp.pos1y)
            }
            if (this.card.cardId == 3) {
                push();
                scale(1, -1);
                image(this.building, BoardCardOpp.pos1x + 400, -BoardCardOpp.pos1y + 100, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCardOpp.pos1x + 400 + 100, BoardCardOpp.pos1y - 100)
                text(this.card.current_damage, BoardCardOpp.pos1x + 400, BoardCardOpp.pos1y - 100)
            }
            if (this.card.cardId == 4) {
                push();
                scale(1, -1);
                image(this.spell, BoardCardOpp.pos1x + 400, -BoardCardOpp.pos1y+ 200, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(255, 255, 255);
                text(this.card.current_hp, BoardCardOpp.pos1x + 400 + 100, BoardCardOpp.pos1y - 200)
                text(this.card.current_damage, BoardCardOpp.pos1x + 400, BoardCardOpp.pos1y - 200)
            }
        }
        if (this.card.pos == 4) {
            if (this.card.cardId == 1) {
                push();
                scale(1, -1);
                image(this.img, BoardCardOpp.pos1x + 600, -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCardOpp.pos1x + 600 + 100, BoardCardOpp.pos1y)
                text(this.card.current_damage, BoardCardOpp.pos1x + 600, BoardCardOpp.pos1y)
            }
            if (this.card.cardId == 2) {
                push();
                scale(1, -1);
                image(this.charmander, BoardCardOpp.pos1x + 600, -BoardCardOpp.pos1y, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCardOpp.pos1x + 600 + 100, BoardCardOpp.pos1y)
                text(this.card.current_damage, BoardCardOpp.pos1x + 600, BoardCardOpp.pos1y)
            }
            if (this.card.cardId == 3) {
                push();
                scale(1, -1);
                image(this.building, BoardCardOpp.pos1x + 600, -BoardCardOpp.pos1y + 100, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(0, 0, 0);
                text(this.card.current_hp, BoardCardOpp.pos1x + 600 + 100, BoardCardOpp.pos1y - 100)
                text(this.card.current_damage, BoardCardOpp.pos1x + 600, BoardCardOpp.pos1y - 100)
            }
            if (this.card.cardId == 4) {
                push();
                scale(1, -1);
                image(this.spell, BoardCardOpp.pos1x + 600, -BoardCardOpp.pos1y+ 200, BoardCardOpp.width, BoardCardOpp.height);
                pop()
                fill(255, 255, 255);
                text(this.card.current_hp, BoardCardOpp.pos1x + 600 + 100, BoardCardOpp.pos1y - 200)
                text(this.card.current_damage, BoardCardOpp.pos1x + 600, BoardCardOpp.pos1y - 200)
            }
        }
    }
}


class OppBoard {

    constructor(cardsInfo, cardImg,charmander, building, spell) {
        this.width = BoardCardOpp.width*Deck.nCards;
        this.cardImg = cardImg;
        this.charmanderImg = charmander;
        this.building = building
        this.spell = spell
        this.cards = this.createCards(cardsInfo);
    }
    
    createCards(cardsInfo) {
        let Board2 = [];
        let x = this.x;
        if(cardsInfo){
            for (let cardInfo of cardsInfo) {
                Board2.push(new BoardCardOpp(cardInfo, this.cardImg, this.charmanderImg, this.building, this.spell));
            }
        }
        return Board2;
    }
    
    update(cardsInfo) {
        this.cards = this.createCards(cardsInfo);
    }

    draw () {
        for (let BoardCardOpp of this.cards) {
            BoardCardOpp.draw();
        }
    }
}