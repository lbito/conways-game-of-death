var game, gui;
var width = 80;
var height = 48;
var teamSize = 16;

var enemyStartPos = (teamSize)* width + (width - teamSize*2);
var friendlyStartPos = (teamSize)* width + (teamSize);

var gameTicker;
var editor = Editor();

window.onload = function(){
    game = Game(width,height);
    gui = Gui(width,height);
    gui.draw(game.getCells());
    gui.genRemaining(game.generationsRemaining());
    var canvas = document.getElementById('editTeamCanvas');
    canvas.addEventListener('click', function(e){
        var pos = {
            x:(e.offsetX),
            y:(e.offsetY)
        };
        editor.trigger(pos);
        gui.editConfigScreen(editor.getConfig());
    });
};


function editGame(){
    if (gameTicker) return;
    editor.init(game.getFriendConfig());
    gui.toggleEditMode();
    gui.editConfigScreen(editor.getConfig());

}
function playGame(){
    if (gameTicker) return;
    document.getElementById("gameOverMessage").innerHTML = "";
    game.setGenerations(document.getElementById("genRemainingText").value);
    gameTicker = window.setInterval(function(){
        var gameOver = game.tick();
        if (gameOver){
            var score = game.getScore();
            var scoreString = "";
            if (score === 0){
                scoreString = "Game is a draw!";
            } else if (score > 0){
                scoreString = "You Win! your score was: "+ score;
            } else {
                scoreString = "Oh dear, you lost! your score was: "+ score;
            }
            document.getElementById("gameOverMessage").innerHTML = scoreString;
            game.reset();
            gui.genRemaining(game.generationsRemaining());
            window.clearInterval(gameTicker);
            gameTicker = undefined;
            return;
        }
        gui.genRemaining(game.generationsRemaining());
        gui.draw(game.getCells());
    },30);
}

function resetGame(){
    document.getElementById("gameOverMessage").innerHTML = "";
    window.clearInterval(gameTicker);
    gameTicker = undefined;
    game.reset();
    gui.genRemaining(game.generationsRemaining());
    gui.draw(game.getCells());

}

function generateFriendlies(){
    if (gameTicker) return;
    game.generateFriendlies();
    editor.init(game.getFriendConfig());
    gui.draw(game.getCells());
}

function saveConfig(){
    gui.toggleEditMode();
    //load current configuration into game cells and then draw canvas
    game.loadFriendlyConfig(editor.getConfig());
    gui.draw(game.getCells());
    game.setFriendlyConfig(editor.getConfig());
}

function clearConfig(){
    editor.clearConfig();
    gui.editConfigScreen(editor.getConfig());
}

function changeOpponent(){
    var opponent = document.getElementById("opponentOption");
    var val =  opponent.value;
    game.setEnemyConfig(val);
    resetGame();
}