var canvas, backgroundImage;
var car1img ,car2Img,car3Img,car4Img, ground, track1I;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

function preload(){
  //absolute path
//car1img=loadImage("E:\Whitehatjr\CarRacingStage1.5\images\car1.png");
//relative path
car1img=loadImage("images/car1.png");
car2Img=loadImage("images/car2.png");
car3Img=loadImage("images/car3.png");
car4Img=loadImage("images/car4.png");
ground=loadImage("images/ground.png");
track1I=loadImage("images/track.jpg")

}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
    if(gameState === 2){
      game.end();
    }
}
