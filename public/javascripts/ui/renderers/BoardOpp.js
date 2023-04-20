class BoardCardOpp {
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
        }else if (this.card.cardId == 2) { 
            image(this.putin, this.x,this.y, Card.width, Card.height);
            text(this.card.current_hp,this.x + 100, this.y)
            text(this.card.current_damage,this.x, this.y)
        }else if (this.card.cardId == 3) { 
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
}


class OppBoard {

    constructor(cardsInfo, x,y,cardImg,putin, building, spell) {
        this.x = x;
        this.y = y;
        this.width = BoardCardOpp.width*Deck.nCards;
        this.cardImg = cardImg;
        this.putinImg = putin;
        this.building = building
        this.spell = spell
        this.cards = this.createCards(cardsInfo);
    }
    
    createCards(cardsInfo) {
        let Board2 = [];
        let x = this.x;
        if(cardsInfo){
            for (let cardInfo of cardsInfo) {
                Board2.push(new BoardCardOpp(cardInfo,x,this.y,this.cardImg,this.putinImg, this.building, this.spell));
                x += BoardCardOpp.width;
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