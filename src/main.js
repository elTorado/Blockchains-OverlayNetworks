var c = document.createElement("canvas");
var ctx = c.getContext("2d");

var screenWidth = 500;
var screenHeight = 800;
c.width = screenWidth;
c.height = screenHeight;
document.body.appendChild(c);

window.addEventListener('keydown',this.keydown,false);
window.addEventListener('keyup',this.keyup,false);

//Variables
const gravity = 0.34;
var holdingLeftKey = false;
var holdingRightKey = false;
var keycode;
var dead = false;
var beginning = "true";

var safed = true;
var cheating = false;
var hsSent = false;
var difficulty = 0;
var lowestBlock = 0;
var score = 0;
var yDistanceTravelled = 0;

var blocks = [];
var powerups = [];

//Time variables
var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;



function keydown(e) {
    if (e.keyCode === 65) {
        holdingLeftKey = true;
    }   else if (e.keyCode === 68) {
        holdingRightKey = true;
    }
    if(e.keyCode == 81 && beginning){
        beginning = false;
    }

    if (e.keyCode === 82 && safed && !beginning) {
        blocks = [];
        lowestBlock = 0;
        difficulty = 0;
        score = 0;
        yDistanceTravelled = 0;
        player.springBootsDurability = 0;

        blocks.push(new block);
        blocks[0].x = 300;
        blocks[0].y = 650;
        blocks[0].monster = 0;
        blocks[0].type = 0;
        blocks[0].powerup = 0;

        blockSpawner();
        
        player.x = 300;
        player.y = 550;


        Coursetro.methods.startGame().send(
            { from: address },
            function(error, result){
                if(!error)
                    {
                        safed = false
                    }
                else {
                    console.error(error);
                    console.error("someone is cheating");
                    cheating = true;
                }
            }
        ).then(console.log);
    }
}

function keyup(e) {
    if (e.keyCode === 65) {
        holdingLeftKey = false;
    } else if (e.keyCode === 68) {
        holdingRightKey = false;
    }
}

function showScore() {
    if (yDistanceTravelled > score) {
        score = Math.round(yDistanceTravelled);
    }

    ctx.font = "36px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(score, 15, 40); 
}

function showHighScore() {
    ctx.font = "36px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "left";
    ctx.fillText(highscore, 15, 80);
}

blocks.push(new block);
blocks[0].x = 300;
blocks[0].y = 650;
blocks[0].monster = 0;
blocks[0].type = 0;
blocks[0].powerup = 0;

blockSpawner();

function performCalls(){
    for (let x of commands) {
        console.log("command");
    }
}

function loop() {
    requestAnimationFrame(loop);

    //This sets the FPS to 60
    now = Date.now();
    delta = now - then;
     
    if (delta > interval) {
        var backgroundImage = new Image();
        backgroundImage.src = "Sprites/bg10.png";
        ctx.drawImage(backgroundImage, 0, 0, screenWidth, screenHeight) 

        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i] !== 0) {
                blocks[i].update();
                blocks[i].draw();
            }
        }

        player.update();
        player.draw();

        showScore();
        showHighScore();

        ctx.fill();
        then = now - (delta % interval);
    }
}

loop();
