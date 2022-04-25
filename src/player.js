var player = new function() {
    this.x = 300;
    this.y = 550;
    this.img = new Image();
    this.img.src = "Sprites/rightPlayer.png";
    this.width = 80;
    this.height = 80;
    this.xSpeed = 6.7;
    this.ySpeed = 0;
    this.springBootsDurability = 0;
    this.direction = "left";
    this.hsSent = false;
    var canvas = document.createElement('canvas');
    canvas.id = "CursorLayer";
    canvas.width = 500;
    canvas.height = 800;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    cursorLayer = document.getElementById("CursorLayer");
    console.log(cursorLayer);
    var red = 255;
    var green = 0;
    var blue = 0;

    //Blockchain stuffif (typeof web3 !== 'undefined') {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    web3.eth.defaultAccount = web3.eth.accounts[0];

    var Coursetro = new web3.eth.Contract(
        [{"inputs":[],"name":"getHighScore","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"random","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"random1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"random2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"hs","type":"uint256"}],"name":"setHighScore","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"r","type":"uint256"},{"internalType":"uint256","name":"g","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"setValue","outputs":[],"stateMutability":"nonpayable","type":"function"}]
        , '0x4612BeBbB086Fae0d050BE8d8d58aC56Dca844Da');

    Coursetro.methods.getValue().call(
                function(error, result){
                if(!error)
                    {
                        console.log(result);
                        red =  result[Object.keys(result)[0]];
                        blue =  result[Object.keys(result)[1]];
                        green =  result[Object.keys(result)[2]];
                        console.log(this.red, this.blue, this.green);

                    }
                else
                    console.error(error);
            });

    var x;
    var address=prompt("Please enter your valet address e.g.","0x3E4A4A4Cb82d95560E2fBb9E6c1EBa14EE66dBD3");
    //if (address!=null){
    if (web3.utils.isAddress(address)) {
        x="Thanks!";
        alert(x);
    }
    else {
        alert("Address not valid! Exiting")
        location.reload(); 
    }
    

    this.update = function() {

    

        if (!dead) {
            //console.log(hsSent)
            this.ySpeed += gravity;
            if (this.y <= screen.height / 2 - 200 && this.ySpeed <= 0) {
                for (var i = 0; i < blocks.length; i++) {
                    blocks[i].y -= this.ySpeed;
                }
            } else {
                this.y += this.ySpeed;
            }
            yDistanceTravelled -= this.ySpeed;
        } else {
            ctx.font = "60px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("You Died!", screenWidth / 2, screenHeight / 2); 
            ctx.font = "36px Arial";
            ctx.fillText("Press r to restart", screenWidth / 2, (screenHeight / 2) + 50);
            if (!this.hsSent){
                console.log("läuft")
                Coursetro.methods.setHighScore(score).send({ from: address }).then(console.log)
                this.hsSent = true
            console.log("hat gesendet")
            }
            console.log(this.hsSent)
        }

        //A key pressed
        if (holdingLeftKey) {
            this.direction = "left";
            this.img.src = "Sprites/leftPlayer.png";
            player.moveLeft();
        }
        //D key pressed 
        if (holdingRightKey) {
            this.direction = "right";
            this.img.src = "Sprites/rightPlayer.png";
            player.moveRight();
        }

        //Check for jump
        for (var i = 0; i < blocks.length; i++) {
            if (this.ySpeed >= 0) {
                if (this.x >= blocks[i].x - this.width + 15 && this.x <= blocks[i].x + blocks[i].width - 15 &&
                    this.y >= blocks[i].y - this.height && this.y <= blocks[i].y + blocks[i].height - this.height) {
                    if (blocks[i].type === "break") {
                        blocks[i] = 0;
                    } else if (blocks[i].monster !== 0) {
                        this.jump(blocks[i].powerup, blocks[i].type);
                        blocks[i] = 0;
                    } else {
                        this.jump(blocks[i].powerup, blocks[i].type);
                    }
                }
            } 
            if (this.y > blocks[i].y) {
                //Check for hit monster
                if (blocks[i].monster !== 0 && blocks[i].monster !== undefined) {
                    if (this.x >= blocks[i].x - this.width + 15 && this.x <= blocks[i].x + blocks[i].width - 15 &&
                        this.y >= blocks[i].y - blocks[i].height && this.y <= blocks[i].y + blocks[i].height) {
                        dead = true;
                    }
                }
            }
        }


        for (var i = blocks.length-1; i > 0; i--) {
            if (blocks[i].y > screenHeight) {
                lowestBlock = i+1;
                break;
            }
        }

        if (this.y >= blocks[lowestBlock].y) {
            dead = true;
        }

        if (lowestBlock >= 45) {
            if (difficulty < 6) {
                difficulty += 1;
            }
            blockSpawner();
        }
    }
    
    this.jump = function(powerup, type) {
        this.ySpeed = -13.2;

        if (powerup === "springBoots") {
            this.springBootsDurability = 6;
        }
        
        if (type === 0) {
            if (powerup === "spring") {
                this.ySpeed = -20;
            } 
        }

        if (this.springBootsDurability !== 0) {
            this.ySpeed = -20;
            this.springBootsDurability -= 1;
        }  
    }

    this.moveLeft = function() {
        this.x -= this.xSpeed;
        if (this.x <= -this.width) {
            this.x = screenWidth;
        }
    }

    this.moveRight = function() {
        this.x += this.xSpeed;
        if (this.x >= screenWidth) {
            this.x = -this.width;
        }
    }

    // add code here for drawing character
    // can also be: var PlayerStyle (not clearly know differences)

    PlayerStyle = {
        // color style R G B number + transparency
        // another style using in monster and block, only index

        // line of character
        linecolor: "rgba(255, 228, 225 ,0.9 )",
        // color fill in
        fillcolor: "rgba("+red+","+green+","+blue +", 0.8)",

        //the point array of line
        // first number is x indexes, second is y indexes
        ArrayCha1: [
            [5, 13], [6, 13], [8, 13], [9, 13], [5, 12], [8, 12],
            [3, 11], [4, 11], [5, 11], [6, 11], [7, 11], [8, 11], [9, 11], [10, 11],
            [3, 10], [5, 10], [10, 10], [10, 10],
            [3, 9], [7, 9], [8, 9], [10, 9], [11, 9], [12, 9],
            [3, 8], [7, 8], [10, 8], [3, 7], [5, 7], [7, 7], [9, 7], [10, 7],
            [1, 6], [2, 6], [3, 6], [7, 6], [10, 6],
            [3, 5], [5, 5], [6, 5], [7, 5], [10, 5], [11, 5], [3, 4], [11, 4],
            [3, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [3, 2], [4, 2], [5, 2]
        ],

        //the point array of color fill in
        ArrayCha2: [
            [4, 10], [6, 10], [7, 10], [8, 10], [9, 10],
            [4, 9], [5, 9], [6, 9], [9, 9],
            [4, 8], [5, 8], [6, 8], [8, 8], [9, 8],
            [4, 7], [6, 7], [8, 7],
            [4, 6], [5, 6], [6, 6], [8, 6], [9, 6],
            [4, 5], [8, 5], [9, 5],
            [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
            [4, 3]
        ]

    };

    this.drawFigurine = function () {
        // draw the line
        // divided by 14 means the character designed to have 14*14 rectangles
        for (var i = 0; i < PlayerStyle.ArrayCha1.length; i++) {
            var conscolor = PlayerStyle.linecolor;
            ctx.fillStyle = conscolor;
            ctx.fillRect(this.x + PlayerStyle.ArrayCha1[i][0] * 80 / 14, this.y + PlayerStyle.ArrayCha1[i][1] * 80 / 14, this.width / 14, this.height / 14);
        }

        // fill the color
        for (var i = 0; i < PlayerStyle.ArrayCha2.length; i++) {
            var color = PlayerStyle.fillcolor;
            ctx.fillStyle = color;
            ctx.fillRect(this.x + PlayerStyle.ArrayCha2[i][0] * 80 / 14, this.y + PlayerStyle.ArrayCha2[i][1] * 80 / 14, this.width / 14, this.height / 14);
        }
    }

    this.draw = function() {
        this.drawFigurine();
        //ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        if (this.springBootsDurability !== 0) {
            if (this.direction === "right") {
                ctx.fillStyle = "blue";
                ctx.fillRect(this.x + 10, this.y + 66, 15, 10);
                ctx.fillRect(this.x + 33, this.y + 66, 15, 10);  
                ctx.fillStyle = "grey";
                ctx.fillRect(this.x + 10, this.y + 76, 15, 15);
                ctx.fillRect(this.x + 33, this.y + 76, 15, 15);
            } else {
                ctx.fillStyle = "blue";
                ctx.fillRect(this.x + 30, this.y + 66, 15, 10);
                ctx.fillRect(this.x + 53, this.y + 66, 15, 10);  
                ctx.fillStyle = "grey";
                ctx.fillRect(this.x + 30, this.y + 76, 15, 15);
                ctx.fillRect(this.x + 53, this.y + 76, 15, 15);
            }
        }
    }
}
