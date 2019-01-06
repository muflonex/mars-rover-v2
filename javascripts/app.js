// Interface functions
function modId(element){
  return document.getElementById(element);
}
function modClass(element){
  return document.getElementsByClassName(element);
}
// Program interface initiation 
function prepareLanding (){
  if(document.getElementById("mars")){
    var modMars = document.getElementById("mars");
    var modHappy = document.getElementById("happy");
    modMars.setAttribute("id", "marsLanding");
    modId("happy").setAttribute("class", "inactive");
    Mars.board = boardFiller( 0.2, 10, 10 );
    paintBoard();
    modId("actionButton").style.display = "block";
    modId("actionButton").setAttribute("class", "active missionButton")
  }
}
function paintBoard(){
  // parent element short
  var mars = document.getElementById("marsLanding");
  // <table> and <tbody> shorts
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");
  // cells creation
  for (var j = 0; j < Mars.board.length; j++) {
    // table row short
    var row = document.createElement("tr");
    for (var i = 0; i < Mars.board.length; i++) {
      // create element <td> and text node 
      //Make text node the contents of <td> element
      // put <td> at end of the table row              
      var cell = document.createElement("td");    
      var cellText = document.createTextNode("[ " + j + "," + i + " ]"); 
      var filler = document.createTextNode("\u{00A0}\u{00A0}\u{00A0}\u{00A0}\u{00A0}\u{00A0}\u{00A0}");
      var rock = document.createElement("img");
      rock.src = "images/rock.svg";
      row.appendChild(cell);
      cell.setAttribute("id", ""+j+"_"+i+"");
      
      if(i > 0 && j > 0){cell.appendChild(filler)}else{
        cell.appendChild(cellText)};
        if(Mars.board[j][i] === 1){
          cell.appendChild(rock).classList.add("rock");
        }
      }
      //row added to end of table body
      tblBody.appendChild(row);
    }
  // append the <tbody> inside the <table>
  tbl.appendChild(tblBody);
  // put <table> in the <body>
  mars.appendChild(tbl);
  // tbl border attribute to 
}
function beginMission(){
  Mars.sendRover('rover1', 'N', 1, 0, 'brffrffrrbbrf');
  Mars.sendRover('rover2', 'S', 2, 3, 'rrfflffrffrbb');
  Mars.sendRover('rover3', 'E', 7, 9, 'lfflffrbrblfff');

  Mars.forEachRover(Mars.landRovers);
  Mars.rovers = Mars.rovers.filter(function( currentRover ) {
    return Mars.board[ currentRover.y ][ currentRover.x ] !== 1            
  });
  console.log("Remaining rovers:")
  console.log( Mars.rovers )
  modId("actionButton").setAttribute("class", "inactive missionButton")
  modId("runButton").setAttribute("class", "active missionButton")
  modId("runButton").style.display = "block";
}
// Rover constructor function
function Rover( name, direction , x , y, commands ){
  this.name = name,
  this.direction = direction,
  this.x = x,
  this.y = y,
  this.commands = commands.split(''),
  this.travelLog = [  "[" + x + "," + y + "]"  ]
  //  Turning rover left
  this.turnLeft = function( ){
    console.log('[' + this.name + '] : Unit facing '  + this.direction + '. Turning left.');
    //changing a new direction based on old one
    switch( this.direction ){
      case 'N':   this.direction  = 'W'
                  console.log(this.direction)
                  break;
      case 'E':   this.direction  = 'N'
                  console.log(this.direction)
                  break;
      case 'S':   this.direction  = 'E'
                  console.log(this.direction)
                  break;
      case 'W':   this.direction  = 'S'
                  console.log(this.direction)
                  break;
    }
  },
  // Turning rover right
  this.turnRight = function( ){
  console.log('[' + this.name + '] : Unit facing ' + this.direction + '. Turning right.');
    //  setting a new direction based on old one
    switch( this.direction ){
      case 'N':   this.direction  = 'E'
                  console.log(this.direction)
                  break;
      case 'E':   this.direction  = 'S'
                  console.log(this.direction)
                  break;
      case 'S':   this.direction  = 'W'
                  console.log(this.direction)
                  break;
      case 'W':   this.direction  = 'N'
                  console.log(this.direction)
                  break;
    }
  },
  this.moveLogging = function( ){
    var coordinates = '[' + this.x + ',' + this.y + ']'
    this.travelLog.push( coordinates )
  },
  // Moving a rover forward/backwards
  this.move = function( gear ){
    this.destiny = function( deltaX , deltaY ){
      switch( Mars.board[ this.y + deltaY ][ this.x + deltaX ] ){
        case 0:   //marking old position as free
                  console.log(Mars.board[ this.y + deltaY ][ this.x + deltaX ] )
                  Mars.board[ this.y][ this.x ] = 0;
                  this.x +=  deltaX;
                  this.y +=  deltaY;
                  //marking the new position as taken. 2 stands for rover
                  Mars.board[ this.y][ this.x ] = 2;
                  console.log('[' + this.name + '] : New coordinates: ['  + this.x + ',' + this.y + '].'  );
                  break;
        case 1:   console.log(Mars.board[ this.y + deltaY ][ this.x + deltaX ] )
                  console.log('[' + this.name + '] : Obstacle encountered. Coordinates unchanged: ['  + this.x + ',' + this.y + ']' )
                  break;
        case 2:   console.log(Mars.board[ this.y + deltaY ][ this.x + deltaX ] )
                  console.log('[' + this.name + '] : Other rover is blocking your way. Coordinates unchanged: ['  + this.x + ',' + this.y + ']' )
                  break;          
      }
    }
    this.out = function(){
      console.log('[' + this.name + '] : You\'ve reached the mission border. Coordinates unchanged: ['  + this.x + ',' + this.y + ']'  )
    } 
    //  Checking board limits_________________________
    this.canMove = function( x , y ){
      switch( gear ){
        case 'f':
          console.log('[' + this.name + '] : Advancing...'  );
          //Checking current direction
          switch(this.direction){
            case 'N':   if( Mars.board[   x   ] [ y - 1 ] in Mars.board ){ return this.destiny( 0 ,-1 ) } else { return this.out() }
            case 'E':   if( Mars.board[ x + 1 ] [   y   ] in Mars.board ){ return this.destiny( 1 , 0 ) } else { return this.out() }
            case 'S':   if( Mars.board[   x   ] [ y + 1 ] in Mars.board ){ return this.destiny( 0 , 1 ) } else { return this.out() } 
            case 'W':   if( Mars.board[ x - 1 ] [   y   ] in Mars.board ){ return this.destiny(-1 , 0 ) } else { return this.out() }
          }
        case 'b':
          console.log('[' + this.name + '] : Reversing...'  );
          switch(this.direction){
            case 'N':   if( Mars.board[   x   ] [ y + 1 ] in Mars.board ){ return this.destiny( 0 , 1 ) } else { return this.out() }
            case 'E':   if( Mars.board[ x - 1 ] [   y   ] in Mars.board ){ return this.destiny(-1 , 0 ) } else { return this.out() }
            case 'S':   if( Mars.board[   x   ] [ y - 1 ] in Mars.board ){ return this.destiny( 0 ,-1 ) } else { return this.out() }
            case 'W':   if( Mars.board[ x + 1 ] [   y   ] in Mars.board ){ return this.destiny( 1 , 0 ) } else { return this.out() }
        }
        //Checking destination for obstacles (1), borders (undefined), rovers (2)
        
      }
    }
    this.canMove( this.x , this.y )
  }
}
// Board preparation
function boardFiller( rockiness, rows , cols ){
  //assigning variable to the result
  var result = [];
  //randomizing between 0-1 on variable probability
  function getProbable( prob ){
    var num=Math.random();
    if( num<=prob ){ return 1 }
    else { return 0 }
  }
  //creating table
  for( x=0; x<rows; x++ ){
    result.push( [] );
    for( y=0; y<cols; y++){
      result[x].push(getProbable( rockiness ));
    }
  }
  console.log(result);
  return result;
}
// Mars object to hold relevant invoking functions
Mars = {
  // Array to store Mars coordinates board
  board: [],
  // Array to keep Rover instances
  rovers: [],
  // forEach abstract function to invoke functions for Rover instances
  forEachRover: function (action) {
    for (var i = 0; i < this.rovers.length; i++){
      action.call(this.rovers[i]);
    }
  }, 
  // Rover constructor invocation in Mars scope
  sendRover: function () {
    var newRover = {};
    Rover.apply(newRover, arguments);
    this.rovers.push(newRover); 
    return newRover;
  },
  // Comparing initial coordinates with the board
  landRovers: function() { 
    var identificator = this.y + '_' + this.x
    var currentCell = document.getElementById(identificator);
    if(Mars.board[ this.y ][ this.x ] === 0){
        Mars.board[ this.y ][ this.x ] = 2
        var rover = document.createElement( 'img' )
        rover.src = 'images/rover.png'
        currentCell.appendChild( rover ).classList.add( 'roverPresent' )
        console.log(this.name + ' is at coordinates ' + this.travelLog);
    }else{
      index = Mars.rovers.indexOf( this )
      var failure = document.createElement( 'img' )
      failure.src = 'images/failure.svg'
      currentCell.appendChild( failure ).classList.add( 'failedAttempt' )
    }
  },
  // Rover commands chain execution
  missionTrajectory: function(){   
    for(i=0; i< this.commands.length; i++){
      switch( this.commands[i] ){
        case 'f': this.move( 'f' );
                  this.moveLogging( );
                  break;
        case 'b': this.move( 'b' );
                  this.moveLogging( );
                  break;
        case 'r': this.turnRight( );
                  break;
        case 'l': this.turnLeft( );
                  break;
        default: console.log( 'WAT?' );
      }
    }
  }
};




//    Calling route log
//___________________________


//    Adding log entry


//      Log printer
//___________________________

//       Route caller
//___________________________
//function missionCommand( missionAssets ){
//  
//  for( i=0; i < missionAssets.length; i++ ){
//    missionTrajectory( missionAssets[i] );
//  }
//  missionAssets.forEach( function ( rover ){
//    var visited = rover.travelLog.join(', ');
//    console.log( rover );
//  } );
//}
//missionCommand( Mars.rovers );
