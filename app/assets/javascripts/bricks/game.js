
var WIDTH,HEIGHT;
var x ;
var y ;
var paddlex;
var paddledx;
var paddlewidth;
var paddleh = 9;
var paddlew ;// paddle size 
var dx = 1;
var dy = -6;
var intervalID = 0 ;
var canvas, ctx;
var rightDown = false;
var leftDown = false;
var windowMinX = 0;
var windowMaxX = 0;
var NROWS = 5;
var NCOLS = 5;
var BRICKWIDTH;
var BRICKHEIGHT = 15;
var PADDING = 4;
var ballcolor = "#FFFFFF";
var backcolor = "#000000";
var paddlecolor = "#FFFF00";
var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
var ballr = 10;
var score = 0 ;
var bricks;
var start = false,pause=false;
var lives = 3;
var paddle_touched = true ;
var hit_count = 1;
var block_colors= [] ;
var COLOR_INDEX = 0 ;
var block_numbers= 0;

function initSizeProperties(){
    document.getElementById("br-box").value = score ;
    document.getElementById("br-box2").value = lives ;
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();
    x = WIDTH/2;
    y = HEIGHT-10;
    BRICKWIDTH = (WIDTH/NCOLS) - 1;
    paddlewidth = WIDTH/4;
    paddlew = WIDTH/4;// paddle size 
    block_numbers= NROWS*NCOLS ;
    
}

function init() {
    start = false ;
    pause = false;
    canvas = document.getElementById("canvas");
    ctx = $('#canvas')[0].getContext("2d");
    windowMinX = $("#canvas").offset().left;
    windowMaxX = windowMinX + $("#canvas").width();
    initSizeProperties();
    paddlex = WIDTH/2;
    x = paddlex+(paddlewidth/2);
    y = HEIGHT-20;	
    initbricks();
    draw();
    setInterval(function(){save();},4000); 
}

function save (){
        $.ajax({
        type: "GET",
        url: "/update_score", // should be mapped in routes.rb
        data: {score: $('#br-box').val()},
        datatype:"html", // check more option 
        async: true
        });
        
}
function initbricks() {
    bricks = new Array(NROWS);
    for (i=0; i < NROWS; i++) {
	bricks[i] = new Array(NCOLS);
	for (j=0; j < NCOLS; j++) {
	    block_colors.push(rowcolors[Math.floor(Math.random() * 4)]);
	    bricks[i][j] = 1;
	}
    }
}

function startdraw() {
    
    if(start){
	paddlex = WIDTH/2;
	x = paddlex+(paddlewidth/2);
        y = HEIGHT-20;
	clearInterval(intervalID);
	intervalID = setInterval(draw, 10);
    }
    
    else{
	start = true;
    	clearInterval(intervalID);
    	intervalID = setInterval(draw, 10);
    	initbricks();
    }	
}

function abort() {
    clearInterval(intervalID);
    init();
}

function update_score(){
    if(paddle_touched == false) {
    	score+=(5*hit_count);
        hit_count++ ;
    }
    else score++;
    if(paddle_touched){
    	hit_count = 1 ;
        paddle_touched=false;
    }
    document.getElementById("br-box").value = score ;
}

function draw() {
    
    ctx.fillStyle = backcolor;
    clear();
    ctx.fillStyle = ballcolor;
    circle(x, y, ballr);

    if (rightDown) paddlex += 5;
    else if (leftDown) paddlex -= 5;
    if(paddlex+paddlew>WIDTH) paddlex-=5;
    else if(paddlex+paddlew<paddlew) paddlex+=5;
    ctx.fillStyle = paddlecolor;
    rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
    drawbricks();
    //want to learn about real collision detection? go read
    // http://www.harveycartel.org/metanet/tutorials/tutorialA.html
    rowheight = BRICKHEIGHT + PADDING+2;
    colwidth = BRICKWIDTH + PADDING+2;
    row = Math.floor(y/rowheight);
    col = Math.floor(x/colwidth);

    //reverse the ball and mark the brick as broken
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    	dy = -dy;
    	bricks[row][col] = 0;
	block_numbers--; 
	if(block_numbers == 0){
	    clearInterval(intervalID);
	    restart_button.draw() ;
	}
	update_score() ;	
    }
    
    if (x + dx + ballr > WIDTH || x + dx - ballr < 0)
    	dx = -dx;
    if (y + dy - ballr < 0) 
	dy = -dy;

    else if (y + dy + ballr > HEIGHT - paddleh) {
    	if (x > paddlex && x < paddlex + paddlew) {
     	    //move the ball differently based on where it hit the paddle
      	    dx = 10 * ((x-(paddlex+paddlew/2))/paddlew);
      	    dy = -dy;
	    paddle_touched = true;
    	}
      	else if ( y + dy + ballr > HEIGHT+25){
	    clearInterval(intervalID);
	    lives--;
	    document.getElementById("br-box2").value = lives ;	
	    if(lives==0){ 
		ctx.font = 'italic 40pt Calibri';
		ctx.textAlign='center';
		ctx.fillStyle = "#FF0033";
      		ctx.fillText('!!!GAME OVER!!!', WIDTH/2, HEIGHT/2); 
	    }
	    else document.getElementById("br-start_button").disabled = false ;
	    
	}
    }
    
    x += dx;
    y += dy;
}

restart_button = {
    w: 100,
    h: 50,
    x: WIDTH/2 - 50,
    y: HEIGHT/2 - 50,
    
    draw: function() {
	ctx.strokeStyle = "white";
	ctx.lineWidth = "2";
	ctx.strokeRect(this.x, this.y, this.w, this.h);
	
	ctx.font = "18px Arial, sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStlye = "white";
	ctx.fillText("Next Level", WIDTH/2, HEIGHT/2 - 25 );
    }
};

function circle(x,y,r){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

function drawbricks() {

    for (i=0; i < NROWS; i++) {
    	//ctx.fillStyle = rowcolors[Math.floor(Math.random() * 4)];
    	for (j=0; j < NCOLS; j++) {
	    ctx.fillStyle = block_colors[COLOR_INDEX] ;
      	    if (bricks[i][j] == 1) {
        	rect((j * (BRICKWIDTH + PADDING)) + PADDING, 
             	     (i * (BRICKHEIGHT + PADDING)) + PADDING,
             	     BRICKWIDTH, BRICKHEIGHT);
      	    }	
	    COLOR_INDEX++ ;
    	}
    }
    COLOR_INDEX = 0 ; // reset the index
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    rect(0,0,WIDTH,HEIGHT);
}

function doKeyDown(evt) {
    
    //when user press esc, game stops.
    if(evt.keyCode==27){
	if (pause == false && start){ 
	    clearInterval(intervalID);
	    pause = true ;
	}
	else if(pause){ 
	    intervalID = setInterval(draw, 10);
	    pause = false;
	}	}  

    //if(evt.keyCode==82) abort();

    //right is 39 left is 37
    if (evt.keyCode == 39) {
	rightDown = true;
    }
    
    else if (evt.keyCode == 37) {
	leftDown = true;
    }
}

function doKeyUp(evt) {
    
    if (evt.keyCode == 39) {
	rightDown = false;
    }
    else if (evt.keyCode == 37) {
	leftDown = false;
    }
}

window.addEventListener('keydown',doKeyDown,false);
window.addEventListener('keyup',doKeyUp,false);
