var game, gui;
var width = 80;
var height = 48;
var teamSize = 16;

var gameTicker;


function getPosition(event) {
    var x = new Number();
    var y = new Number();
    var canvas = document.getElementById("canvas");

    if (event.x != undefined && event.y != undefined)
    {
        x = event.x;
        y = event.y;
    }
    else // Firefox method to get the position
    {
        x = event.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    return {
        x: x,
        y: y
    }
}

window.onload = function(){
    game = Game(width,height);
    gui = Gui(width,height);
    gui.draw(game.getCells());

    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');


    canvas.addEventListener('click', function(e){
        var pos = getPosition(e);
    });
};

var p1Config = [];
var p2Config = [];

function editGame(){
    gui.editMode();
}
function playGame(){
    gameTicker = window.setInterval(function(){
        game.tick();
        gui.draw(game.getCells());
    },55);
}
function resetGame(){
    window.clearInterval(gameTicker);
    game.reset();
    game.setDensity(.2);
    gui.draw(game.getCells());

}




function generateFriendlies(){
    game.generateFriendlies();
    gui.draw(game.getCells());
}

function tickGame(){
    game.tick();
    gui.draw(game.getCells());
}
