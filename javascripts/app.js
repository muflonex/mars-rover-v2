// Rover constructor function
// ==========================
var Rover = function( direction , x , y ){
  this.direction = direction,
  this.x = x,
  this.y = y,
  this.travelLog = [  "[" + x + "," + y + "]"  ]
}
var rover   =   new Rover( 'N' , 0 , 0 );
var rover2  =   new Rover( 'S' , 3 , 3 );

//    Board preparation
//===========================
function boardFiller( rows , cols ){
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
      result[x].push(getProbable( 0.2 ));
    }
  }
  //table = function result
  return result;
}
//assigning variable to the result
var board = boardFiller( 10 , 10 );
console.log( board );

//        Turn left
//===========================
//  turning a specific rover
function turnLeft( rover ){
  console.log(  'Unit facing '  + rover.direction + '. Turning left.');
  //changing a new direction based on old one
  switch(rover.direction){
    case 'N':   return rover.direction  = 'W'
    case 'E':   return rover.direction  = 'N'
    case 'S':   return rover.direction  = 'E'
    case 'W':   return rover.direction  = 'S'
  }
}

//        Turn Right
//===========================
//  turning a specific rover
function turnRight( rover ){
  console.log('Unit facing '+rover.direction+'. Turning right.');
  //  setting a new direction based on old one
  switch(rover.direction){
    case 'N':   return rover.direction  = 'E'
    case 'E':   return rover.direction  = 'S'
    case 'S':   return rover.direction  = 'W'
    case 'W':   return rover.direction  = 'N'
  }
}

//          Moving
//===========================
// moving a rover forward/backwards
function move( rover, gear ){

//  Checking board limits
//___________________________
  canMove(rover.x, rover.y)

  function canMove(x,y){
      switch(gear){
        case 'f':
          console.log(  'Advancing...'  );
          //Checking current direction
          switch(rover.direction){
            case 'N':   if( board[   x   ] [ y - 1 ] in board ){ return destiny( 0 ,-1 ) } else { return out() }
            case 'E':   if( board[ x + 1 ] [   y   ] in board ){ return destiny( 1 , 0 ) } else { return out() }
            case 'S':   if( board[   x   ] [ y + 1 ] in board ){ return destiny( 0 , 1 ) } else { return out() } 
            case 'W':   if( board[ x - 1 ] [   y   ] in board ){ return destiny(-1 , 0 ) } else { return out() }
          }
        case 'b':
          console.log(  'Reversing...'  );
          switch(rover.direction){
            case 'N':   if( board[   x   ] [ y + 1 ] in board ){ return destiny( 0 , 1 ) } else { return out() }
            case 'E':   if( board[ x - 1 ] [   y   ] in board ){ return destiny(-1 , 0 ) } else { return out() }
            case 'S':   if( board[   x   ] [ y - 1 ] in board ){ return destiny( 0 ,-1 ) } else { return out() }
            case 'W':   if( board[ x + 1 ] [   y   ] in board ){ return destiny( 1 , 0 ) } else { return out() }
        }
        //Checking destination for obstacles (1), borders (undefined), rovers (2)
        function destiny( deltaX , deltaY ){
          switch( board[ x + deltaX ][ y + deltaY ] ){
            case 0:   board[ rover.x][ rover.y ] = 0;
                      rover.x +=  deltaX;
                      rover.y +=  deltaY;
                      //marking the new position as taken. 2 stands for rover
                      board[ rover.x][ rover.y ] = 2;
                      console.log(  "New coordinates: ["  + rover.x + "," + rover.y + "]."  );
                      break;
            case 1:   console.log(  "Obstacle encountered. Coordinates unchanged: ["  + rover.x + "," + rover.y + "]" )
                      break;
            case 'R': console.log(  "Other rover is blocking your way. Coordinates unchanged: ["  + rover.x + "," + rover.y + "]" )
                      break;          
          }
        }
        function out(){
          console.log(  "You've reached the mission border. Coordinates unchanged: ["  + rover.x + "," + rover.y + "]"  )
        } 
      }
    }
  }
//      Route function
//===========================
function missionTrajectory( input ){
  var commands=input.split('');
  for( i=0; i<commands.length; i++ ){
    switch( commands[i] ){
      case 'f': move( rover, 'f' );
                moveLogging( rover );
                break;
      case 'b': move( rover, 'b' );
                moveLogging( rover );
                break;
      case 'r': turnRight( rover );
                break;
      case 'l': turnLeft( rover );
                break;
      default: console.log( "WAT?" );
    }
  }
//    Calling route log
//___________________________
  missionLog( rover );

//    Adding log entry
//___________________________
  function moveLogging(){
    var coordinates = "[" + rover.x + "," + rover.y + "]"
    rover.travelLog.push( coordinates )
  }

//      Log printer
//___________________________
  function missionLog(){
    var visited = rover.travelLog.join(', ');
      console.log( "Visited coordinates: " + visited );
  }
}
//       Route caller
//___________________________
missionTrajectory( 'brffrffrrbbrf' );
