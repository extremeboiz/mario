var sound; 
var mario_running;
var mario_still;
var mario_back;
var mario_fast;
var star, starGroup;
var bgImage, bg;
var groundImage, ground;
var obstacle, obstacleImg, obstaclesGroup;
function preload(){
  sound = loadSound("sound/Super Mario Bros. Theme Song.mp3");
  
  mario_running = loadAnimation("running/mario-running0.png", "running/mario-running1.png", "running/mario-running2.png");
  
  mario_still = loadImage("still/mario-still0.png");
  
  mario_fast = loadAnimation("fast/mario-fast0.png", "fast/mario-fast1.png", "fast/mario-fast2.png", "fast/mario-fast3.png", "fast/mario-fast4.png", "fast/mario-fast5.png");
  
  mario_back = loadAnimation("backwards/mario-backrun0.png" ,"backwards/mario-backrun1.png" ,"backwards/mario-backrun2.png");
  
  star = loadAnimation("star/star0.png", "star/star1.png", "star/star2.png", "star/star3.png", "star/star4.png", "star/star5.png", "star/star6.png");
  
  bgImage = loadImage("bg/bg0.png");
  groundImage = loadImage("ground/ground0.png");

  obstacleaImg = loadImage("galooomba_orig.png");
  
}
function setup() {
  createCanvas(600, 200);
  mario = createSprite(300,100)
  mario.addAnimation("run" ,mario_running);
  mario.addAnimation("fast", mario_fast);
  mario.addAnimation("still", mario_still);
  mario.addAnimation("back", mario_back);
  //mario.scale = 0.25;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);

  starsGroup = new Group()
  obstaclesGroup = new Group()

}

function draw() {
  background(bgImage);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && mario.y >= 159) {
      mario.velocityY = -12;
    }
  
    mario.velocityY = mario.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    mario.collide(invisibleGround);
    spawnStars();
    spawnObstacle();
  
    if(obstaclesGroup.isTouching(mario)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    mario.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);
    
    //change the trex animation
    mario.changeAnimation("still",mario_still);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);
    
    
    star.destroyEach()
  }
  
  
  drawSprites();
}
