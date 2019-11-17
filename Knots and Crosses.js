
// Object to handle all visual changes.
let view = {

    // Function to draw a knot on the grid after a click.
    drawKnot: function(squareId) {

        // Take the clicked cell via its Id and change its class to show a knot.
        document.getElementById(squareId).className = "knotPlacement";

        // Afterwards, set it to crosses turn.
        model.currentTurn = 1;

        // Show the current turn to the user.
        this.showCurrentTurn(1);

        // Increment the count of number of squares filled.
        model.spacesFilled++;

    },

    // Function to draw a cross on the grid after a click.
    drawCross: function(squareId) {

        // Take the clicked cell via its Id and change its class to show a cross.
        document.getElementById(squareId).className = "crossPlacement";

        // Afterwards, set it to knots turn.
        model.currentTurn = 0;

        // Show the current turn to the user.
        this.showCurrentTurn(0);

        // Increment the count of number of squares filled.
        model.spacesFilled++;

    },

    // Function to reset the board after a win or draw.
    removeAllSquareClasses: function() {

        // Loop to check all squares one by one.
        for (i = 0; i < model.boardSize; i++) {

            // Declare square as one of the squares on the board.
            let square = document.getElementById([i]);

            // Set the class name of the target square to null.
            square.className = "";

        }

    },

    // Function to show the current turn visually to the user.
    showCurrentTurn: function(turn) {

        // If the turn variable equals 0 then it is knots turn.
        if (turn == 0) {

            // Display a message to indicate it is currently knots turn.
            document.getElementById("currentTurn").innerText = "It is currently Knots' turn.";

        // If the turn variable equals anything else, it must be crosses turn.
        } else {

            // Display a message to indicate it is currently crosses turn.
            document.getElementById("currentTurn").innerText = "It is currently Crosses' turn.";

        }
    },

    // Display a message to announce the winner.
    displayWinner: function(winner) {

        // If the winner is crosses.
        if (winner == "crossesWin") {

            // Display the crosses win message.
            document.getElementById("currentTurn").innerText = "Crosses is victorious!";

            // Increment the number of crosses wins by one.
            model.crossesWins++;

            // Update the scores displayed to the user.
            this.displayScores();

        // If the winner is knots.
        } else if (winner == "knotsWin") {

            // Display the crosses win message.
            document.getElementById("currentTurn").innerText = "Knots is victorious!";

            // Increment the number of knots wins by one.
            model.knotsWins++;

            // Update the scores displayed to the user.
            this.displayScores();

        // If the game is a draw.
        } else if (winner == "draw") {

            // Display the draw message.
            document.getElementById("currentTurn").innerText = "We have a draw!";

            // Update the scores displayed to the user.
            this.displayScores();

        }

    },

    // Update the displayed scores to the user whenever someone wins.
    displayScores: function(result) {

        // Sync the crosses wins held in the model object with the displayed crosses wins to the user.
        let crossesScoreElement = document.getElementById("crossesWins");
        crossesScoreElement.innerHTML = model.crossesWins;

        // Sync the knots wins held in the model object with the displayed knots wins to the user.
        let knotsScoreElement = document.getElementById("knotsWins");
        knotsScoreElement.innerHTML = model.knotsWins;

        // Sync the draws held in the model object with the displayed draws to the user.
        let drawScoreElement = document.getElementById("draws");
        drawScoreElement.innerHTML = model.draws;

    },

    // Function to create an invisible screen to prevent click events when appropriate.
    createIntScreen: function() {

        // Declare intScreen as the disabled int screen element.
        let intScreen = document.getElementById("intScreenDisabled");

        // Change the intscreen id to enable it.
        intScreen.id = "intScreenEnabled";

    },

    // Function to remove an invisible screen to re-enable click events when appropriate.
    removeIntScreen: function() {

        // Declare intScreen as the enabled int screen element.
        let intScreen = document.getElementById("intScreenEnabled");

        // Change the intscreen id to disable it.
        intScreen.id = "intScreenDisabled";

    }

};

