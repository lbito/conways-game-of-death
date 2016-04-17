function Game(w, h){
    var width = w;
    var height = h;
    var teamSize = 16;

    var generationCount = 0;

    var finalGeneration = 150;


    var generator = Generator(width,height,teamSize);

    var friendConfig = generator.generateCells(1);
    var enemyConfig = generator.generateCells(-1);

    var cells = Cells(width,height, teamSize);
    cells.loadFriendlyConfig(friendConfig);
    cells.loadEnemyConfig(enemyConfig);

    return {
        getCells: function (){
            return cells.getCells();
        },
        tick: function(){
            if (generationCount === finalGeneration){
                return true;
            }

            cells.nextGeneration();
            generationCount++;
        },

        generateFriendlies: function(){
            friendConfig = generator.generateCells(1);
            cells.loadFriendlyConfig(friendConfig);
        },

        reset: function(){
            cells.reset();
            generationCount = 0;
            cells.loadEnemyConfig(enemyConfig);
            cells.loadFriendlyConfig(friendConfig);
        },

        setDensity: function(d){
            generator.setDensity(d)
        },

        loadFriendlyConfig: function(c){
            generationCount = 0;
            cells.loadFriendlyConfig(c);
        },

        setEnemyConfig: function(c){
            switch(c){
                case "sun":
                    enemyConfig = configurations.sun;
                    break;
                case "harmless":
                    enemyConfig = configurations.harmless;
                    break;
                case "ships":
                    enemyConfig = configurations.ships;
                    break;
                case "virus":
                    enemyConfig = configurations.virus;
                    break;
                case "line":
                    enemyConfig = configurations.line;
                    break;
                case "frog":
                    enemyConfig = configurations.frog;
                    break;
                case "queen":
                    enemyConfig = configurations.queen;
                    break;
                case "random":
                    enemyConfig = generator.generateCells(-1);
                    break;
            }
        },

        setFriendlyConfig: function(c){
            friendConfig = c;
        },

        genEnemyCells: function(){
            cells.loadEnemyConfig(generator.genEnemyCells(cells.getCells()));
        },

        genFriendlyCells: function (){
            cells.loadFriendlyConfig(generator.genFriendlyCells(cells.getCells()));
        },

        getFriendConfig: function(){
            return friendConfig;
        },

        getScore: function(){
            var cAlive = cells.getCells();
            var score = 0;
            _.each(Object.keys(cAlive), function(c){
                score += cAlive[c];
            });
            return score;
        },

        generationsRemaining: function(){
            return finalGeneration-generationCount;
        },

        setGenerations: function(n){
            n = parseInt(n);
            if ((typeof (n) === "number") && (n > 0)){
                finalGeneration = n;
            }
        }



    }
}