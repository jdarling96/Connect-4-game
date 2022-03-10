/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  
let arr = Array(HEIGHT)                                //create new array with 6 empty slots in it 
for(let i = 0; i < HEIGHT; i++){                       // itterate over array increasing the index by 1 until we reach the arr.length
  arr[i] = Array.apply(null, Array(WIDTH))             //arr[i] creates new array and uses apply method to get undefinded and the WIDTH number of subarrays
};
board = arr;                                            //board var = array created above
//console.log(board);
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board')

  // TODO: add comment for this code
  const top = document.createElement("tr");                     
  top.setAttribute("id", "column-top");                        
  top.addEventListener("click", handleClick);                  
   // creating <tr> with id of column top and adding the click listner to it
  for (let x = 0; x < WIDTH; x++) {                           
    let headCell = document.createElement("td");                 
    headCell.setAttribute("id", x);
    // creating a <td> with an id of x... x is the index of the <td>s and the loop is creating 7 of them                                                
    top.append(headCell);
    //appending the 7 <td>'s with the index id of x into the <tr id='column-top'>                                     
  }
  htmlBoard.append(top);
  //appending the  <tr id='column-top'> into the table allready created in html                                        

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {                            
    const row = document.createElement("tr");
    // creating 6 <tr>'s
    for (let x = 0; x < WIDTH; x++) {                           
      const cell = document.createElement("td");
      //creating 7 <td>'s 
      cell.setAttribute("id", `${y}-${x}`);
      //setting recently created <td>'s with and id idex of y from our <tr>'s and x of our <td>'s ---- this `${y}-${x}` is the array of cells                    
      row.append(cell);
      //appending <td>'s into <tr>'s                                         
    }
    htmlBoard.append(row);
    //appending <tr> to the table element in html
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div')
  piece.classList.add('piece')
  piece.classList.add(`p${currPlayer}`)
  
  //get cell with an index id of y-x
  const spot = document.getElementById(`${y}-${x}`)
  //append our piece to that cell
  spot.append(piece);

 
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */
//next we need to update our board withe the player piece
function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  //console.log(x)
  
  // console.log(board[i])
  //console.log(x);
  
  // get next spot in column (if none, ignore click
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
 board[y][x] = currPlayer
 // my understading is x is set to evt.target.id wich gives us a number and y is currently set to 0
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  /*board[x].every((val, x) => {
     val = currPlayer
    if(x === val) return endGame
  }) */
  
  

  for(let i = 0; i < board.length; i++){
    board[i].every((val, x)=> {
      //console.log(board[i])
      val = currPlayer
     if(board[i].every(val) === val) return endGame('tie')
     
    })
  } 

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer++ : currPlayer--;
  //console.log(currPlayer);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
