// Interface functions
const modId = element => document.getElementById(element)
const modClass = element => document.getElementsByClassName(element)
const create = element => document.createElement(element)
const attr = () => this.setAttribute(attribute, value)


const ROVER_IMG = create("img");
ROVER_IMG.src = "images/rover.png";
const FAILURE_IMG = create("img");
FAILURE_IMG.src = "images/failure.svg";

// Program interface initiation
const prepareLanding = (planet) => {
  if (modId("mars")) {
    modId("mars").setAttribute("id", "marsLanding");
    modId("happy").setAttribute("class", "inactive");

    paintBoard(planet);

    modId("actionButton").style.display = "block";
    modId("actionButton").setAttribute("class", "active missionButton");
  }
};

const toggleButtons = () => {
  modId("actionButton").setAttribute("class", "inactive missionButton");
  modId("runButton").setAttribute("class", "active missionButton");
  modId("runButton").style.display = "block";
}

const placeMarker = (y, x, type) => {
  let id = y + "_" + x;
  let currentCell = document.getElementById(id);
  if (type == "rover")
    currentCell.appendChild(ROVER_IMG).classList.add("roverPresent");
  if (type == "failure")
    currentCell.appendChild(FAILURE_IMG).classList.add("failedAttempt");
}

const paintBoard = (planet) => {
  // <table>, <tbody>, <tr> and <td> shorts
  let tbl = create("table")
  let tblBody = create("tbody")
  let mars = modId("marsLanding");
  let ROCK_IMG = create("img");
  ROCK_IMG.src = "images/rock.svg";
  
  // cells creation
  for (let j = 0; j < planet.board.rows; j++) {
    let row = create("tr")
    for (let i = 0; i < planet.board.cols; i++) {
      let cell = create("td")
      // create element <td> and text node
      // put text node content into <td> element
      // put <td> at end of the table row
      
      //  if it's first line or first cell, we'll show coordinates
      let cellText = document.createTextNode("[ " + j + "," + i + " ]")
      //  otherwise we'll fill it with spaces
      let filler = document.createTextNode(
        "\u{00A0}\u{00A0}\u{00A0}\u{00A0}\u{00A0}\u{00A0}\u{00A0}"
      )

      row.appendChild(cell);
      cell.setAttribute("id", "" + j + "_" + i + "");

      if (i > 0 && j > 0) {
        cell.appendChild(filler);
      } else {
        cell.appendChild(cellText);
      }
      if (planet.board.fields[j][i] === 1) {
        cell.appendChild(ROCK_IMG).classList.add("rock");
      }

    }
    //row added to end of table body
    tblBody.appendChild(row);
  }
  // append the <tbody> inside the <table>
  tbl.appendChild(tblBody);
  // put <table> in the <body>
  mars.appendChild(tbl);
}
