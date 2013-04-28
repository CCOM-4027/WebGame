//var WIDTH = document.getElementById("canvas").width, HEIGHT = document.getElementById("canvas").height;// block size
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
var intervalID = 0,tmpID=0;
var canvas, ctx;
var rightDown = false;
var leftDown = false;
var windowMinX = 0;
var windowMaxX = 0;
var NROWS = 5;
var NCOLS = 5;
var BRICKWIDTH;
var BRICKHEIGHT = 15;
var PADDING = 2;
var ballcolor = "#FFFFFF";
var backcolor = "#000000";
var paddlecolor = "#FFFF00";
var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
var ballr = 10;
var bricks;
var start = false,pause=false ;

function initSizeProperties(){
	WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();
    x = WIDTH/2;
	y = HEIGHT-10;
	BRICKWIDTH = (WIDTH/NCOLS) - 1;
	paddlewidth = WIDTH/4;
	paddlew = WIDTH/4;// paddle size 
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
}

function initbricks() {
    bricks = new Array(NROWS);
    for (i=0; i < NROWS; i++) {
	bricks[i] = new Array(NCOLS);
	for (j=0; j < NCOLS; j++) {
	    bricks[i][j] = 1;
	}
    }
}

function startdraw() {
   // x = WIDTH/2;
    //y = HEIGHT-10;
    clearInterval(intervalID);
    intervalID = setInterval(draw, 10);
    initbricks();
}

function abort() {
    clearInterval(intervalID);
    init();
}

function draw() {
  ctx.fillStyle = backcolor;
  clear();
  ctx.fillStyle = ballcolor;
  //for (var x = 25,y=25 ; x < 75 ; x+=25) circle(x,y,ballr);
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
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);

  //reverse the ball and mark the brick as broken
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
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
    	}
      	else if ( y + dy + ballr > HEIGHT+25)
      		clearInterval(intervalID);
  	}
 
  x += dx;
  y += dy;
}

function circle(x,y,r) {
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
	  ctx.fillStyle = rowcolors[Math.floor(Math.random() * 4)];
      if (bricks[i][j] == 1) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING, 
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  rect(0,0,WIDTH,HEIGHT);
}

function doKeyDown(evt) {
	
	//if the game has not started and user press 'space', game starts.
	if(evt.keyCode==32&&start==false){
		startdraw();
		pause = true;
		start=true;
	}
	//when user press esc, game stops.
 	else if(evt.keyCode==27){
		if (pause){ 
			clearInterval(intervalID);
			tmpID++ ;
			pause = false ;
		}
		else if(intervalID==tmpID ){ 
			intervalID = setInterval(draw, 10);
			pause = true;
		}
	}  

	if(evt.keyCode==82) abort();

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
