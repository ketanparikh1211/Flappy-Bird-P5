var bird;
var pipes = [];
var mic;
var sliderTop;
var sliderBottom;
var clapping = false;
var score=0;
var play=false;
var birdimg;
var end=0;
var end1=false;

function setup() {
	
	birdimg=loadImage('J.jpg');
	
  createCanvas(400, 600);
  mic = new p5.AudioIn();
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());
  sliderTop = createSlider(0, 1, 0.3, 0.01);
  sliderBottom = createSlider(0, 1, 0.1, 0.01);
	
}

function draw() {
	
	
	
	if(play!=true)
	{
		background(0,3,255);
		  fill(249,249,249);
  textSize(62);
  text("FLAPPY BIRD", width/2-200, 80);
  textSize(48);
  fill(255,0,0);
 text("PRESS SPACE",width/2-150,height/2);
 fill(249,249,249);
 rect(width/2-160,height/2+20,300,20)
	}
	if(play==true)
	
	{	
  background(42,106,255);
   
  var vol = mic.getLevel();
  var safe=true;
  var temp;
  

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
	  safe=false;
	  end++;
	  console.log(end);
    }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }


  }

  if(end>80)
	  
  {   noStroke();
	  noFill();
	  background(69,0,68);
	  textSize(60);
  fill(255,0,0);
 text("GAME OVER",width/2-180,height/2);
  }
  bird.update();
  bird.show();
  if (safe) {
    
	score++;
	
  } else {
    score-=50;
  }

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }

  var thresholdTop = sliderTop.value();
  var thresholdBottom = sliderBottom.value();

  if (vol > thresholdTop && !clapping) {
    bird.up();
    clapping = true;
  }

  if (vol < thresholdBottom) {
    clapping = false;
  }

  fill(0, 255, 0);
  //console.log(vol);
  noStroke();
  var y = map(vol, 0, 1, height, 0);
  rect(width - 50, y, 50, height - y);

  var ty = map(thresholdTop, 0, 1, height, 0);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(width - 50, ty, width, ty);

  var by = map(thresholdBottom, 0, 1, height, 0);
  stroke(0, 0, 255);
  strokeWeight(4);
  line(width - 50, by, width, by);

  fill(255, 0, 255);
  textSize(64);
  if(end<80)
  {
  if(score>0)
  {
  text(score, width/2, 50);
  score = constrain(score, 0, score);
  }
  else{
	  
	  text("CRASH", width/2-100, 50);
  score = constrain(score, 0, score);
  
  }
  }
  
  
}
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
	play=true;
    //console.log("SPACE");
  }
}

function Pipe() {

  var spacing = random(50, height / 2);
  var centery = random(spacing, height - spacing);

  this.top = centery - spacing / 2;
  this.bottom = height - (centery + spacing / 2);
  this.x = width;
  this.w = 50;
  this.speed = 2;

  this.highlight = false;

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
    noStroke();
    fill(96, 54, 24);
    if (this.highlight) {
      fill(255,0,0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}
function Bird() {
  this.y = height / 2;
  this.x = 64;

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    fill(255);
    noStroke();
    fill (0);
    rect (this.x +12, this.y + 0, 12, 2);
    rect (this.x +8, this.y + 2, 4, 2);
    rect (this.x +18, this.y + 2, 2, 2);
    rect (this.x +24, this.y + 2, 2, 2);
    rect (this.x +6, this.y + 4, 2, 2);
    rect (this.x +16, this.y + 4, 2, 6);
    rect (this.x +26, this.y + 4, 2, 2);
    rect (this.x +2, this.y + 6, 8, 2);
    rect (this.x +24, this.y + 6, 2, 4);
    rect (this.x +28, this.y + 6, 2, 6);
    rect (this.x +0, this.y + 8, 2, 6);
    rect (this.x +10, this.y + 8, 2, 2);
    rect (this.x +12, this.y + 10, 2, 4);
    rect (this.x +18, this.y + 10, 2, 2);
    rect (this.x +20, this.y + 12, 12, 2);
    rect (this.x +2, this.y + 14, 2, 2);
    rect (this.x +10, this.y + 14, 2, 2);
    rect (this.x +18, this.y + 14, 2, 2);
    rect (this.x +32, this.y + 14, 2, 2);
    rect (this.x +4, this.y + 16, 6, 2);
    rect (this.x +16, this.y + 16, 2, 2);
    rect (this.x +20, this.y + 16, 12, 2);
    rect (this.x +4, this.y + 18, 2, 2);
    rect (this.x +18, this.y + 18, 2, 2);
    rect (this.x +30, this.y + 18, 2, 2);
    rect (this.x +6, this.y + 20, 4, 2);
    rect (this.x +20, this.y + 20, 10, 2);
    rect (this.x +10, this.y + 22, 10, 2);
  
  
// Yellow pixels:
    fill (255, 255, 0);
    rect (this.x +12, this.y + 4, 4, 2);
    rect (this.x +10, this.y + 6, 6, 2);
    rect (this.x +12, this.y + 8, 4, 2);
    rect (this.x +14, this.y + 10, 4, 2);
    rect (this.x +2, this.y + 12, 2, 2);
    rect (this.x +10, this.y + 12, 2, 2);
    rect (this.x +14, this.y + 12, 6, 2);
    rect (this.x +4, this.y + 14, 6, 2);
    rect (this.x +12, this.y + 14, 6, 2);
    
// Orange pixels:
    fill (255, 102, 0);
    rect (this.x +10, this.y + 16, 6, 2);
    rect (this.x +6, this.y + 18, 12, 2);
    rect (this.x +10, this.y + 20, 10, 2);

// Red pixels:
    fill (204, 0, 51);
    rect (this.x +20, this.y + 14, 12, 2);
    rect (this.x +18, this.y + 16, 2, 2);
    rect (this.x +20, this.y + 18, 10, 2);
    
// White pixels:
    fill (255);
    rect (this.x + 12, this.y + 2, 6, 2);
    rect (this.x + 20, this.y + 2, 4, 2);
    rect (this.x + 8, this.y + 4, 4, 2);
    rect (this.x + 18, this.y + 4, 6, 6);
    rect (this.x + 24, this.y + 4, 2, 2);
    rect (this.x + 26, this.y + 6, 2, 6);
    rect (this.x + 2, this.y + 8, 2, 4);
    rect (this.x + 4, this.y + 8, 6, 6);
    rect (this.x + 10, this.y + 10, 2, 2);
    rect (this.x + 20, this.y + 10, 6, 2);
    
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}
