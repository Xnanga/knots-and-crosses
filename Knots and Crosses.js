
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
    }

};

// Object to handle the game state and base variables.
let model = {

    // Limit the boardsize to 9 cells.
    boardSize: 9,

    // An array of all cell positions on the board.
    boardPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],

    // Function to generate a random number to determine who gets the first turn.
    firstTurn: function() {

    // Generate a random number between one and two.
    (Math.floor(Math.random() * 2))

    },

    // Stores the current turn (is empty until the firstTurn function runs at startup.
    currentTurn: undefined

};

// To be run once page has finished loading.
function init() {

    // Runs the firstTurn function to determine who goes first.
    model.firstTurn();

    // Sets the currentTurn property to the result of the random number generation.
    model.currentTurn = model.firstTurn;

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

        console.log(clickedSquare);

    // If the current turn equals anyting other than 0, it must be Crosses turn.
    } else {

        // Declare clickedSquare as all event info from clicked cell.
        let clickedSquare = eventObj.target;

        // Declare squareId as the id taken from clickedSquare.
        let squareId = clickedSquare.id;

        // Pass the id of the cell to the view object for display to the user.
        view.drawCross(squareId);

        console.log(clickedSquare);
    }
}

// Run init function on page load.
onload = init();
