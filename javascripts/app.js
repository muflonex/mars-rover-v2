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
//      Board printer        
//===========================

function tableCreate() {
  //body reference 
  var body = document.getElementsByTagName("body")[0];

  // create elements <table> and a <tbody>
  var tbl     = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // cells creation
  for (var j = 0; j <= 2; j++) {
      // table row creation
      var row = document.createElement("tr");

      for (var i = 0; i < 2; i++) {
          // create element <td> and text node 
          //Make text node the contents of <td> element
          // put <td> at end of the table row
       var cell = document.createElement("td");    
            var cellText = document.createTextNode("cell is row "+j+", column "+i); 

          cell.appendChild(cellText);
          row.appendChild(cell);
      }

      //row added to end of table body
      tblBody.appendChild(row);
  }

  // append the <tbody> inside the <table>
  tbl.appendChild(tblBody);
  // put <table> in the <body>
  body.appendChild(tbl);
  // tbl border attribute to 
  tbl.setAttribute("border", "2");
}
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

  function canMove(x,y){
    var result;
    switch(gear){
      case 'f':
        console.log(  'Advancing...'  );
        switch(rover.direction){
          case 'N':   if( y === 0 ){ return result = 0 }
                      else if( board[rover.x][rover.y-1] === 1){ return result = 2}
                      else{ return result = 1 }

          case 'E':   if( x === board[0].length ){ return result = 0 }
                      else if( board[rover.x+1][rover.y] === 1){ return result = 2}
                      else{ return result = 1 }

          case 'S':   if( y === board.length ){ return result = 0 }
                      else if( board[rover.x][rover.y+1] === 1){ return result = 2}
                      else{ return result = 1 }

          case 'W':   if( x === 0 ){ return result = 0 }
                      else if( board[rover.x-1][rover.y] === 1){ return result = 2}
                      else{ return result = 1 }
        }
      case 'b':
        console.log(  'Reversing...'  );
        switch(rover.direction){
          case 'N':   if( y === board.length ){ return result = 0 }
                      if( board[rover.x][rover.y+1] === 1){ return result = 2}
                      else{ return result = 1 } 
          case 'E':   if( x === 0 ){ return result = 0 }
                      if( board[rover.x-1][rover.y] === 1){ return result = 2}
                      else{ return result = 1 }
          case 'S':   if( y === 0 ){ return result = 0 }
                      if( board[rover.x][rover.y-1] === 1){ return result = 2}
                      else{ return result = 1 }
          case 'W':   if( x === board[0].length ){ return result = 0 }
                      if( board[rover.x+1][rover.y] === 1){ return result = 2}
                      else{ return result = 1 }
      }
    }
  }
//    Coordinates change
//___________________________
  function positionDelta( direction ){
    switch( gear ){
      case 'f':
        switch( direction ){
          case 'N': return deltaXY=[ 0 ,-1 ]
          case 'E': return deltaXY=[ 1 , 0 ]
          case 'S': return deltaXY=[ 0 , 1 ]
          case 'W': return deltaXY=[-1 , 0 ]
        }
      case 'b':
        switch( direction ){
          case 'N': return deltaXY=[ 0 , 1 ]
          case 'E': return deltaXY=[-1 , 0 ]
          case 'S': return deltaXY=[ 0 ,-1 ]
          case 'W': return deltaXY=[ 1 , 0 ]
        }
    }
  }
//    Resolving movement
//___________________________
  switch( canMove( rover.x , rover.y )  ){
    case 1:
      positionDelta( rover.direction );
      //leaving space empty. We know it's 0 because rover was able to enter
      board[ rover.x][ rover.y ] = 0;
      rover.x+=deltaXY[ 0 ];
      rover.y+=deltaXY[ 1 ];
      //marking the new position as taken. 3 stands for rover
      board[ rover.x][ rover.y ] = 3;
      console.log(  "New coordinates: ["  + rover.x + "," + rover.y + "]."  );
      break;
    case 0:
      console.log(  "You've reached the mission border. Coordinates unchanged: ["  + rover.x + "," + rover.y + "]"  )
      break;
    case 2:
      console.log(  "Obstacle encountered. Coordinates unchanged: ["  + rover.x + "," + rover.y + "]" )
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
missionTrajectory( 'bbrbfflbbrfrfrb' );
