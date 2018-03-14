
function Mission(mapSize, mapRockiness, rovers, turns ) {
  this.mapSize = mapSize,
  this.mapRockiness  = mapRockiness,
  this.rovers = [],
  this.turns = turns;
}

// This creates a new object
var planetMars = new Mission(10, 0.2, 2, 10);
var planetMars = { board: function( mapRockiness, rows , cols ){
    //assigning variable to the result
  var result = [];
  //randomizing between 0-1 on variable probability (0 - clear terrain, 1 - obstacle)
  function getProbable( prob ){
    var num=Math.random();
    if( num<=prob ){ return 1 }
    else { return 0 }
  }
  //creating table
  for( x=0; x<rows; x++ ){
    result.push( [] );
    for( y=0; y<cols; y++){
      result[x].push(getProbable( mapRockiness ));
    }
  }
  //table = function result
  return result;
}
}
planetMars.board ( this.mapRockiness , this.mapSize, this.mapSize )
console.log(planetMars.board);

var Rover = function( direction , id , x , y, orders, travelLog ){
  this.id = id,
  this.direction = direction,
  this.x = x,
  this.y = y,
  this.orders = orders.split(''),
  this.turnsTaken = 0,
  this.travelLog = travelLog,
  Mission.prototype.board[y][x] = 2;
};

var rover1 = new Rover('N', 1, 0, 0, 'ffblfrbrff', ['[0,0]']);
planetMars.rovers.push(rover1);
var rover2 = new Rover('S', 2, 2, 2, 'bbrrfflffr', ['[2,2]']);
planetMars.rovers.push(rover2);

//        Turn left
//===========================
//  turning a specific rover
function turnLeft( rover ){
  console.log(  '[ '  + rover.id + ' ] : Unit facing '  + rover.direction + '. Turning left.');
  //changing a new direction based on old one
  switch(rover.direction){
    case 'N':   return rover.direction  = 'W';
    case 'E':   return rover.direction  = 'N';
    case 'S':   return rover.direction  = 'E';
    case 'W':   return rover.direction  = 'S';
  }
}

//        Turn Right
//===========================
//  turning a specific rover
function turnRight( rover ){
  console.log(  '[ '  + rover.id + ' ] : Unit facing ' + rover.direction + '. Turning right.');
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
        console.log(  '[ '  + rover.id + ' ] : Advancing...'  );
        //Checking current direction
        switch(rover.direction){
          case 'N':   if( board[ y - 1 ] [   x   ] in board ){ return destiny(-1 , 0 ) } else { return out() }
          case 'E':   if( board[   y   ] [ x + 1 ] in board ){ return destiny( 0 , 1 ) } else { return out() }
          case 'S':   if( board[ y + 1 ] [   x   ] in board ){ return destiny( 1 , 0 ) } else { return out() } 
          case 'W':   if( board[   y   ] [ x - 1 ] in board ){ return destiny( 0 ,-1 ) } else { return out() }
        }
      case 'b':
        console.log(  '[ '  + rover.id + ' ] : Reversing...'  );
        switch(rover.direction){
          case 'N':   if( board[ y + 1 ] [   x   ] in board ){ return destiny( 1 , 0 ) } else { return out() }
          case 'E':   if( board[   y   ] [ x - 1 ] in board ){ return destiny( 0 ,-1 ) } else { return out() }
          case 'S':   if( board[ y - 1 ] [   x   ] in board ){ return destiny(-1 , 0 ) } else { return out() }
          case 'W':   if( board[   y   ] [ x + 1 ] in board ){ return destiny( 0 , 1 ) } else { return out() }
      }
      //Checking destination for obstacles (1), borders (undefined), rovers (2)
      function destiny( deltaY , deltaX ){
        switch( board[ y + deltaY ][ x + deltaX ] ){
          case 0:   board[ rover.y][ rover.x ] = 0;
                    rover.x +=  deltaX;
                    rover.y +=  deltaY;
                    //marking the new position as taken. 2 stands for rover
                    board[ rover.y][ rover.x ] = 2;
                    console.log(  '[ '  + rover.id + ' ] : New coordinates - [ x:'  + rover.x + ', y:' + rover.y + ' ].'  );
                    moveLogging( rover , '[' + rover.x + ',' + rover.y + ']');
                    break;
          case 1:   console.log(  '[ '  + rover.id + ' ] : Obstacle encountered. Coordinates unchanged - [ x:'  + rover.x + ', y:' + rover.y + ' ]' )
                    break;
          case 2: console.log(  '[ '  + rover.id + ' ] : Other rover is blocking your way. Coordinates unchanged - [ x:'  + rover.x + ', y:' + rover.y + ' ]' )
                    break;          
        }
      //    Adding log entry
      //___________________________
        function moveLogging( rover, coordinates ){
          rover.travelLog.push( coordinates );
          function unique(){
            return this.filter(function (value, index, self){
              return self.indexOf(value) === index;
            });
          }
          rover.travelLog.unique();
          rover.travelLog.sort();
        }  
      }
      function out(){
        console.log(  '[ '  + rover.id + ' ] : You\'ve reached the mission border. Coordinates unchanged - [ x:'  + rover.x + ', y:' + rover.y + ' ]'  )
      }
    } 
  }

}
//      Route function
//===========================
function missionTrajectory( rover , input ){
  switch( input[i] ){
    case 'f': move( rover, 'f' ); 
              break;             
    case 'b': move( rover, 'b' );
              break; 
    case 'r': turnRight( rover );
              break;
    case 'l': turnLeft( rover );
              break;
    default: console.log( "WAT?" );
  }
}

for (var t = 0; t < planetMars.turns; t++){
  for (var i = 0; i < planetMars.rovers.length; i++) {
    while (planetMars.rovers[i].turnsTaken < planetMars.rovers[i].orders.length){
      //       Route caller
      //___________________________
        missionTrajectory( planetMars.rovers[i] , planetMars.rovers[i].orders );
      //    Calling route log
      //___________________________
        missionLog( planetMars.rovers[i] );
    }
  }
}
console.log(rover1);
console.log(planetMars);
