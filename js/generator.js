function Generator(w,h,tSize){
    var width = w;
    var height = h;
    var teamSize = tSize;

    var enemyStartPos = (teamSize)* width + (width - teamSize*2);
    var friendlyStartPos = (teamSize)* width + (teamSize);

    //0 to 1
    var density = 0.6;


    return {


        genEnemyCells: function(cells){
            for (var i=0; i < teamSize;i++){
                for (var j = enemyStartPos; j< enemyStartPos + teamSize;j++){
                    var nPos = j + (width*i);
                    delete cells[nPos];
                    var rnd = Math.floor(Math.random() * 10) + 1;
                    if (rnd < density*10){
                        cells[nPos] = -1;
                    }
                }
            }
            return cells;
        },

        genFriendlyCells: function(cells){
            for (var i=0; i < teamSize;i++){
                for (var j = friendlyStartPos; j< friendlyStartPos + teamSize;j++){
                    var nPos = j + (width*i);
                    delete cells[nPos];
                    var rnd = Math.floor(Math.random() * 10) + 1;
                    if (rnd < density*10){
                        cells[nPos] = 1;
                    }
                }
            }
            return cells;
        },
    }
    
}