var game, gui;
var width = 80;
var height = 48;

window.onload = function(){
    game = Game(width,height);
    gui = Gui(width,height);
    // gui.draw(game.getCells());
    gui.drawGrid();
};

var p1Config = [];
var p2Config = [];

var gameTicker;


function editGame(){
    //
}
function playGame(){
    gameTicker = window.setInterval(function(){
        game.tick();
        gui.draw(game.getCells());
    },55);
}
function resetGame(){
    window.clearInterval(gameTicker);
}


function generateFriendlies(){
    game.generateFriendlies();
}

function tickGame(){
    game.tick();
    gui.draw(game.getCells());
}
