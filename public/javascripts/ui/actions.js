async function getGameInfo() {
    let result = await requestPlayerGame();
    if (!result.successful) {
        alert("Something is wrong with the game please login again!");
        window.location.pathname = "index.html";
    } else {
        GameInfo.game = result.game;
        if (GameInfo.scoreBoard) GameInfo.scoreBoard.update(GameInfo.game);
        else GameInfo.scoreBoard = new ScoreBoard(GameInfo.game);
        // if game ended we get the scores and prepare the ScoreWindow
        if (GameInfo.game.state == "Finished") {
            let result = await requestScore();
            GameInfo.scoreWindow = new ScoreWindow(50, 50, GameInfo.width - 100, GameInfo.height - 100, result.score, closeScore);
        }
    }
}

async function getDecksInfo() {
    let result = await requestDecks();
    if (!result.successful) {
        alert("Something is wrong with the game please login again!");
        window.location.pathname = "index.html";
    } else {
        GameInfo.matchDecks = result.decks;
        if (GameInfo.playerDeck) {
            GameInfo.playerDeck.update(GameInfo.matchDecks);
        } else {
            GameInfo.playerDeck = new Deck(GameInfo.matchDecks.mycards, 30, 1100, playCard, GameInfo.images.card, GameInfo.images.charmander, GameInfo.images.building, GameInfo.images.spell);
        }
    }
}

async function getYourBoard() {
    let result = await requestYourBoard();
    if (!result.successful) {
        alert("Something is wrong with the game please login again!");
        window.location.pathname = "index.html";
    } else {
        GameInfo.matchDecks = result.decks;
        if (GameInfo.playerBoard) {
            GameInfo.playerBoard.update(GameInfo.matchDecks.mycards);
        } else {
            GameInfo.playerBoard = new Board(GameInfo.matchDecks.mycards, GameInfo.images.card, GameInfo.images.charmander, GameInfo.images.building, GameInfo.images.spell);
        }
    }
}

async function getOppBoard() {
    let result = await requestOppBoard();
    if (!result.successful) {
        alert("Something is wrong with the game please login again!");
        window.location.pathname = "index.html";
    } else {
        GameInfo.matchDecks = result.decks;
        console.log(GameInfo.matchDecks.oppcards)
        if (GameInfo.oppBoard) {
                GameInfo.oppBoard.update(GameInfo.matchDecks.oppcards);
        } else {
            GameInfo.oppBoard = new OppBoard(GameInfo.matchDecks.oppcards, GameInfo.images.card, GameInfo.images.charmander, GameInfo.images.building, GameInfo.images.spell);
        }

    }
}

async function playCard(card) {
    let position = parseInt(prompt(`What position (1,2,3)?`));

    if (position > 4 || position < 1) {
        alert("That position doesn't exist");
        result = !result.successful
    }

    if (result.successful) {
        let result = await requestPlayCard(card.deckId, position, card.type);
    }
}

async function endturnAction() {
    let result = await requestEndTurn();
    if (result.successful) {
        await getGameInfo();
        GameInfo.prepareUI();
    } else alert("Something went wrong when ending the turn.")
}

async function closeScore() {
    let result = await requestCloseScore();
    if (result.successful) {
        await checkGame(true); // This should send the player back to matches
    } else alert("Something went wrong when ending the turn.")
}