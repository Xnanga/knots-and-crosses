
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

    },

    // Function to draw a cross on the grid after a click.
    drawCross: function(squareId) {

        // Take the clicked cell via its Id and change its class to show a cross.
        document.getElementById(squareId).className = "crossPlacement";

        // Afterwards, set it to knots turn.
        model.currentTurn = 0;

        // Show the current turn to the user.
        this.showCurrentTurn(0);

    },

    // Function to show the current turn visually to the user.
    showCurrentTurn: function(turn) {

        // If the turn variable equals 0 then it is knots turn.
        if (turn == 0) {

            // Display a message to indicate it is currently knots turn.
            console.log("It is currently Knots turn.");

        // If the turn variable equals anything else, it must be crosses turn.
        } else {

            // Display a message to indicate it is currently crosses turn.
            console.log("It is currently Crosses turn.");

        }
    },

    // Display a message to announce the winner.
    displayWinner: function(winner) {

        // If the winner is crosses.
        if (winner == "crossesWin") {

            // Display the crosses win message.
            alert("Crosses win!");

            // Increment the number of crosses wins by one.
            model.crossesWins++;

            // Update the scores displayed to the user.
            this.displayScores();

        // If the winner is knots.
        } else if (winner == "knotsWin") {

            // Display the crosses win message.
            alert("Knots win!");

            // Increment the number of knots wins by one.
            model.knotsWins++;

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

    }

};

// Object to handle the game state and base variables.
let model = {

    // Property to hold the winner, undefined on load.
    gameWinner: undefined,

    // Property to hold the number of times crosses has won.
    crossesWins: 0,

    // Property to hold the number of times knots has won.
    knotsWins: 0,

    // Property to hold the number of draws.
    draws: 0,

    // Property to hold the current turn, undefined until firstTurn function runs.
    currentTurn: undefined,

    // Limit the boardsize to 9 cells.
    boardSize: 9,

    // An array of all cell positions on the board.
    boardPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

    // An array to keep track of what positions have been filled with what on the board.
    boardCurrentState: ["", "", "", "", "", "", "", "", "",],

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

                console.log("A Winner Was Checked For!");

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

                console.log("A Winner Was Checked For!");

         } else {

            this.checkForDraw();

         }
    },

    checkForDraw: function() {

        let squareElements = document.getElementsByTagName("td");
        let squareClasses = squareElements.className;

        for (i = 0; i < squareClasses.length; i++) {

            if (squareClasses[i] != "") {

                model.draws++;

            }

        }

    }

};

// To be run once page has finished loading.
function init() {

    // Sets the currentTurn property to the result of the random number generation.
    model.currentTurn = model.firstTurn();

    // Declare squareClicked as any cell in the grid.
    let squareClicked = document.getElementsByTagName("td");

    // Loop to find which square was clicked up to maximum board size.
    for (i = 0; i < model.boardSize; i++) {

        // Run through each possible square to find which was clicked, then send to event handler.
        squareClicked[i].onclick = clickHandler;

        console.log(squareClicked[i]);
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

        // Pass the id of the cell to the view object for display to the user.
        view.drawKnot(squareId);

        // Pass a signal to the model object to store where a knot was placed.
        model.boardCurrentState[squareId] = "knot";

        console.log(clickedSquare);

    // If the current turn equals anyting other than 0, it must be Crosses turn.
    } else {

        // Declare clickedSquare as all event info from clicked cell.
        let clickedSquare = eventObj.target;

        // Declare squareId as the id taken from clickedSquare.
        let squareId = clickedSquare.id;

        // Pass the id of the cell to the view object for display to the user.
        view.drawCross(squareId);

        // Pass a signal to the model object to store where a cross was placed.
        model.boardCurrentState[squareId] = "cross";

        console.log(clickedSquare);
    }

    model.checkForRow();

}


// Run init function on page load.
onload = init();
