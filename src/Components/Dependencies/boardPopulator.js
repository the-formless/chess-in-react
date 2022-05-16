//populates array b with values for white square {true/false} and name of squares {a1..a8, ...h8}
function populateWithPositions(arr, game, activeMoves) {
  let moves;
  if(activeMoves)
    moves = activeMoves.map((v) => {
      if(v.length > 2){
      //refactor this
          console.log(v.match(/[a-h][1-8]|O-O|O-O-O/i));
          return v.match(/[a-h][1-8]|O-O-O|O-O/i)[0];
      }
      return v; 
    })
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
  }, 0).map((v, i) => {
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