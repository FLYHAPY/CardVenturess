async function refresh() {
    if (GameInfo.game.player.state == "Waiting") { 
        // Every time we are waiting
        await  getGameInfo();
        await getDecksInfo();
        await getYourBoard();
        await getOppBoard();
        await getKilledInfo();        
        if (GameInfo.game.player.state != "Waiting") {
            // The moment we pass from waiting to play
            GameInfo.prepareUI();
        }
    } 
    // Nothing to do when we are playing since we control all that happens 
    // so no update is needed from the server
}

let board
function preload() {
    GameInfo.images.card = loadImage("/assets/pikachu.jpg")
    GameInfo.images.charmander = loadImage("assets/charmander.png")
    GameInfo.images.placeholder = loadImage("assets/Solid_white.png")
    GameInfo.images.building = loadImage("assets/china.jpg")
    GameInfo.images.spell = loadImage("assets/spell.png")
    board = loadImage("assets/board.png")
}


async function setup() {
    let canvas = createCanvas(GameInfo.width, GameInfo.height);
    canvas.parent('game');
    // preload  images
    await  getGameInfo();
    await getDecksInfo();
    await getYourBoard();
    await getOppBoard(); 
    await getKilledInfo();
    setInterval(refresh,1000);

    //buttons (create a separated function if they are many)
    GameInfo.endturnButton = createButton('End Turn');
    GameInfo.endturnButton.parent('game');
    GameInfo.endturnButton.position(GameInfo.width-150,GameInfo.height-50);
    GameInfo.endturnButton.mousePressed(endturnAction);
    GameInfo.endturnButton.addClass('game')

    GameInfo.prepareUI(); 

    GameInfo.loading = false;
}

function draw() {
    background(220);
    if (GameInfo.loading) {
        textAlign(CENTER, CENTER);
        textSize(40);
        fill('black');
        text('Loading...', GameInfo.width/2, GameInfo.height/2);
    } else if (GameInfo.game.state == "Finished" && GameInfo.scoreWindow) {
        GameInfo.scoreWindow.draw();
    } else  {
        image(board, 0, 0);
        GameInfo.scoreBoard.draw();
        GameInfo.playerDeck.draw();
        GameInfo.playerBoard.draw();
        GameInfo.oppBoard.draw();
        GameInfo.killed.draw();
        GameInfo.oppkilled.draw();
        GameInfo.playerDeck.updateDrag()
    }
}

async function mouseClicked() {
    if ( GameInfo.playerDeck) {
        GameInfo.playerDeck.click();
    }
}

async function mousePressed() {
    if ( GameInfo.playerDeck) {
        GameInfo.playerDeck.press();
    }
}

async function mouseReleased() {
    if (GameInfo.playerDeck) {
        GameInfo.playerDeck.release();
    }
}

