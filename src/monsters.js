function spawnMonster() {
    var monsterChances = {
        "smallRed": 30,
        "safePoint": 10
    };

    if (Math.round(Math.random() * monsterChances["safePoint"]) === 0 ) {
        return "safePoint";
    }

    if (Math.round(Math.random() * monsterChances["smallRed"]) === 0 ) {
        return "smallRed";
    }
    return 0;
}

var smallRed = new function() {
    this.xDif = 10;
    this.yDif = -30;
    this.width = 69;
    this.height = 60;

    MonsterStyle = {
        linecolor: "#000000",
        fitcolor: "#7FFFD4",
        ArrayMon: [
            [3, 9], [5, 9], [7, 9],
            [1, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [9, 8],
            [1, 7], [2, 7], [4, 7], [6, 7], [8, 7], [9, 7],
            [0, 6], [4, 6], [5, 6], [6, 6], [10, 6],
            [0, 5], [10, 5],
            [1, 4], [9, 4],
            [0, 3], [1, 3], [9, 3], [10, 3],
            [2, 2], [3, 2], [7, 2], [8, 2],
            [2, 1], [4, 1], [5, 1], [6, 1], [8, 1],
            [5, 0],
            [3, 4], [7, 4], [5, 3]
        ],

        ArrayMonCo: [
            [3, 7], [7, 7],
            [1, 6], [2, 6], [3, 6], [7, 6], [8, 6], [9, 6],
            [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
            [2, 4], [4, 4], [5, 4], [6, 4], [8, 4],
            [2, 3], [3, 3], [4, 3], [6, 3], [7, 3], [8, 3],
            [4, 2], [5, 2], [6, 2]
        ]

    };

    this.draw = function(blockX, blockY) {
        for (var i = 0; i < MonsterStyle.ArrayMon.length; i++) {
            ctx.fillStyle = MonsterStyle.linecolor;
            ctx.fillRect(blockX + this.xDif + MonsterStyle.ArrayMon[i][0] * 69 / 11, blockY + this.yDif + MonsterStyle.ArrayMon[i][1] * 60 / 10, this.width / 11, this.height / 10);
        }

        for (var i = 0; i < MonsterStyle.ArrayMonCo.length; i++) {
            ctx.fillStyle = MonsterStyle.fitcolor;
            ctx.fillRect(blockX + this.xDif + MonsterStyle.ArrayMonCo[i][0] * 69 / 11, blockY + this.yDif + MonsterStyle.ArrayMonCo[i][1] * 60 / 10, this.width / 11, this.height / 10);
        }    
    }        
}

var safePoint = new function() {
    this.xDif = 10;
    this.yDif = -30;
    this.width = 69;
    this.height = 60;

    SafeStyle = {
        linecolor: "#000000",
        fitcolor: "#d47fff",
        ArrayMon: [
            [5, 9],
            [4, 8], [6,8],
            [3,7], [7,7],
            [2,6], [8,6],
            [1,5], [9,5],
            [2,4], [8,4],
            [3,3], [7,3],
            [4,2], [6,2],
            [5, 1]
        ],

        ArrayMonCo: [
            [5,8],
            [4,7],[5,7],[5,7],
            [3,6],[4,6],[5,6],[5,6],[6,6],
            [2,5],[3,5],[4,5],[5,5],[5,5],[6,5],[7,5] /*,
            [3,4],[4,4],[5,4],[5,4],[6,4],
            [4,3],[5,3],[6,3],
            [5,2]*/
        ]

    };

    this.draw = function(blockX, blockY) {
        for (var i = 0; i < SafeStyle.ArrayMon.length; i++) {
            ctx.fillStyle = SafeStyle.linecolor;
            ctx.fillRect(blockX + this.xDif + SafeStyle.ArrayMon[i][0] * 69 / 11, blockY + this.yDif + SafeStyle.ArrayMon[i][1] * 60 / 10, this.width / 11, this.height / 10);
        }

        for (var i = 0; i < SafeStyle.ArrayMonCo.length; i++) {
            ctx.fillStyle = SafeStyle.fitcolor;
            ctx.fillRect(blockX + this.xDif + SafeStyle.ArrayMonCo[i][0] * 69 / 11, blockY + this.yDif + SafeStyle.ArrayMonCo[i][1] * 60 / 10, this.width / 11, this.height / 10);
        }
    }
}

var monsterFunctions = {
    "smallRed": smallRed,
    "safePoint": safePoint
}
