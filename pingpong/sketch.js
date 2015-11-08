//pong clone
//mouse to control both paddles
var input;
var mic, soundFile;
var amplitude;
var mapMax = 1.0;


var paddleA, paddleB, ball, wallTop, wallBottom;
var MAX_SPEED = 5;

function setup() {
  createCanvas(800,400);
  //frameRate(6);
  input = new p5.AudioIn();
  input.start();

  // amplitude = new p5.Amplitude();
  // input = new p5.AudioIn();
  // amplitude.setInput(mic);



  paddleA = createSprite(30, height/2, 10, 100);
  paddleA.immovable = true;
  
  paddleB = createSprite(width-28, height/2, 10, 100);
  paddleB.immovable = true;
  
  wallTop = createSprite(width/2, -30/2, width, 30);
  wallTop.immovable = true;
  
  wallBottom = createSprite(width/2, height+30/2, width, 30);
  wallBottom.immovable = true;
  
  ball = createSprite(width/2, height/2, 10, 10);
  ball.maxSpeed = MAX_SPEED;
  
  paddleA.shapeColor = paddleB.shapeColor =ball.shapeColor = color(255,255,255);
  
  ball.setSpeed(MAX_SPEED, -180);
}

function draw() {
  background(0);
  // amplitude = new p5.Amplitude();
  // var level = amplitude.getLevel();
  var volume = input.getLevel();

  // text('Amplitude: ' + level, 20, 20);
    text('volume: ' + volume, 20, 20);
  text('mapMax: ' + mapMax, 20, 40);


  // paddleA = map(level, 0, mapMax, height, 0);
  // paddleB = map(level, 0, mapMax, height, 0);
  //console.log(map(level, 0, mapMax, height, 0));
  // paddleA.position.y = map(level, 0, mapMax, height, 0);
  // paddleB.position.y = map(level, 0, mapMax, height, 0);

  // paddleA.position.y = constrain(level*2, paddleA.height/2, height-paddleA.height/2);
  paddleA.position.y = constrain(map(volume*4, 0, mapMax, height, 0), paddleA.height/2, height-paddleA.height/2);
  paddleB.position.y = constrain(map(volume*4, 0, mapMax, height, 0), paddleA.height/2, height-paddleA.height/2);
  
  // paddleA.position.y++;

  ball.bounce(wallTop);
  ball.bounce(wallBottom);
  
  if(ball.bounce(paddleA)) {
    var swing = (ball.position.y-paddleA.position.y)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
  }
  
  if(ball.bounce(paddleB)) {
    var swing = (ball.position.y-paddleB.position.y)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()-swing);
  }
  
  if(ball.position.x<0) {
  ball.position.x = width/2;
  ball.position.y = height/2;
  ball.setSpeed(MAX_SPEED, 0);
  }
  
  if(ball.position.x>width) {
  ball.position.x = width/2;
  ball.position.y = height/2;
  ball.setSpeed(MAX_SPEED, 180);
  }
  
  drawSprites();
  
}
