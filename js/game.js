function Game(w, h){
    var width = w;
    var height = h;
    var teamSize = 16;

    var density = 0.8;

    var options = {

    }

    var cells = Cells(width,height, teamSize);
    cells.genEnemyCells(density);
    cells.genFriendlyCells(density);


    return {
        getCells: function (){
            return cells.getCells();
        },
        tick: function(){
            cells.nextGeneration();
        },
        reset: function(){
            game.reset();
        },

        generateFriendlies: function(){
            game.reset();
            cells.genFriendlyCells(density);
        },

        reset: function(){

        },

        setDensity: function(d){
            cells.setGeneratorDensity(d)
        }
    }
}