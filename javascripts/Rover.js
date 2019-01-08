/*
  Definición de la clase
  
  PROPIEDADES:
    direction - el rumbo hacia donde mira el robot
    y - coordenada de la linea
    x - coordenada de la columna
    travelLog - aquí el robot guarda las coordenadas visitadas en un array

  MÉTODOS:
    turn - cambiar la dirección hacia donde mira el robot
    moveForward - mover en dirección hacia donde miraba el robot
    canMove - comprobar si el movimiento del robot cabe dentro del área de la misión
    positionDelta - medida del cambio de coordenadas
    executeCommands - ejecutar comandos que se ha metido en el robot al crearlo
    moveLogging - añadir nuevas coordenadas visitadas al travelLog
*/

class Rover {
  constructor(name, planet, direction, y, x){
    this.planet = planet
    this.name = name
    this.direction = direction
    this.y = y
    this.x = x
    this.travelLog = [ `[${this.y},${this.x}]`]
    this.commands = ""
  }

  turn(side) {
    const directions = ['N','E','S','W']
    const lastItem = directions[directions.length-1]
    const firstItem = directions[0]

    console.log(`Unit facing ${this.direction}`)
    //  Comprobamos hacia donde se realiza el giro
    if(side === "L"){
      console.log(`Unit turning left`)
      this.direction = directions[directions.indexOf(this.direction)-1] || lastItem;  // En el caso que no exista ese indice saltamos al último índice
    } else if (side === "R"){
      console.log(`Unit turning right`)
      this.direction = directions[directions.indexOf(this.direction)+1] || firstItem; // En el caso que no exista ese indice saltamos al primer índice
    }
    console.log(`Unit now facing ${this.direction}`)
  }

  moveForward(){
    //  Al iniciar, el cambio de la posición se declara como nulo
    let deltaYX=[0,0];

    //  Se comprueba si el robot puede moverse
    if(this.canMove() === true){
      console.log(`Unit moving...`);
      //------CAMBIO DE COORDENADAS------
      //  Definimos el valor con cual se cambia
      deltaYX = this.positionDelta();
      this.y += deltaYX[0];
      this.x += deltaYX[1];
      console.log(`New coordinates: [${this.y},${this.x}].`);
    } else {
      console.log(`You've reached the mission area's border. Coordinates unchanged: ([${this.y},${this.x}])`);
    }
  }

  canMove(){
      //----COMPROBANDO LÍMITES DEL TABLERO-----
    switch(this.direction){
      case 'N':   return this.y === 0 ? false : true;
      case 'E':   return this.x === planet.board.rows ? false : true;
      case 'S':   return this.y === planet.board.cols ? false : true;
      case 'W':   return this.x === 0 ? false : true;
      }
  }

  positionDelta(){
    //----DEFINIENDO VALOR DE CAMBIO DE COORDENADAS-----
    switch(this.direction){
      case 'N':   return [-1,0]
      case 'E':   return [0,1]
      case 'S':   return [1,0]
      case 'W':   return [0,-1]
    }
  }

  executeCommands(){
    let input = this.commands.toLowerCase().split('');
    for(let i=0; i<input.length; i++){
      switch(input[i]){
        case 'f': this.moveForward();
                  this.moveLogging();
                  break;
        case 'r': this.turn('R');
                  break;
        case 'l': this.turn('L');
                  break;
        default: console.log("COMMAND ERROR");
      }
    }
  }

  moveLogging(){
    let newCoordinates = `[${this.y},${this.x}]`;
    this.travelLog.push(newCoordinates);
  }

  printRoute(){
    let visited = this.travelLog.join(`,`);
    console.log(`Coordinates visited: ${visited}`)
  }
}