var game, gui;
var width = 80;
var height = 48;

window.onload = function(){
    game = Game(width,height);
    gui = Gui(width,height);
    gui.draw(game.getCells());
};

var p1Config = [];
var p2Config = [];


window.setInterval(function(){
    game.tick();
    gui.draw(game.getCells());
},40);


function tickGame(){
    game.tick();
    gui.draw(game.getCells());
}