// Object to handle the game state and base variables.
let model = {

    // Property to hold the winner, undefined on load.
    gameWinner: null,

    // Property to hold the number of times crosses has won.
    crossesWins: 0,

    // Property to hold the number of times knots has won.
    knotsWins: 0,

    // Property to hold the number of draws.
    draws: 0,

    // Property to hold the number of spaces filled.
    spacesFilled: 0,

    // Property to hold the current turn, undefined until firstTurn function runs.
    currentTurn: null,

    // Limit the boardsize to 9 cells.
    boardSize: 9,

    // An array of all cell positions on the board.
    boardPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

    // An array to keep track of what positions have been filled with what on the board.
    boardCurrentState: ["", "", "", "", "", "", "", "", ""],

    // Function to generate a random number to determine who gets the first turn.
    firstTurn: function() {

        // Generate a random number between one and two.
        let firstTurn = (Math.floor(Math.random() * 2));
        return firstTurn;

    },

    // Checks every turn to see if either knots or crosses have won.
    checkForRow: function() {

            // If any winning comnbination is filled with crosses.
           if ((this.boardCurrentState[0] == "cross" && this.boardCurrentState[1] == "cross" && this.boardCurrentState[2] == "cross") || 
               (this.boardCurrentState[3] == "cross" && this.boardCurrentState[4] == "cross" && this.boardCurrentState[5] == "cross") || 
               (this.boardCurrentState[6] == "cross" && this.boardCurrentState[7] == "cross" && this.boardCurrentState[8] == "cross") || 
               (this.boardCurrentState[0] == "cross" && this.boardCurrentState[3] == "cross" && this.boardCurrentState[6] == "cross") || 
               (this.boardCurrentState[1] == "cross" && this.boardCurrentState[4] == "cross" && this.boardCurrentState[7] == "cross") || 
               (this.boardCurrentState[2] == "cross" && this.boardCurrentState[5] == "cross" && this.boardCurrentState[8] == "cross") || 
               (this.boardCurrentState[0] == "cross" && this.boardCurrentState[4] == "cross" && this.boardCurrentState[8] == "cross") || 
               (this.boardCurrentState[2] == "cross" && this.boardCurrentState[4] == "cross" && this.boardCurrentState[6] == "cross")) {

                // Set the gameWinner to crosses.
                this.gameWinner = "crosses";

                // Tell the view object to display the crosses win message.
                view.displayWinner("crossesWin");

                // Prevent any further event clicks until a new game is set up.
                view.createIntScreen();

                // Run the model function to begin a new game.
                setTimeout(this.newGame, 3000);

            // If any winning comnbination is filled with knots.
    } else if ((this.boardCurrentState[0] == "knot" && this.boardCurrentState[1] == "knot" && this.boardCurrentState[2] == "knot") || 
               (this.boardCurrentState[3] == "knot" && this.boardCurrentState[4] == "knot" && this.boardCurrentState[5] == "knot") || 
               (this.boardCurrentState[6] == "knot" && this.boardCurrentState[7] == "knot" && this.boardCurrentState[8] == "knot") || 
               (this.boardCurrentState[0] == "knot" && this.boardCurrentState[3] == "knot" && this.boardCurrentState[6] == "knot") || 
               (this.boardCurrentState[1] == "knot" && this.boardCurrentState[4] == "knot" && this.boardCurrentState[7] == "knot") || 
               (this.boardCurrentState[2] == "knot" && this.boardCurrentState[5] == "knot" && this.boardCurrentState[8] == "knot") || 
               (this.boardCurrentState[0] == "knot" && this.boardCurrentState[4] == "knot" && this.boardCurrentState[8] == "knot") || 
               (this.boardCurrentState[2] == "knot" && this.boardCurrentState[4] == "knot" && this.boardCurrentState[6] == "knot")) {

                // Set the gameWinner to knots.
                this.gameWinner = "knots";

                // Tell the view object to display the knots win message.
                view.displayWinner("knotsWin");

                // Prevent any further event clicks until a new game is set up.
                view.createIntScreen();

                // Run the model function to begin a new game.
                setTimeout(this.newGame, 3000);

            // If no one wins and all spaces are filled.
         } else if (this.spacesFilled == 9){

            // Increment the number of draws counted by one.
            this.draws++;

            // Display that the game was a draw to the user.
            view.displayWinner("draw");

            // Prevent any further event clicks until a new game is set up.
            view.createIntScreen();

            // Run the model function to begin a new game.
            setTimeout(this.newGame, 3000);

         }
    },

    // Function to check if a square has a class value or not.
    checkSquare: function(squareClass) {

        // if it does have a class value.
        if (squareClass) {

            return false;

        // If it does not have a class value.
        } else {

            return true;

        }

    },

    // Function to reset the applicable stats and visuals after a win or draw.
    newGame: function() {

        // Call the view object to remove all knots and crosses from the board.
        view.removeAllSquareClasses();

        // Reset the model values below to their default values.
        model.currentTurn = null;
        model.gameWinner = null;
        model.spacesFilled = 0;
        model.boardCurrentState = ["", "", "", "", "", "", "", "", ""];

        // Randomly decide who goes first in the new game.
        model.firstTurn();

        // Display the current turn to the user.
        view.showCurrentTurn();

        // Remove the intscreen to re-enable click events.
        view.removeIntScreen();

    }

};

