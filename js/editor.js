function Editor(){

    var teamConfig = {};
    var editTeamCanvas;
    var ectx;

    var w;
    var h;

    var scale;




    return {
        posToIndex: function(pos){
            var x, y;
            if ((pos.x % (w/teamSize) !== 0) && (pos.y % (w/teamSize) != 0)){
                x = Math.floor(pos.x/scale);
                y = Math.floor(pos.y/scale);
            }
            return ((y*teamSize) + x);
        },

        trigger: function(pos){

            var p = this.posToIndex(pos);
            //given a position if it is in config remove it, else add it
            if (teamConfig[p] !== undefined){
                delete teamConfig[p];
            } else {
                teamConfig[p] = 1;
            }
        },

        getConfig: function(){
            return teamConfig;
        },

        init: function(conf){
            teamConfig = conf;
            editTeamCanvas = document.getElementById("editTeamCanvas");
            ectx = editTeamCanvas.getContext("2d");
            w = editTeamCanvas.width;
            h = editTeamCanvas.height;
            scale = w/teamSize;
        },

        clearConfig: function(){
            teamConfig = {};
        }
    }
}