class BoardCard {
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
}


class Board {

    constructor(cardsInfo, x,y,cardImg,putin) {
        this.x = x;
        this.y = y;
        this.width = BoardCard.width*Deck.nCards;
        this.cardImg = cardImg;
        this.putinImg = putin
        this.cards = this.createCards(cardsInfo);
    }
    
    createCards(cardsInfo) {
        let Board1 = [];
        let x = this.x;
        for (let cardInfo of cardsInfo) {
            Board1.push(new BoardCard(cardInfo,x,this.y,this.cardImg,this.putinImg));
            x += BoardCard.width;
        }
        return Board1;
    }
    
    update(cardsInfo) {
        this.cards = this.createCards(cardsInfo);
    }

    draw () {
        for (let BoardCard of this.cards) {
            BoardCard.draw();
        }
    }
}