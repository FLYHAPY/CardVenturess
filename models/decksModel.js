const pool = require("../config/database");
const Settings = require("./gameSettings");

function fromDBCardToCard(dbCard) {
    return new Card(dbCard.crd_id, dbCard.ugc_id, dbCard.crd_hp, dbCard.ugc_crd_hp, dbCard.crd_damage,
        dbCard.ugc_crd_damage, dbCard.ct_id, dbCard.ugc_board_pos,
        new CardType(dbCard.ct_id, dbCard.ct_name));
}

class CardType {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Card {
    constructor(cardId, deckId, hp, current_hp, damage, current_damage, type, pos, crdtype,) {
        this.cardId = cardId;
        this.deckId = deckId;
        this.hp = hp;
        this.current_hp = current_hp;
        this.damage = damage;
        this.current_damage = current_damage;
        this.type = type;
        this.pos = pos;
        this.crdtype = crdtype;
    }

    static async genCard(playerId) {
        try {
            let [cards] = await pool.query(`select * from card inner join card_type on crd_type_id = ct_id`);
            let playercards = await pool.query("select * from user_game_card where ugc_user_game_id = ? and ugc_board_pos >= 0", [playerId]);
            let rndCard = 0;
            if (playercards[0].length >= 20)
                return { status: 200 };
            do {
                rndCard = fromDBCardToCard(cards[Math.floor(Math.random() * cards.length)]);

                playercards = await pool.query(`select * from user_game_card where ugc_crd_id = ? and ugc_user_game_id = ? and ugc_board_pos >= 0`, [rndCard.cardId, playerId]);
            } while (playercards[0].length > 3);


            let [result] = await pool.query(`Insert into user_game_card (ugc_user_game_id,ugc_crd_id,ugc_board_pos,ugc_crd_damage,ugc_crd_hp,ugc_active,ugc_crd_type)
            values (?,?,?,?,?,1,?)`, [playerId, rndCard.cardId, 0, rndCard.damage, rndCard.hp, rndCard.type]);

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
            let [rescount] = await pool.query(`Select COUNT(*) as count from user_game_card 
            where ugc_user_game_id = ?  and ugc_board_pos = 0`,
                [playerId]);
            let myCardCount = rescount[0].count;
            let nCards = Math.min(Settings.nCards, Settings.maxCards - myCardCount);

            for (let i = 0; i < nCards; i++) {
                let cardtopush = await Card.genCard(playerId);
                cards.push(cardtopush.result);
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
            where ugc_user_game_id = ?  and ugc_board_pos = 0`,
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
    static async playDeckCard(game, deckId, position, type) {
        try {
            let [dbexist] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? and ugc_id = ? and ugc_board_pos = 0 and ugc_crd_type = ?`,
                [game.player.id, deckId, type]);

            let [dbtobeplayed] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ?  and ugc_board_pos = ? and ugc_crd_type = ?`,
                [game.player.id, position, type]);

            let [dbmonsterboard] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ?  and ugc_board_pos = ? and ugc_crd_hp > 0 and ugc_crd_type = 1`,
                [game.player.id, position]);

            if (dbexist.length == 0) {
                return { status: 400, result: { msg: "There is no card of that type!" } };
            }

            if (dbtobeplayed.length != 0) {
                return { status: 400, result: { msg: "There is already a cards of that type on that position!" } };
            }

            if (type == 1) {
                await pool.query("update user_game_card set ugc_board_pos = ? where ugc_id = ? and ugc_crd_type = ?", [position, deckId, type]);
                return { status: 200, result: { msg: "Card played!" } };
            } else if (type == 2) {
                if (dbmonsterboard.length == 0) {
                    return { status: 400, result: { msg: "There is no monster!" } };
                }

                let card = fromDBCardToCard(dbexist[0]);

                await pool.query("update user_game_card set ugc_board_pos = ? where ugc_id = ? and ugc_crd_type = ?", [position, deckId, type]);
                await pool.query("update user_game_card set ugc_crd_hp = ugc_crd_hp + ? where ugc_board_pos = ? and ugc_crd_type = 1 and ugc_user_game_id = ?", [card.hp, position, game.player.id]);
                return { status: 200, result: { msg: "Card played!" } };
            } else if (type == 3) {
                if (dbmonsterboard.length == 0) {
                    return { status: 400, result: { msg: "There is no monster!" } };
                }

                let card = fromDBCardToCard(dbexist[0]);

                await pool.query("update user_game_card set ugc_board_pos = ? where ugc_id = ? and ugc_crd_type = ?", [position, deckId, type]);
                await pool.query("update user_game_card set ugc_crd_damage = ugc_crd_damage + ? where ugc_board_pos = ? and ugc_crd_type = 1 and ugc_user_game_id = ?", [card.damage, position, game.player.id]);
                return { status: 200, result: { msg: "Card played!" } };
            }


        } catch (error) {
            console.log(error);
            return { status: 500, result: error };
        }
    }
    static async getBoardCards(game) {
        try {
            let [dbcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ?  and ugc_board_pos >= 1 and ((ugc_crd_hp > 0 and ugc_crd_type = 1) or (ugc_crd_hp > 0 and ugc_crd_type = 2) or (ugc_crd_hp >= 0 and ugc_crd_type = 3)) and ugc_board_pos <= 4 `,
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
            where ugc_user_game_id = ? and ugc_board_pos >= 1 and ugc_crd_type = 1`,
                [game.player.id]);

            let [oppboardcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? and ugc_board_pos >= 1 and ugc_crd_type = 1 `,
                [game.opponents[0].id]);


            for (let playerboardcard of playerboardcards) {
                let enemyCard = false



                for (let oppboardcard of oppboardcards) {
                    if (playerboardcard.ugc_board_pos == oppboardcard.ugc_board_pos) {
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
            await pool.query("update user_game set ug_hp =? where ug_id = ?", [game.opponents[0].hp, game.opponents[0].id]);

            // do same with swithed fors

            for (let oppboardcard of oppboardcards) {
                let enemyCard2 = false

                for (let playerboardcard of playerboardcards) {
                    if (oppboardcard.ugc_board_pos == playerboardcard.ugc_board_pos) {
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
            await pool.query("update user_game set ug_hp = ? where ug_id = ?", [game.player.hp, game.player.id]);

            return { status: 200 }
        } catch (error) {
            console.log(error);
            return { status: 500, result: error };
        }
    }
    static async showCards(game) {
        try {
            let [unactiveCards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where (ugc_user_game_id = ? or ugc_user_game_id = ?) and ugc_board_pos >= 1`,
                [game.player.id, game.opponents[0].id]);

            for (let unactiveCard of unactiveCards) {
                await pool.query("update user_game_card set ugc_active = 2 where ugc_id = ? and (ugc_user_game_id = ? or ugc_user_game_id = ?) ", [unactiveCard.ugc_id, game.player.id, game.opponents[0].id]);
            }

            return { status: 200 }
        } catch (error) {
            console.log(error);
            return { status: 500, result: error };
        }
    }
    static async showOppBoard(game) {
        try {
            let [dbcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? and ugc_active = 2 and ugc_board_pos <= 4 and ugc_board_pos >= 0`,
                [game.opponents[0].id]);

            if (dbcards.length == 0) {
                return { status: 200, result: {} }
            } else {
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
            }
        } catch (error) {
            console.log(error);
            return { status: 500, result: error };
        }
    }

    static async killCards(game) {
        try {
            let [dbcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? and ugc_active = 2 and ugc_crd_hp <= 0 and ugc_crd_type = 1 and ugc_board_pos >= 1 and ugc_board_pos <= 4`,
                [game.player.id]);

            let [dboppcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? and ugc_active = 2 and ugc_crd_hp <= 0 and ugc_crd_type = 1 and ugc_board_pos >= 1 and ugc_board_pos <= 4`,
                [game.opponents[0].id]);

            for (let dbcard of dbcards) {
                let cardtoremove = fromDBCardToCard(dbcard);

                let [dbcardstoremove] = await pool.query(`Select * from card
                inner join card_type on crd_type_id = ct_id 
                inner join user_game_card on ugc_crd_id = crd_id
                where ugc_user_game_id = ? and ugc_active = 2  and ugc_board_pos = ?`,
                    [game.player.id, cardtoremove.pos]);

                for (let dbcardtoremove of dbcardstoremove) {
                    await pool.query("update user_game_card set ugc_board_pos = 5 where ugc_board_pos = ? and ugc_user_game_id = ?", [dbcardtoremove.ugc_board_pos, game.player.id]);
                }
            }

            for (let dboppcard of dboppcards) {
                let cardtoremove = fromDBCardToCard(dboppcard);

                let [dboppcardstoremove] = await pool.query(`Select * from card
                inner join card_type on crd_type_id = ct_id 
                inner join user_game_card on ugc_crd_id = crd_id
                where ugc_user_game_id = ? and ugc_active = 2  and ugc_board_pos = ?`,
                    [game.opponents[0].id, cardtoremove.pos]);

                for (let dboppcardtoremove of dboppcardstoremove) {
                    await pool.query("update user_game_card set ugc_board_pos = 5 where ugc_board_pos = ? and ugc_user_game_id = ?", [dboppcardtoremove.ugc_board_pos, game.opponents[0].id]);
                }
            }
            return { status: 200 }

        } catch (error) {
            console.log(error);
            return { status: 500, result: error };
        }
    }

    static async reduceHealth(game) {
        try {

            let [dbcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? and ugc_active = 2 and ugc_crd_hp <= 0 and ugc_board_pos <= 4 and ugc_board_pos >= 1 and ugc_crd_type = 1`,
                [game.player.id]);

            let [dboppcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where ugc_user_game_id = ? and ugc_active = 2 and ugc_crd_hp <= 0 and ugc_board_pos <= 4 and ugc_board_pos >= 1 and ugc_crd_type = 1`,
                [game.opponents[0].id]);

            for (let dbcard of dbcards) {
                game.player.hp += dbcard.ugc_crd_hp
            }
            for (let dboppcard of dboppcards) {
                game.opponents[0].hp += dboppcard.ugc_crd_hp
            }

            await pool.query("update user_game set ug_hp = ? where ug_id = ?", [game.player.hp, game.player.id])
            await pool.query("update user_game set ug_hp = ? where ug_id = ?", [game.opponents[0].hp, game.opponents[0].id])

            return { status: 200 }

        } catch (error) {
            console.log(error);
            return { status: 500, result: error };
        }
    }
    static async changeposto6(game) {
        try {
            let [dbcards] = await pool.query(`Select * from card
        inner join card_type on crd_type_id = ct_id 
        inner join user_game_card on ugc_crd_id = crd_id
        where (ugc_user_game_id = ? or ugc_user_game_id = ?) and ugc_board_pos = 5`,
                [game.player.id, game.opponents[0].id]);

            for (let dbcard of dbcards) {
                await pool.query("update user_game_card set ugc_board_pos = 6 where ugc_id = ?", [dbcard.ugc_id]);
            }
            return { status: 200 }

        } catch (error) {
            console.log(error);
            return { status: 500, result: error };
        }
    }

    static async showDeadCards(game) {
        try {
            let [dbcards] = await pool.query(`Select * from card
            inner join card_type on crd_type_id = ct_id 
            inner join user_game_card on ugc_crd_id = crd_id
            where (ugc_user_game_id = ? or ugc_user_game_id = ?) and ugc_board_pos = 5`,
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
        } catch (error) {
            console.log(error);
            return { status: 500, result: error };
        }
    }
    static async passCards(playerId) {
        try {
            let playercards = await pool.query("select * from user_game_card where ugc_user_game_id = ?", [playerId]);
            let [deadCards] = await pool.query("select * from user_game_card where ugc_user_game_id = ? and ugc_board_pos = 6", [playerId]);

            if (playercards[0].length == 20) {
                for (let deadCard of deadCards) {
                    await pool.query("update user_game_card set ugc_board_pos = -1 where ugc_user_game_id = ? and ugc_crd_id = ? and ugc_board_pos = 6", [playerId, deadCard.ugc_crd_id]);
                }
            }

            return { status: 200 }

        } catch (error) {
            console.log(error);
            return { status: 500, result: error };
        }
    }

}


function getCards(playerId) {
    let [dbplayercardsonhand] = pool.query(`Select * from card
        inner join card_type on crd_type_id = ct_id 
        inner join user_game_card on ugc_crd_id = crd_id
        where ugc_user_game_id = ?  and ugc_board_pos = 0`,
        [playerId]);

    if (dbplayercardsonhand.length == 8) {
        return false
    } else {
        return true
    }
}

module.exports = MatchDecks;