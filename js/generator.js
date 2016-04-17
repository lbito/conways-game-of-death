function Generator(w,h,tSize){
    var width = w;
    var height = h;
    var teamSize = tSize;



    //0 to 1
    var density = 0.5   ;
    
    return {
        generateCells: function(teamVal){
            var gCells = {};
            for (var i=0; i < teamSize*teamSize;i++){
                var rnd = Math.floor(Math.random() * 10) + 1;
                if (rnd <= density*10){
                    gCells[i] = teamVal;
                }
            }
            return gCells;
        },

        setDensity: function(d){
            density = d;
        }
    }
    
}