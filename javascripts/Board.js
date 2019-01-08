class Board {
  constructor(rockiness, rows, cols){
    this.rows = rows
    this.cols = cols
    this.fields = this.boardFiller(rockiness, rows, cols)
  }

  // Board preparation
  boardFiller(rockiness, rows, cols){
    //assigning variable to the result
    let board = [];
    
    //creating table
    for (let x = 0; x < rows; x++) {
      board.push([]);
      for (let y = 0; y < cols; y++) {
        board[x].push(this.putRock(rockiness));
      }
    }
    console.log(board);
    return board;
  }
  //randomizing between 0-1 on variable probability
  putRock(chanceHasRock) {
    let fieldRandomizer = Math.random();
    return (fieldRandomizer <= chanceHasRock) ? 1 : 0
  }
}