// To be run once page has finished loading.
function init() {

    // Sets the currentTurn property to the result of the random number generation.
    model.currentTurn = model.firstTurn();

    // Show the current turn to the player on load.
    view.showCurrentTurn(model.currentTurn);

    // Declare squareClicked as any cell in the grid.
    let squareClicked = document.getElementsByTagName("td");

    // Loop to find which square was clicked up to maximum board size.
    for (i = 0; i < model.boardSize; i++) {

        // Run through each possible square to find which was clicked, then send to event handler.
        squareClicked[i].onclick = clickHandler;

    }

}

// Detects cell clicks and sends data to game objects.
function clickHandler(eventObj) {

    // If the current turn equals zero, it must be Knots turn.
    if (model.currentTurn === 0) {
    
        // Declare clickedSquare as all event info from clicked cell.
        let clickedSquare = eventObj.target;

        // Declare squareId as the id taken from clickedSquare.
        let squareId = clickedSquare.id;

        // Declare squareClass as the id taken from clickedSquare.
        let SquareClass = clickedSquare.className;

        // If the model object returns true when asked if the square does not yet have a class.
        if (model.checkSquare(SquareClass)) {

        // Pass the id of the cell to the view object for display to the user.
        view.drawKnot(squareId);

        // Pass a signal to the model object to store where a knot was placed.
        model.boardCurrentState[squareId] = "knot";

        // If the square already has a class.
        } else {

            // Display a message informing the user that the square is already taken.
            document.getElementById("currentTurn").innerText = "Square is taken!";

        }

    // If the current turn equals anyting other than 0, it must be Crosses turn.
    } else {

        // Declare clickedSquare as all event info from clicked cell.
        let clickedSquare = eventObj.target;

        // Declare squareId as the id taken from clickedSquare.
        let squareId = clickedSquare.id;

        // Declare squareClass as the id taken from clickedSquare.
        let SquareClass = clickedSquare.className;

        // If the model object returns true when asked if the square does not yet have a class.
        if (model.checkSquare(SquareClass)) {

        // Pass the id of the cell to the view object for display to the user.
        view.drawCross(squareId);

        // Pass a signal to the model object to store where a cross was placed.
        model.boardCurrentState[squareId] = "cross";

        // If the square already has a class.
        } else {

            // Display a message informing the user that the square is already taken.
            document.getElementById("currentTurn").innerText = "Square is taken!";

        }
    }

    // Check to see if someone has won after placing a new cross or knot.
    model.checkForRow();

}

// Run init function on page load.
onload = init();
