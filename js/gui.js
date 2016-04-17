function Gui(w, h){

    var editMode = false;

    var width = w;
    var height = h;
    var gameCanvas = document.getElementById("gameCanvas");
    var ctx = gameCanvas.getContext("2d");

    var editTeamCanvas = document.getElementById("editTeamCanvas");
    var ectx = editTeamCanvas.getContext("2d");

    var optionsPanel = document.getElementById("optionsPanel");
    var editPanel = document.getElementById("editPanel");

    //size of each cell in pixels
    var pieceSize = 8;


    function indexToPos(pos){
        //index to x,y co-ord
        return {
            x:  pos % width,
            y: (Math.floor(pos/width))
        }
    }


    function drawEditSquares(){
        var sqSize=  editTeamCanvas.width/teamSize;
        ectx.fillStyle= "white";
        ectx.fillRect(0, 0, editTeamCanvas.width, editTeamCanvas.height);
        ectx.fillStyle = "silver";
        var i;
        for(i=0;i<teamSize;i++){
            ectx.fillRect(0,i*sqSize,editTeamCanvas.width*pieceSize,1);
        }

        for (i=0;i<teamSize;i++){
            ectx.fillRect(i*sqSize,0, 1,editTeamCanvas.height*pieceSize);
        }
    }

    return {
        draw: function (cells){
            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            this.drawGrid();
            var that = this;
            _.each(Object.keys(cells), function (c){
                that.drawCell(c, cells[c]);
            });
        },
        drawCell: function(pos, val){
            var nPos = indexToPos(pos);
            ctx.fillStyle = (val === 1)? "darkblue": "firebrick";
            ctx.fillRect(nPos.x*pieceSize+1, nPos.y*pieceSize+1, pieceSize-1, pieceSize-1);
        },

        drawGrid: function(){
            ctx.fillStyle = "silver";
            var i;
            for(i=0;i<height;i++){
                ctx.fillRect(0,i*pieceSize,width*pieceSize,1);
            }

            for (i=0;i<width;i++){
                ctx.fillRect(i*pieceSize,0, 1,height*pieceSize);
            }
        },




        toggleEditMode: function(){
            if (editMode){
                //return to normal view
                gameCanvas.style.display="block";
                editTeamCanvas.style.display="none";
                optionsPanel.style.display = "block";
                editPanel.style.display = "none";
            } else {
                gameCanvas.style.display ="none";
                editTeamCanvas.style.display="block";
                optionsPanel.style.display = "none";
                editPanel.style.display = "block";

                drawEditSquares();
            }
            editMode = !editMode;

        },

        editConfigScreen: function (cells){
            drawEditSquares();
            ectx.fillStyle= "blue";
            var sqSize=  editTeamCanvas.width/teamSize;
            if (editMode){
                for (var i=0;i<teamSize*teamSize;i++){
                    if (cells[i] !== undefined){
                        var x = i % teamSize;
                        var y = Math.floor(i/teamSize);
                        ectx.fillRect(x*sqSize+1, y*sqSize+1,sqSize-1,sqSize-1);
                    }
                }
            }
        },

        genRemaining:function(gens){
            var genText = document.getElementById("genRemainingText");
            genText.value = parseInt(gens);
        }
    }
}