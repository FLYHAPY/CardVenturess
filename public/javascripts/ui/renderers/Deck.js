class Card {
    static width = 210;
    static height = 315;
    constructor(card,x,y,img) {
        this.card = card;
        this.x = x;
        this.y = y;
        this.img = img;
    }
    draw() {
        image(this.img, this.x,this.y, Card.width, Card.height);
    }
}


class Deck {

    constructor(cardsInfo, x,y,cardImg) {
        this.x = x;
        this.y = y;
        this.width = Card.width*Deck.nCards;
        this.cardImg = cardImg;
        this.cards = this.createCards(cardsInfo);
    }
    
    createCards(cardsInfo) {
        let cards = [];
        let x = this.x;
        for (let cardInfo of cardsInfo) {
            cards.push(new Card(cardInfo,x,this.y,this.cardImg));
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
}