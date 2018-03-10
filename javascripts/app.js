// Rover Object Goes Here
// ======================
var rover = {
  direction: 'N',
  x:0,
  y:0,
  travelLog:["[0,0]"]
}
// =======TURN LEFT===============
function turnLeft(rover){
  console.log('Unit facing '+rover.direction+ '. Turning left.');
  switch(rover.direction){
    case 'N':   return rover.direction='W'
    case 'E':   return rover.direction='N'
    case 'S':   return rover.direction='E'
    case 'W':   return rover.direction='S'
  }
}
//========TURN RIGHT==============
function turnRight(rover){
  console.log('Unit facing '+rover.direction+'. Turning right.');
  switch(rover.direction){
    case 'N':   return rover.direction='E'
    case 'E':   return rover.direction='S'
    case 'S':   return rover.direction='W'
    case 'W':   return rover.direction='N'
  }
}
//===========MOVING===============
function moveForward(rover){
  console.log('Moving...');
  //----CHECKING BOARD LIMITS-----
  function canMove(x,y){
    switch(rover.direction){
    case 'N':   if( y === 0 ){ return false }
                else{ return true } 
    case 'E':   if( x === 9 ){ return false }
                else{ return true }
    case 'S':   if( y === 9 ){ return false }
                else{ return true }
    case 'W':   if( x === 0 ){ return false }
                else{ return true }
    }
  }
  //------COORDINATES CHANGE------
  function positionDelta(direction){
    switch(direction){
      case 'N': return deltaXY=[0,-1]
      case 'E': return deltaXY=[1,0]
      case 'S': return deltaXY=[0,1]
      case 'W': return deltaXY=[-1,0]
    }
  }
  //------RESOLVING MOVEMENT------
  if(canMove(rover.x, rover.y)){
    positionDelta(rover.direction);
    rover.x+=deltaXY[0];
    rover.y+=deltaXY[1];
    console.log("New coordinates: ["+rover.x+","+rover.y+"].");
  }else{
    console.log("You've reached the mission border. Coordinates unchanged:["+rover.x+","+rover.y+"]")
  }
}
//=========ROUTE FUNCTION==========
function missionTrajectory(input){
  var commands=input.split('');
  for(i=0;i<commands.length;i++){
    switch(commands[i]){
      case 'f': moveForward(rover);
                moveLogging(rover);
                break;
      case 'r': turnRight(rover);
                break;
      case 'l': turnLeft(rover);
                break;
      default: console.log("WAT?");
    }
  }
//--------CALLING ROUTE LOG--------
  missionLog(rover);
//-------ADDING LOG ENTRIES--------
  function moveLogging(){
    var coordinates = "["+rover.x+","+rover.y+"]"
    rover.travelLog.push(coordinates)
  }
//-----LOG MESSAGING FUNCTION------
  function missionLog(){
    var visited = rover.travelLog.join(', ');
      console.log("Visited coordinates: "+visited);
  }
}
//=====CALLING ROUTE FUNCTION======
missionTrajectory('rffrfflfrff');
