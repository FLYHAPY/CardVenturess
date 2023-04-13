const pool = require("../config/database");
const Settings = require("./gameSettings");

function fromDBCardToCard(dbCard) {
    return new Card(dbCard.crd_id, dbCard.ugc_id, dbCard.crd_hp,
        dbCard.crd_damage, dbCard.crd_type_id, dbCard.ugc_board_pos,
        new CardType(dbCard.ct_id, dbCard.ct_name));
}

class CardType {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Card {
    constructor(cardId, deckId, hp, damage, type, pos, crdtype,) {
        this.cardId = cardId;
        this.deckId = deckId;
        this.hp = hp;
        this.damage = damage;
        this.type = type;
        this.pos = pos;
        this.crdtype = crdtype;
    }

    static async genCard(playerId) {
        try {
            let [cards] = await pool.query(`select * from card inner join card_type on crd_type_id = ct_id`);
            let rndCard = fromDBCardToCard(cards[Math.floor(Math.random() * cards.length)]);
            // insert the card
            let [result] = await pool.query(`Insert into user_game_card (ugc_user_game_id,ugc_crd_id,ugc_board_pos,ugc_crd_damage,ugc_crd_hp)
                  values (?,?,?,?,?)`, [playerId, rndCard.cardId, 0, rndCard.damage, rndCard.hp]);
            return { status: 200, result: rndCard };
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

class MatchDecks {
    constructor(mycards, oppcards) {
        this.mycards = mycards;
        this.oppcards = oppcards;
    }

    // No verifications are made since this is consider to be an auxiliary method
    // We consider it will only be called at the right time
    static async genPlayerDeck(playerId) {
        try {
            let cards = [];
            for (let i = 0; i < Settings.nCards; i++) {
                let result = await Card.genCard(playerId);
                cards.push(result.result);
            }
            return { status: 200, result: cards };
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
            return { status: 200, result: { msg: "All cards removed" } };
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
            where (ugc_user_game_id = ? or ugc_user_game_id = ?) and ugc_board_pos = 0`,
                [game.player.id, game.opponents[0].id]);
            let playerCards = [];
            let oppCards = [];
            for (let dbcard of dbcards) {
                let card = fromDBCardToCard(dbcard);
                if (dbcard.ugc_user_game_id == game.player.id) {
                    playerCards.push(card);
                } else {
                    oppCards.push(card);
                }
            }
            return { status: 200, result: new MatchDecks(playerCards, oppCards) };
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
    static async playDeckCard(game, deckId, position) {
        try {
            let [dbDeckCards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? and ugc_id = ? and ugc_board_pos = 0`,
                [game.player.id, deckId]);
            if (dbDeckCards.length == 0) {
                return { status: 404, result: { msg: "Card not found for this player or not active" } };
            }
            await pool.query("update user_game_card set ugc_board_pos = ? where ugc_id = ?", [position, deckId]);

            return { status: 200, result: { msg: "Card played!" } };
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
    static async getBoardCards(game) {
        try {
            let [dbcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ?  and ugc_board_pos >= 1`,
                [game.player.id]);
            let playerCards = [];
            let oppCards = [];
            for (let dbcard of dbcards) {
                let card = fromDBCardToCard(dbcard);
                if (dbcard.ugc_user_game_id == game.player.id) {
                    playerCards.push(card);
                } else {
                    oppCards.push(card);
                }
            }
            return { status: 200, result: new MatchDecks(playerCards, oppCards) };
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
    static async battlefase(game) {
        try {
            let [playerboardcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? and ugc_board_pos >= 1`,
                [game.player.id]);

            let [oppboardcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? and ugc_board_pos >= 1`,
                [game.opponents[0].id]);


            for (let playerboardcard of playerboardcards) {
                let enemyCard = false

                console.log("1st")
                for (let oppboardcard of oppboardcards) {
                    console.log("2nd")
                    if (playerboardcard.ugc_user_board_pos == oppboardcard.ugc_user_board_pos) {
                        enemyCard = oppboardcard;
                        break;
                    } 
                }
                if (enemyCard) {
                    await pool.query("update user_game_card set ugc_crd_hp = ? where ugc_id = ?", [enemyCard.ugc_crd_hp - playerboardcard.ugc_crd_damage, enemyCard.ugc_id]);
                } else {
                    game.opponents[0].hp -= playerboardcard.ugc_crd_damage;
                }
            }
            await pool.query("update user_game set ug_hp =? where ug_user_id = ?", [game.opponents[0].hp, game.opponents[0].id]);
       
            // do same with swithed fors

            for (let oppboardcard of oppboardcards) {
                let enemyCard2 = false

                console.log("1st")
                for (let playerboardcard of playerboardcards) {
                    console.log("2nd")
                    if (oppboardcard.ugc_user_board_pos == playerboardcard.ugc_user_board_pos) {
                        enemyCard2 = playerboardcard;
                        break;
                    } 
                }
                if (enemyCard2) {
                    await pool.query("update user_game_card set ugc_crd_hp = ? where ugc_id = ?", [enemyCard2.ugc_crd_hp - oppboardcard.ugc_crd_damage, enemyCard2.ugc_id]);
                } else {
                    game.player.hp -= oppboardcard.ugc_crd_damage;
                }
            }
            await pool.query("update user_game set ug_hp = ? where ug_user_id = ?", [game.player.hp, game.player.id]);



            // if(!playerboardcards.length){
            //     for(let oppcard of oppboardcards){
            //         game.player.hp -= oppcard.crd_damage
            //     }
            // }else if (!oppboardcards.length){
            //     for(let playerCard of playerboardcards){
            //         game.opponents[0].hp -= playerCard.crd_damage
            //     }
            // }else{
                
            // }

            // let newHp = 0
            // let cardId = 0
            // let newHpopp = 0
            // let cardIdopp = 0

            // console.log(playerboardcards)
            // console.log(oppboardcards)
            // if(playerboardcards.length){
            //     for (let playerboardcard of playerboardcards) {
            //         let hasenemy = false
            //         console.log("1st")
            //         for (let oppboardcard of oppboardcards) {
            //             console.log("2nd")
            //             if (playerboardcard.ugc_user_board_pos == oppboardcard.ugc_user_board_pos) {
            //                 hasenemy = true
            //             } else {
            //                 hasenemy = false
            //             }
            //             console.log(hasenemy)
    
            //             if (hasenemy == true) {
    
            //                 cardId = playerboardcard.ugc_id
            //                 cardIdopp = oppboardcard.ugc_id
            //                 newHp = playerboardcard.ugc_crd_hp - oppboardcard.ugc_crd_damage
            //                 newHpopp = oppboardcard.ugc_crd_hp - playerboardcard.ugc_crd_damage
            //                 hasenemy = false
    
            //                 console.log(cardId)
            //                 console.log(newHp)
            //                 console.log(cardIdopp)
            //                 console.log(newHpopp)
            //             }
    
            //             if (hasenemy == false) {
            //                 game.player.hp -= oppcard.crd_damage
            //             }
            //             console.log(game.opponents[0].hp)
            //         }
            //     }
            // }else{
            //     for(let oppcard of oppboardcards){
            //         game.player.hp -= oppcard.crd_damage
            //     }
            // }
            

            // await pool.query("update user_game_card set ugc_crd_hp = ? where ugc_id = ?", [newHp, cardId]);
            // await pool.query("update user_game_card set ugc_crd_hp = ? where ugc_id = ?", [newHpopp, cardIdopp]);

            // await pool.query("update user_game set ug_hp = ? where ug_user_id = ?", [game.player.hp, game.player.id]);


            return { status: 200 }
        } catch (error) {
            console.log(error);
            return { status: 500, result: error };
        }
    }
}
module.exports = MatchDecks;
