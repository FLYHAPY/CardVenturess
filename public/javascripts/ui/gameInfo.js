// All the variables for the game UI
// we only have one game info so everything is static
class GameInfo  {
    // settings variables
    static width = 1200;
    static height = 600;

    static loading = true;

    // data
    static game;
    static images = {};
    static sounds = {};
    static matchDecks;

    // rendererers
    static scoreBoard;
    static scoreWindow;
    static playerDeck;
    static oppDeck;
    static playerBoard;

    // buttons
    static endturnButton;

    // Write your UI settings for each game state here
    // Call the method every time there is a game state change
    static prepareUI() {
        if (GameInfo.game.player.state == "Playing") { 
            GameInfo.endturnButton.show();
        } else if (GameInfo.game.player.state == "Waiting") {
            GameInfo.endturnButton.hide();
        }  else if (GameInfo.game.player.state == "End") {
            GameInfo.endturnButton.hide();
            GameInfo.scoreWindow.open();
        }
    }
}