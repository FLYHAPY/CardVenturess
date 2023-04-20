class Card {
    static width = 210;
    static height = 315;
    constructor(card,x,y,img,putin,building,spell) {
        this.card = card;
        this.x = x;
        this.y = y;
        this.img = img;
        this.putin = putin;
        this.building = building;
        this.spell = spell;
    }
    draw() {
        if (this.card.cardId == 1) {
            image(this.img, this.x,this.y, Card.width, Card.height);
            text(this.card.current_hp,this.x + 100, this.y)
            text(this.card.current_damage,this.x, this.y)

        }
        if (this.card.cardId == 2) { 
            image(this.putin, this.x,this.y, Card.width, Card.height);
            text(this.card.current_hp,this.x + 100, this.y)
            text(this.card.current_damage,this.x, this.y)
        }
        if (this.card.cardId == 3) { 
            image(this.building, this.x,this.y, Card.width, Card.height);
            text(this.card.current_hp,this.x + 100, this.y)
            text(this.card.current_damage,this.x, this.y)
        }
        if (this.card.cardId == 4) { 
            image(this.spell, this.x,this.y, Card.width, Card.height);
            text(this.card.current_hp,this.x + 100, this.y)
            text(this.card.current_damage,this.x, this.y)
        }
    }
    click() {
        return mouseX > this.x && mouseX < this.x+Card.width &&
               mouseY > this.y && mouseY < this.y+Card.height;
               
    }
}


class Deck {

    constructor(cardsInfo, x,y,clickAction,cardImg,putin,building,spell) {
        this.x = x;
        this.y = y;
        this.width = Card.width*Deck.nCards;
        this.clickAction = clickAction
        this.cardImg = cardImg;
        this.putinImg = putin;
        this.building = building;
        this.spell = spell
        this.cards = this.createCards(cardsInfo);
    }
    
    createCards(cardsInfo) {
        let cards = [];
        let x = this.x;
        for (let cardInfo of cardsInfo) {
            cards.push(new Card(cardInfo,x,this.y,this.cardImg,this.putinImg,this.building,this.spell));
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