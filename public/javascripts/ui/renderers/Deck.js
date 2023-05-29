class Card {
    static width = 150;
    static height = 225;
    constructor(card, x, y, img, font) {
        this.card = card;
        this.x = x;
        this.y = y;
        this.dragging = false;
        this.offsety = 0;
        this.offsetx = 0;
        this.dragx = 0;
        this.dragy = 0;
        this.selected = false;
        this.font = font
    }
    draw() {
        if (this.card.cardId == 1) {
            image(GameInfo.images.corn_archer, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 115, this.y + 23)
            text(this.card.current_damage, this.x + 45, this.y + 23)
            pop()
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.corn_archer, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }

        }
        if (this.card.cardId == 2) {
            image(GameInfo.images.tomato_guy, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 115, this.y + 23)
            text(this.card.current_damage, this.x + 45, this.y + 23)
            pop()
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.tomato_guy, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 3) {
            image(GameInfo.images.castle, this.x, this.y, Card.width, Card.height);
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.castle, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 4) {
            image(GameInfo.images.fireball, this.x, this.y, Card.width, Card.height);
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.fireball, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 5) {
            image(GameInfo.images.macho_pig, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 115, this.y + 23)
            text(this.card.current_damage, this.x + 45, this.y + 23)
            pop()
            if (this.dragging == true) {
                tint(255, 100);
                image(GameInfo.images.macho_pig, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 6) {
            image(GameInfo.images.farmer, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 115, this.y + 23)
            text(this.card.current_damage, this.x + 45, this.y + 23)
            pop()
            if (this.dragging == true) {
                tint(255, 100);
                image(GameInfo.images.farmer, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 7) {
            image(GameInfo.images.corn_witch, this.x, this.y, Card.width, Card.height);
            push();
            textFont(GameInfo.fonts.font)
            text(this.card.current_hp, this.x + 115, this.y + 23)
            text(this.card.current_damage, this.x + 45, this.y + 23)
            pop()
            if (this.dragging == true) {
                tint(255, 100);
                image(GameInfo.images.corn_witch, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 8) {
            image(GameInfo.images.great_wall, this.x, this.y, Card.width, Card.height);
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.great_wall, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 9) {
            image(GameInfo.images.barn, this.x, this.y, Card.width, Card.height);
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.barn, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 10) {
            image(GameInfo.images.farm_house, this.x, this.y, Card.width, Card.height);
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.farm_house, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 11) {
            image(GameInfo.images.corn_field, this.x, this.y, Card.width, Card.height);
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.corn_field, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 12) {
            image(GameInfo.images.iceball, this.x, this.y, Card.width, Card.height);
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.iceball, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 13) {
            image(GameInfo.images.holy_beam, this.x, this.y, Card.width, Card.height);
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.holy_beam, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 14) {
            image(GameInfo.images.darkness_beam, this.x, this.y, Card.width, Card.height);
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.darkness_beam, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
        if (this.card.cardId == 15) {
            image(GameInfo.images.grass_touch, this.x, this.y, Card.width, Card.height);
            if (this.dragging) {
                tint(255, 100);
                image(GameInfo.images.grass_touch, this.dragx, this.dragy, Card.width, Card.height);
                tint(255, 255);
                noTint()
            }
        }
    }
}


class Deck {

    constructor(cardsInfo, x, y, dragAction, font) {
        this.x = x;
        this.y = y;
        this.width = Card.width * Deck.nCards;
        this.cards = this.createCards(cardsInfo);
        this.draggable = false;
        this.dragAction = dragAction;
        this.font = font
        this.dragging = false
        this.draggingCard = null;
    }

    createCards(cardsInfo) {
        let cards = [];
        let x = this.x;
        for (let cardInfo of cardsInfo) {
            cards.push(new Card(cardInfo, x, this.y, this.font));
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

        if (this.dragging == true) {
            if (mouseX > 552 && mouseX < 708 && mouseY > 410 && mouseY < 612) {
                push()
                fill(0, 0, 0, 100)
                rect(552, 410, 160, 202)
                pop()
            }
            if (mouseX > 709 && mouseX < 865 && mouseY > 410 && mouseY < 612) {
                push()
                fill(0, 0, 0, 100)
                rect(709, 410, 160, 202)
                pop()
            }
            if (mouseX > 866 && mouseX < 1020 && mouseY > 410 && mouseY < 612) {
                push()
                fill(0, 0, 0, 100)
                rect(866, 410, 160, 202)
                pop()
            }
            if (mouseX > 1021 && mouseX < 1175 && mouseY > 410 && mouseY < 612) {
                push()
                fill(0, 0, 0, 100)
                rect(1021, 410, 155, 202)
                pop()
            }
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
                this.dragging = true
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
        this.dragging = false;
    }

    getPlayerColumnAt(x, y) {
        if (x > 552 && x < 712 && y > 410 && y < 612) {
            return 1
        }
        if (x > 709 && x < 865 && y > 410 && y < 612) {
            return 2
        }
        if (x > 866 && x < 1020 && y > 410 && y < 612) {
            return 3
        }
        if (x > 1021 && x < 1175 && y > 410 && y < 612) {
            return 4
        }
    }

    mouseontop() {
        if (this.draggable) {
            if (this.dragging == false) {
                for (let card of this.cards) {
                    let ypos = 650

                    if (mouseX > card.x && mouseX < card.x + Card.width && mouseY > ypos && mouseY < ypos + Card.height + 100) {
                        card.y = 650
                    } else {
                        card.y = 700
                    }
                }
            }
        }
    }
}