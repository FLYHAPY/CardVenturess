// All the variables for the game UI
// we only have one game info so everything is static
class GameInfo {
  // settings variables
  static width = 1800;
  static height = 1500;

  static loading = true;

  // data
  static game;
  static images = {};
  static sounds = {};
  static fonts = {};
  static matchDecks;
  static matchkilled;

  // rendererers
  static scoreBoard;
  static scoreWindow;
  static playerDeck;
  static oppDeck;
  static playerBoard;
  static oppBoard;
  static killed;
  static oppkilled;

  // buttons
  static endturnButton;

  // Write your UI settings for each game state here
  // Call the method every time there is a game state change
  static prepareUI() {
    if (GameInfo.game.player.state == "Playing") {
      GameInfo.endturnButton.show();
      GameInfo.playerDeck.draggable = true;
    } else if (GameInfo.game.player.state == "Waiting") {
      GameInfo.endturnButton.hide();
      GameInfo.playerDeck.draggable = false;
    } else if (GameInfo.game.player.state == "End") {
      GameInfo.endturnButton.hide();
      GameInfo.scoreWindow.open();
      GameInfo.playerDeck.draggable = false;
    }
  }
}
