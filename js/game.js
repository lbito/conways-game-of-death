function Game(w, h){
    var width = w;
    var height = h;

    var teamSize = 16;

    var cells = Cells(width,height, teamSize);

    cells.genEnemyCells();
    cells.genFriendlyCells();


    return {
        getCells: function (){
            return cells.getCells();
        },
        tick: function(){
            cells.nextGeneration();
        }
    }
}