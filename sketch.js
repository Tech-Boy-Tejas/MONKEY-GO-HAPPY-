var gameState = "startStage";

var monkey,monkeyAnimation;
var foodsGroup,obstaclesGroup;
var startScreen,startButton,startScreenImg,startButtonImg;
var gameOver,restart,gameOverImg,restartImg;
var ground,groundImg;
var obstacleImg,foodImg;
var jungle,jungleImg;

function preload(){
  monkeyAnimation =     loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  startScreenImg = loadImage("startScreen0.png");
  startButtonImg = loadImage("startButton0.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  groundImg = loadImage("ground0.png");
  
  foodImg = loadImage("Banana.png");
  obstacleImg = loadImage("stone.png");
  
  jungleImg = loadImage("jungle.jpg");
}

function setup(){
  createCanvas(400,400);
    
  jungle = createSprite(200,200);
  jungle.addImage(jungleImg);
  
  monkey = createSprite(30,340);
  monkey.addAnimation("running",monkeyAnimation);
  monkey.scale = 0.12;
  
  startScreen = createSprite(200,100);
  startScreen.addImage(startScreenImg);
  startButton = createSprite(190,290);
  startButton.addImage(startButtonImg);
  startButton.scale = 0.5;
  startButton.setCollider("circle",0,0,106);
  
  gameOver = createSprite(200,190);
  restart = createSprite(190,350);

  
  gameOver.addImage(gameOverImg);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.7;
  
  gameOver.visible = false;
  restart.visible = false;

  
  foodsGroup = createGroup();
  obstaclesGroup = createGroup();
  
  ground = createSprite(200,380);
  ground.addImage(groundImg);
  ground.setCollider("rectangle",0,0,2377,1,0);
  ground.x = ground.width/2;
   
  score = 0;
}

function draw() {
  background(255);
  
  gameOver.visible = false;
  restart.visible = false;
  
  jungle.visible = false;
  
    if(gameState === "startStage"){
      startScreen.visible = true;
      startButton.visible = true;
      
      if(mousePressedOver(startButton)){
        gameState = "playStage";
      }
      
    }
    else if(gameState === "playStage"){
      
      jungle.visible = true;

      score = score + Math.round(getFrameRate()/60);
      
      startScreen.visible = false;
      startButton.visible = false;
    
      ground.velocityX = -(3 + score/100);
      
        if(keyDown("space") && monkey.y >= 336){
          monkey.velocityY = -15;
        }
    
      spawnFood();
      spawnObstacles();
    
        if(foodsGroup.isTouching(monkey)){
          foodsGroup.destroyEach();
          score += 50;
        }
        if(obstaclesGroup.isTouching(monkey)){
          gameState = "overStage";
        }
    }
    else if(gameState === "overStage"){
      gameOver.visible = true;
      restart.visible = true;
      
      obstaclesGroup.destroyEach();
      foodsGroup.destroyEach();
      
      if(mousePressedOver(restart)){
        gameState = "startStage";
        score = 0;
      }
    }
    
  monkey.velocityY = monkey.velocityY + 0.5;
  
    if(ground.x < 0){
        ground.x = ground.width/2;
    }
    
  monkey.collide(ground);
  
  drawSprites();
  
  if(gameState === "playStage"){
    text("SCORE: " + score,320,30);
  }
  
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var food = createSprite(405,200);
    food.addImage(foodImg);
    food.scale = 0.07;
    
    food.y = random(130,250);
    food.velocityX = random(-5,-3);
    
    foodsGroup.add(food);
    
  }
}
function spawnObstacles(){
  if(frameCount % 70 === 0){
    var obstacle = createSprite(405,200);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;

    obstacle.y = random(130,250);
    obstacle.velocityX = random(-7,-3);
    
    obstaclesGroup.add(obstacle);
  }
}




  
