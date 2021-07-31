var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running, player_collided;
var ground, invisibleGround;

var bananaGroup, bananaImage;
var obstaclesGroup,
  obstacle1;

//dun set colider is creating issue remove that mam previously also it was creating why so
var score = 0;

var ban
var gameOver, restart;

function preload() {

player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  player_collided = loadAnimation("Monkey_03.png");
 
  bananaImage = loadImage("banana.png");
  obstacle1 = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage  ("restart.png");
  
   backgroundImg = loadImage("jungle.jpg")
  
}

function setup() {
  createCanvas(800, 400);  
  
bckground = createSprite(0,0,800,400);
  bckground.addImage(backgroundImg)
  bckground.scale = 1.5
  bckground.x = bckground.width/2
  bckground.velocityX = -4

     
  player = createSprite(100,340,20,50);
  player.addAnimation("running", player_running);
  player.addAnimation("collided", player_collided);
  player.scale = 0.1;
  

  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
   gameOver = createSprite(400, 200);

  gameOver.addImage(gameOverImg);

  restart = createSprite(400, 250);
  restart.addImage(restartImg);



  gameOver.scale = 0.7;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;


  bananaGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background(0)
  
drawSprites()
 
  //score.display()
  
  
  if (gameState === PLAY) { 
    if(bckground.x<80){
      bckground.x=bckground.width/2
     
     }
  
     if(bananaGroup.isTouching(player)){
      bananaGroup.destroyEach()
      player.scale += 0.05;
      score = score+2;
     
    }
    if (keyDown("space")&&player.y>=50) {
      player.velocityY = -10;
    }

   player.velocityY = player.velocityY + 0.8;

    
    player.collide(ground);
    spawnBanana();
    spawnObstacles();

    if (obstaclesGroup.isTouching(player)) {
      gameState = END;
    }
  }

 else if (gameState === END) 
 {
    gameOver.visible = true;
    restart.visible = true;
    //set velcity of each game object to 0
    bckground.velocityX = 0;
    //player is not jumping on x so no need also if u will make that invisible what is the pirpose of colliding animation?  ok 
    player.velocityY = 0;
    
    //change the boy animation
    player.changeAnimation("collided", player_collided);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
//u r destroying then no use of setting velocity
    obstaclesGroup.destroyEach()
bananaGroup.destroyEach()
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  
  textSize(30)
  fill("blue")
  text("Score: " + score, 500, 50);
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount%80===0) { 
   ban = createSprite(600, 120, 40, 10);
    ban.y = Math.round(random(40, 190));
    ban.addImage(bananaImage);
    ban.scale = 0.05;
    ban.velocityX=-3
    //assign lifetime to the variable
    ban.lifetime = 300;

    //adjust the depth
    ban.depth = player.depth;
    player.depth = player.depth + 1;

    //add each cloud to the group
    bananaGroup.add(ban);
    
  }
  
}

function spawnObstacles() {
  if (frameCount%240===0) {
    var obstacle = createSprite(800, 350, 10, 40);   

    //generate random obstacles
    //var rand = Math.round(random(1));
   
        obstacle.addImage(obstacle1);
 
    

    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.15;
    //mam obstacle are looking very big
obstacle.velocityX= -(4+2*score/100);

    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
 bckground.velocityX = -4
 player.scale = 0.1
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
player.visible = true
  player.changeAnimation("running", player_running);

 
  score = 0;
}

