function Gui(w, h){
    var width = w;
    var height = h;
    var gameCanvas = document.getElementById("gameCanvas");
    var ctx = gameCanvas.getContext("2d");

    //size of each cell in pixels
    var pieceSize = 8;


    function indexToPos(pos){
        //index to x,y co-ord
        return {
            x:  pos % width,
            y: (Math.floor(pos/width))
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
            ctx.fillRect(nPos.x*pieceSize+1, nPos.y*pieceSize+1, pieceSize-2, pieceSize-2);
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
        }
    }
}