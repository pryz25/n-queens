/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

window.findNRooksSolution = function(n) {
  var solution = makeEmptyMatrix(n);
  var rowUsed = {};
  var colUsed = {};
  for (var u = 0; u < n; u++) {
    rowUsed[u] = false;
    colUsed[u] = false;
  }
  for (var k = 0; k < n; k++) { // for each row 
    for (var l = 0; l < n; l++) { //for each col
      if (colUsed[l] || rowUsed[k]) { // skip row & column
        continue;
      } else {
        solution[k][l] = 1; // place first rook
        rowUsed[k] = true;
        colUsed[l] = true;
      } 
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var storage = [];
  var findSolution = function(row, index) { // find solution at (x, y)
    var solution = makeEmptyMatrix(n);
    var coords = {};
    var rowUsed = {};
    var colUsed = {};
    for (var u = 0; u < n; u++) {
      rowUsed[u] = false;
      colUsed[u] = false;
    }
    solution[row][index] = 1;
    coords[row + ',' + index] = true; // add coord to obj
    rowUsed[row] = true;
    colUsed[index] = true;
    for (var k = 0; k < n; k++) { // for each row 
      for (var l = 0; l < n; l++) { //for each col
        if (colUsed[l] || rowUsed[k]) { // skip row & column
          continue;
        } else {
          solution[k][l] = 1; // place rook
          rowUsed[k] = true;
          colUsed[l] = true;
          coords[k + ',' + l] = true;// add coord to object
        } 
      }
    }
    if (storage.length === 0) {
      storage.push(coords);
      solutionCount++;
    } else { 
      for (var m = 0; m < storage.length; m++) { // iterate over storage
        var count = 0;
        for (var key in coords) { // for keys in coords
          if (storage[m][key]) { // if key is in obj
            count++;          
          }
        }
        if (count === n) {
          return;
        } 
      }
      storage.push(coords);
      solutionCount++;
    }
  };

  for (var i = 0; i < n; i++) { // create possible solution from 0,0
    for (var j = 0; j < n; j++) { 
      findSolution(i, j);
    }   // if pass then push to solution  
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
