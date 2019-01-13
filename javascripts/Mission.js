class Mission {
  constructor(planet){
    this.planet = planet
  }
  begin(){
    this.sendRover("rover1", "N", 1, 0);
    this.sendRover("rover2", "S", 2, 3);
    this.sendRover("rover3", "E", 7, 9);

    this.planet.rovers.forEach(rover => this.land(rover))

    if(planet.rovers.length != 0){
      console.log("Landing successful!")
      console.log("Remaining rovers:");
      console.log(this.planet.rovers);
      //DOM Interaction
      toggleButtons()

      this.planet.rovers.forEach(rover => this.assignCommands(rover))
    } else {
      console.log("Landing procedure critical failure!\nNo rovers remaining.")
    }
  }
  scanDestination(){
    let rockiness = parseFloat(prompt("Select probability of rock presence on fields (fraction, i.e. 0.3)"))
    let size = parseInt(prompt("Selec size of the planet (2-10)"))
    this.planet.board = new Board(rockiness, size, size)
  }
  // Rover constructor invocation in planet instance scope
  sendRover(name, direction, y, x, commands) {
    let newRover = new Rover(name, this.planet, direction, y, x)
    this.planet.rovers.push(newRover); 
    return newRover;
  }
  // Comparing initial coordinates with the board
  land(rover) { 
    if(this.planet.board.fields[ rover.y ][ rover.x ] === 0){
      //Where 2 = containing a rover
      this.planet.board.fields[ rover.y ][ rover.x ] = 2
      console.log(`${rover.name} is at coordinates ${rover.travelLog[0]}`);
      placeMarker(rover.y, rover.x, "rover")
    }else{
      this.planet.rovers.filter(element => element != rover)
      placeMarker(rover.y, rover.x, "failure")
    }
  }

  assignCommands(rover){
    let commandLine = prompt("Enter instructions.\nf=forward\nl=left\nr=right\nb=back")
    rover.commands = commandLine
  }

}

//Commands
//"brffrffrrbbrf"
//"rrfflffrffrbb"
//"lfflffrbrblfff"