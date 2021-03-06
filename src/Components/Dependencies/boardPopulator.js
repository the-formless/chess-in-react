//populates array b with values for white square {true/false} and name of squares {a1..a8, ...h8}

function populateWithPositions(arr, game, activeMoves, currentPlayer) {
  let moves;
  //if there are active current moves(after a player clicks on a piece) stores list of squares to mark green in [moves]
  if(activeMoves)
    moves = activeMoves.map((v) => {
      if(v.length > 2){
          if(v.match(/[a-h][1-8]|O-O-O|O-O/i)[0] === 'O-O-O') //Queen Side castling square
            {
              return (currentPlayer === 'w')? 'c1': 'c8';
            }
          else if(v.match(/[a-h][1-8]|O-O-O|O-O/i)[0] === 'O-O') //King side castling square
            {
              return (currentPlayer === 'w')? 'g1': 'g8';
            }
          return v.match(/[a-h][1-8]|O-O-O|O-O/i)[0];
      }
      return v; 
    });

//  combines all available information and return array of objects with format: 
//  {'white': boolean, 'square': string, 'piece': null/string, 'active': boolean}
//  white for rendering white/black, square for identifying chess squares(a1,b1,c1...h8), 
//  piece for current piece on the square, active for showing active moves based on player choice
  
  return arr.slice().flat().reduce((a, v, i) => {
    let next;
    let active = false;
    if(moves){
      active = (moves.indexOf(v) > -1)? true : false;
    }
    if(a === 0){
      return [{'white': true, 'square': v, 'active': active}];
    }
    else {
      next = !(a[a.length - 1]['white']);
    }
    if(i%8 === 0)
       next = !next;
    return a.concat([{'white': next, 'square': v, 'active': active}]);   
  }, 0)
  .map((v, i) => {
    if(game[i] !== null){
      const piece = (game[i].color === 'b')? game[i].type : game[i].type.toUpperCase();
      return {'white': v.white, 'square': v.square, 'piece': piece, 'active': v.active};
    }
    else {
      return {'white': v.white, 'square': v.square, 'piece': null, 'active': v.active};
    }
  });
}

export {populateWithPositions};
