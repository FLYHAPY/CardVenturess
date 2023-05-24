class Card {
    static width = 157.5;
    static height = 236.25;
    constructor(card, x, y, img, charmander, building, spell, font, machopig) {
        this.card = card;
        this.x = x;
        this.y = y;
        this.img = img;
        this.charmander = charmander;
        this.building = building;
        this.spell = spell;
        this.dragging = false;
        this.offsety = 0;
        this.offsetx = 0;
        this.dragx = 0;
        this.dragy = 0;
        this.selected = false;
        this.font = font
        this.machopig = machopig
    }
    draw() {
        if (this.card.cardId == 1) {
            image(this.img, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 125, this.y + 25)
            text(this.card.current_damage, this.x + 45, this.y + 25)
            pop()
            if (this.dragging) {
                tint(255, 100);
                image(this.img, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
            }

        }
        if (this.card.cardId == 2) {
            image(this.charmander, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 120, this.y + 25)
            text(this.card.current_damage, this.x + 45, this.y + 25)
            pop()
            if (this.dragging) {
                tint(255, 100);
                image(this.charmander, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
            }
        }
        if (this.card.cardId == 3) {
            image(this.building, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 100, this.y)
            text(this.card.current_damage, this.x, this.y)
            pop()
            if (this.dragging) {
                tint(255, 100);
                image(this.building, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
            }
        }
        if (this.card.cardId == 4) {
            image(this.spell, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 100, this.y)
            text(this.card.current_damage, this.x, this.y)
            pop()
            if (this.dragging) {
                tint(255, 100);
                image(this.spell, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
            }
        }
        if (this.card.cardId == 5) {
            image(this.machopig, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 123, this.y + 25)
            text(this.card.current_damage, this.x + 45, this.y + 25)
            pop()
            if (this.dragging) {
                tint(255, 100);
                image(this.machopig, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
            }

        }
    }
}


class Deck {

    constructor(cardsInfo, x, y, cardImg, charmander, building, spell, dragAction, font, machopig) {
        this.x = x;
        this.y = y;
        this.width = Card.width * Deck.nCards;
        this.cardImg = cardImg;
        this.charmanderImg = charmander;
        this.building = building;
        this.spell = spell
        this.machopig = machopig
        this.cards = this.createCards(cardsInfo);
        this.draggable = false;
        this.dragAction = dragAction;
        this.font = font
        this.draggingCard = null;
    }

    createCards(cardsInfo) {
        let cards = [];
        let x = this.x;
        for (let cardInfo of cardsInfo) {
            cards.push(new Card(cardInfo, x, this.y, this.cardImg, this.charmanderImg, this.building, this.spell, this.font, this.machopig));
            x += Card.width;
        }
        return cards;
    }

    update(cardsInfo) {
        this.cards = this.createCards(cardsInfo);
    }

    updateDrag() {
        if (this.draggingCard !== null) {
            this.draggingCard.dragx = mouseX + this.draggingCard.offsetX;
            this.draggingCard.dragy = mouseY + this.draggingCard.offsetY;
        }
    }

    draw() {
        for (let card of this.cards) {
            card.draw();
        }
    }
    click() {
        if (this.clickAction) {
            for (let card of this.cards) {
                if (card.click()) {
                    this.clickAction(card.card);
                }
            }
        }
    }
    press() {
        if (!this.draggable) {
            return;
        }
        for (let card of this.cards) {
            //este if é para saberes se o teu rato esta em cima da carta se tiver ele deixa te arrastar
            if (this.draggable && mouseX > card.x && mouseX < card.x + Card.width && mouseY > card.y && mouseY < card.y + Card.height) {
                card.offsetX = card.x - mouseX;
                card.offsetY = card.y - mouseY;
                card.dragx = mouseX + card.offsetX;
                card.dragy = mouseY + card.offsetY;
                card.dragging = true;
                this.draggingCard = card;
            }
        }
    }

    //dragndrop
    release() {
        if (!this.draggable || this.draggingCard === null) {
            return;
        }
        this.draggingCard.dragging = false;
        if (this.dragAction) {
            //isto é o que vais mandar para a action.js
            this.dragAction(mouseX, mouseY, this.draggingCard.card);
        }
        this.draggingCard = null;
    }

    getPlayerColumnAt(x, y) {
        if (x > 510 && x < 690 && y > 600 && y < 820) {
            return 1
        }
        if (x > 510 + 200 && x < 690 + 200 && y > 600 && y < 820) {
            return 2
        }
        if (x > 510 + 400 && x < 690 + 400 && y > 600 && y < 820) {
            return 3
        }
        if (x > 510 + 600 && x < 690 + 600 && y > 600 && y < 820) {
            return 4
        }
    }

    mouseontop() {
        if (this.draggable) {
            for (let card of this.cards) {
                let ypos = 1000

                if (mouseX > card.x && mouseX < card.x + Card.width && mouseY > ypos && mouseY < ypos + Card.height + 100) {
                    card.y = 1000
                } else {
                    card.y = 1100
                }
            }
        }
    }
}