class Card {
    static width = 210;
    static height = 315;
    constructor(card,x,y,img,putin) {
        this.card = card;
        this.x = x;
        this.y = y;
        this.img = img;
        this.putin = putin;
    }
    draw() {
        if (this.card.cardId == 1) {
            image(this.img, this.x,this.y, Card.width, Card.height);
        }
        if (this.card.cardId == 2) { 
            image(this.putin, this.x,this.y, Card.width, Card.height);
        }
    }
    click() {
        return mouseX > this.x && mouseX < this.x+Card.width &&
               mouseY > this.y && mouseY < this.y+Card.height;
    }
}


class Deck {

    constructor(cardsInfo, x,y,clickAction,cardImg,putin) {
        this.x = x;
        this.y = y;
        this.width = Card.width*Deck.nCards;
        this.clickAction = clickAction
        this.cardImg = cardImg;
        this.putinImg = putin
        this.cards = this.createCards(cardsInfo);
    }
    
    createCards(cardsInfo) {
        let cards = [];
        let x = this.x;
        for (let cardInfo of cardsInfo) {
            cards.push(new Card(cardInfo,x,this.y,this.cardImg,this.putinImg));
            x += Card.width;
        }
        return cards;
    }
    
    update(cardsInfo) {
        this.cards = this.createCards(cardsInfo);
    }

    draw () {
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
}