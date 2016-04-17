function Cells(w, h, tSize){
    var DEAD = 0;
    var ALIVE = 1;
    var ENEMY = -1;

    var cellsAlive = [];

    var width = w;
    var height = h;
    var teamSize = tSize;

    cellsAlive[149] = 1;
    cellsAlive[150] = 1;
    cellsAlive[151] = 1;


    var generator = Generator(width,height,teamSize);

    function inBounds(pos) {
        return ((pos > 0) && (pos < (width*height)));
    }

    function getNeighbours(ind){
        var indx = parseInt(ind);
        var legitNeighbours = [];
        var potentialNeighbours = [
            (indx-1),
            (indx+1),
            (indx-width),
            (indx+width),
            (indx+width+1),
            (indx+width-1),
            (indx-width-1),
            (indx-width+1)
        ];
        _.each(potentialNeighbours, function (p){
            if (inBounds(p)) {
                legitNeighbours.push(p);
            }
        });
        return legitNeighbours;
    }

    return {
        getCells: function(){
            return cellsAlive;
        },
        nextCellState: function(pos, count){
            //Takes a pos and neighbour frequency and resolves next State
            var mutatedState = 0;
            if (cellsAlive[pos]){
                if (cellsAlive[pos] === 1){
                    mutatedState = (count ===  2 || count === 3) ? 1: 0;
                } else if (cellsAlive[pos] === -1){
                    mutatedState = (count ===  -2 || count === -3) ? -1: 0;
                }
            } else {
                if (count === 3){
                    mutatedState = 1;
                } else if (count === -3){
                    mutatedState = -1;
                }
            }


            return mutatedState;
        },

        nextGeneration: function(){
            //get set of all AliveCells and potential neighbours
            var that = this;

            //Generate Frequency Map
            var cellFrequency = [];
            var nextGenAlive = [];
            _.each(Object.keys(cellsAlive), function (c){
                var neighbours = getNeighbours(c);
                _.each(neighbours, function (p){
                    if (cellFrequency[p] !== undefined){
                        cellFrequency[p] += cellsAlive[c];
                    } else {
                        cellFrequency[p] =  cellsAlive[c];
                    }
                });
            });

            //generate next cell mutation based on frequency count
            _.each(Object.keys(cellFrequency), function (p){
                var nxtState = that.nextCellState(p, cellFrequency[p]);
                if (nxtState !== 0){
                    nextGenAlive[p] = nxtState;
                }
            });

            cellsAlive = nextGenAlive;
        },

        genEnemyCells: function(){
            cellsAlive = generator.genEnemyCells(cellsAlive);
        },

        genFriendlyCells: function (){
            cellsAlive = generator.genFriendlyCells(cellsAlive);
        }
    }
}
