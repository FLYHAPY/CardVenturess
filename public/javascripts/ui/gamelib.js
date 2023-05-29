async function refresh() {
  if (GameInfo.game.player.state == "Waiting") {
    // Every time we are waiting
    await getGameInfo();
    await getDecksInfo();
    await getYourBoard();
    await getOppBoard();
    await getKilledInfo();
    if (GameInfo.game.player.state != "Waiting") {
      // The moment we pass from waiting to play
      GameInfo.prepareUI();
      GameInfo.sounds.yourturn.play()
    }
  }
}

let board;
function preload() {

  // monster cards
  GameInfo.images.corn_archer = loadImage("assets/corn_archer.png");
  GameInfo.images.tomato_guy = loadImage("assets/tomato_guy.png");
  GameInfo.images.macho_pig = loadImage("assets/macho_pig.png")
  GameInfo.images.farmer = loadImage("assets/farmer.png")
  GameInfo.images.corn_witch = loadImage("assets/corn_witch.png")

  //building cards  
  GameInfo.images.castle = loadImage("assets/castle.png");
  GameInfo.images.great_wall = loadImage("assets/great_wall.png")
  GameInfo.images.barn = loadImage("assets/barn.png")
  GameInfo.images.farm_house = loadImage("assets/farm_house.png")
  GameInfo.images.corn_field = loadImage("assets/corn_field.png")

  // spell cards
  GameInfo.images.fireball = loadImage("assets/fireball.png");
  GameInfo.images.iceball = loadImage("assets/iceball.png");
  GameInfo.images.holy_beam = loadImage("assets/holy_beam.png");
  GameInfo.images.darkness_beam = loadImage("assets/darkness_beam.png");
  GameInfo.images.grass_touch = loadImage("assets/grass_touch.png");

  //ui
  board = loadImage("assets/board.png");
  GameInfo.images.health = loadImage("assets/HPBarSprite.png")
  GameInfo.images.opphealth = loadImage("assets/HPBarSpriteOpp.png")
  GameInfo.images.background = loadImage("assets/Background.png")
  GameInfo.images.win = loadImage("assets/you_won.png")
  GameInfo.images.lose = loadImage("assets/you_lost.png")

  //sounds
  GameInfo.sounds.music = loadSound("assets/souns/music.wav")
  GameInfo.sounds.yourturn = loadSound("assets/souns/your_turn.wav")
  GameInfo.sounds.soundeffect = loadSound("assets/souns/flipcard.wav");
  GameInfo.sounds.oppturn = loadSound("assets/souns/opp_turn.mp3")
  GameInfo.sounds.youwon = loadSound("assets/souns/you_won.mp3")
  GameInfo.sounds.youlose = loadSound("assets/souns/you_lost.mp3")

  // fonts
  GameInfo.fonts.font = loadFont("assets/fonts/KOMTXT__.ttf");

}

async function setup() {
  let canvas = createCanvas(GameInfo.width, GameInfo.height);
  canvas.parent("game");
  GameInfo.sounds.music.loop()

  // preload  images
  await getGameInfo();
  await getDecksInfo();
  await getYourBoard();
  await getOppBoard();
  await getKilledInfo();
  setInterval(refresh, 1000);

  //buttons (create a separated function if they are many)
  GameInfo.endturnButton = createButton("End Turn");
  GameInfo.endturnButton.parent("game");
  GameInfo.endturnButton.position(GameInfo.width - 150, GameInfo.height - 50);
  GameInfo.endturnButton.mousePressed(endturnAction);
  GameInfo.endturnButton.addClass("game");

  GameInfo.prepareUI();


  GameInfo.loading = false;

  if (GameInfo.game.player.state == "Waiting" && GameInfo.game.player.state != "End") {
    GameInfo.sounds.oppturn.play()
  } else if (GameInfo.game.player.state == "Playing" && GameInfo.game.player.state != "End") {
    GameInfo.sounds.yourturn.play()
  }
}

function draw() {
  textFont(GameInfo.fonts.font)
  background(220);
  if (GameInfo.loading) {
    textAlign(CENTER, CENTER);
    textSize(40);
    text("Loading...", GameInfo.width / 2, GameInfo.height / 2);
  } else if (GameInfo.game.state == "Finished" && GameInfo.scoreWindow) {
    GameInfo.scoreWindow.draw();
  } else {
    image(GameInfo.images.background, 0, 0);
    image(board, 550, 200);
    GameInfo.scoreBoard.draw();
    GameInfo.playerBoard.draw();
    GameInfo.killed.draw();
    GameInfo.oppkilled.draw();
    GameInfo.playerDeck.updateDrag();
    GameInfo.playerDeck.mouseontop();
    GameInfo.playerDeck.draw();
    GameInfo.oppBoard.draw();
  }
}

async function mouseClicked() {
  if (GameInfo.playerDeck) {
    GameInfo.playerDeck.click();
  }
}

async function mousePressed() {
  if (GameInfo.playerDeck) {
    GameInfo.playerDeck.press();
  }
}

async function mouseReleased() {
  if (GameInfo.playerDeck) {
    GameInfo.playerDeck.release();
  }
}