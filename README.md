# Game Template

Template for creating a two player turn based web games with Node.js/Express.js and P5.js. 

Specifications:
* Web based game: board and/or cards game
* Turn based
* Only one game per player allowed
* Node.js/Express.js Server for backend
* P5.j and fetch for frontend (plus HTML/CSS/Javascript)
* MySql database
* Node Libraries ([check package.json](package.json))

This template includes:
* The scripts to create a database with users, matches and scores ([diagram](db_scripts/diagram.png))
* The backend that allows user and match management. It has authentication using cookie sessions. Existing endpoints ([API REST documentation](https://docs.google.com/document/d/1jXmBSiNZfqCABMVhvkRcD-qASICUTTjeGytj_wpCCXg/edit?usp=sharing))
    - User endpoints: Register, Login, Logout, Get Profile
    - Match endpoints:
        * Get my current game 
        * List all games waiting for players
        * Join an existing game
        * Create a new game
        * Cancel the game I am playing
    - Game endpoints:
        * End the turn
    - Score 
        * Get the scores of all played games
        * Get the score of the current game (when the game has ended)
        * Close the score of the current game (only than the player can play a new game)
        

* A simplified frontend with pages for login in, score board, register, choose or create a match, wait for other players to join the match, the game page (this page has a board that shows the state of both players playing the game and a button to end the turn)

# Tipical cenarios for this template:

---
 ## Cenario 1: Unregistered user wants to create a game
1. The user enters the initial page (login page) that shows the username and password text inputs, a button to login, a link to see the scores and a link to the register page.
2. The user presses the link to register. The register page also shows the username and password inputs, a button to register and a link to the login page. 
3. The user fills the name and password and presses the button to register
4. The user than presses the link to go back to login page, fills the username and password and presses the login button
5. Since the user is not in a game he will go to the match page
6. The match page shows at the top the name of the user and a button to logoff, bellow the available matches (matches waiting for players) and at the bottom a button to create a new match
7. The user presses the button to create a new match and will go to the waiting page to wait for another player to join.
8. The waiting page has the name of the player, a message saying it is waiting, and a button to cancel the game.
9. Another user joins the game and the game page is shown. A Score Board is shown at the top left with the game turn, the name of the players and the current state of the players (the API determines who will start randomly)

## Alternative cenario: The user cancels the game
After step 8:

9. The user presses the button to cancel the game and returns to the matches page.
## Alternative cenario: The user logs off 
After step 6:

7. The user presses the logout button and returns to the login
## Alternative cenario: The user is already registered
Skips steps 2 and 3, step 4 becomes:

4. The user fills the username and password and presses the login button

---

---
 ## Cenario 2: Authenticated user wants to join an existing game
 **Pre-conditions**
 * The user is registered and authenticated
 * The user is in the matches page

1. In the matches page the user presses one of the available matches.
2. The game page is shown with the Score Board with both players names and state, and the game turn.

---



---
 ## Cenario 3: Two authenticated users playing
 **Pre-conditions**
 * Both users are already registered and authenticated
 * Both users are in the game page
 * Both users are in the same game that just started
 * First user, which will call player one, got the first turn while the second user, player two, is waiting for his turn

1. On the start of the game Player One sees on the Score Board that it is his turn to play and the opponent is waiting. Since it is his turn a button to end the turn shows on the bottom right.
2. On the start of the game Player Two sees on the Score Board that the opponent got the first turn and he is waiting
3. Player One presses the button to end the turn. The button disapears and the score board now says that it is the opponent's turn and that he is waiting.
4. A moment after Player One finishes the turn Player Two sees that it is now his turn and that the opponent is waiting. The button to end the turn is also made visible in the bottom right.

## Alternative cenario: The players continue until the game ends
After step 4:
5. Players continue to alternate until the game reaches the end (currently this is when both players finish turn 10)
6. Both players will see a window with the final scores (currently both are tied with 1 point each).
7. Player One closes the score window to finish viewing the game score. A popup is shown saying the player is not in a game and after confirmation the player is sent back to the matches page.
9. Player Two is still looking at the score window but finally chooses to close the score window and gets the same popup and is sent back to the matches page also.

---

---
 ## Cenario 4: See the scores of previous games
 
 1. The user is at the login page (no need to authenticate or register) and presses the link to see the scores
 2. A new page is shown with the score information of every finished game (even if the players themselfs are still looking at the score of that game). For each game it shows the names of both players with the final status (ex: won, lost, tied) and the number of points received.
