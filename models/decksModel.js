const pool = require("../config/database");
const Settings = require("./gameSettings");

function fromDBCardToCard(dbCard) {
    return new Card(dbCard.crd_id,dbCard.ugc_id,dbCard.crd_hp,
        dbCard.crd_damage, dbCard.crd_type_id, dbCard.ugc_board_pos,
        new CardType(dbCard.ct_id,dbCard.ct_name),
        );
}

class CardType {
    constructor (id,name) {
        this.id = id;
        this.name = name;
    }
}

class Card {
    constructor(cardId,deckId,hp,damage,type, pos) {
        this.cardId = cardId;
        this.deckId = deckId;
        this.hp = hp;
        this.damage = damage;
        this.type = type;
        this.pos = pos;
    }

    static async genCard(playerId) {
        try {
            let [cards] = await pool.query(`select * from card inner join card_type on crd_type_id = ct_id`);
            let rndCard = fromDBCardToCard(cards[Math.floor(Math.random()*cards.length)]);
            // insert the card
            let [result] = await pool.query(`Insert into user_game_card (ugc_user_game_id,ugc_crd_id,ugc_board_pos)
                  values (?,?,?)`, [playerId,rndCard.cardId,0]);
            return {status:200, result: rndCard};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

class MatchDecks {
    constructor(mycards,oppcards) {
        this.mycards = mycards;
        this.oppcards = oppcards;
    }

    // No verifications are made since this is consider to be an auxiliary method
    // We consider it will only be called at the right time
    static async genPlayerDeck(playerId) {
        try {
            let cards =[];
            for (let i=0; i < Settings.nCards; i++) {
                let result = await Card.genCard(playerId);
                cards.push(result.result);
            }
            return {status:200, result: cards};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    // No verifications are made since this is consider to be an auxiliary method
    // We consider it will only be called at the right time
    static async resetPlayerDeck(playerId) {
        try {
            let [result] = await pool.query(`delete from user_game_card where ugc_user_game_id = ?`, [playerId]);
            return {status:200, result: {msg:"All cards removed"}};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async getMatchDeck(game) {
        try {
            let [dbcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? or ugc_user_game_id = ?`, 
                [game.player.id, game.opponents[0].id]);
            let playerCards = [];
            let oppCards = [];
            for(let dbcard of dbcards) {
                let card = fromDBCardToCard(dbcard);
                if (dbcard.ugc_user_game_id == game.player.id) {
                    playerCards.push(card);
                } else {
                    oppCards.push(card);
                }
            }
            return {status:200, result: new MatchDecks(playerCards,oppCards)};
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

module.exports = MatchDecks;
