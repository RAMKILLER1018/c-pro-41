class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage(car1img);
    car2.addImage(car2Img);
    car3.addImage(car3Img);
    car4.addImage(car4Img);
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarEnd();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(ground);
      image(track1I,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("yellow");
          ellipse(x,y+55,30,30);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance>=3745){
      gameState = 2;
      player.rank = player.rank+1
      Player.updateCarsEnd(player.rank);
    }
    drawSprites();
  }
  end(){
    Player.getPlayerInfo();
    //console.log("u Won");
    //console.log(player.rank);

    for(var plr in allPlayers){
      if(allPlayers[plr].rank===1){
        text('1st:'+allPlayers[plr].name,displayWidth/2 - 40,0 );
      }
      else if(allPlayers[plr].rank===2){
        text('2nd:'+allPlayers[plr].name,displayWidth/2 - 40,50 );
      }
      else if(allPlayers[plr].rank===3){
        text('3rd:'+allPlayers[plr].name,displayWidth/2 - 40,100 );
      }
      else{
        text('4th:'+allPlayers[plr].name,displayWidth/2 - 40,150 );
      }
    }
  }
}
