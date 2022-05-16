//populates array b with values for white square {true/false} and name of squares {a1..a8, ...h8}
function populateWithPositions(arr, game) {
  return arr.slice().flat().reduce((a, v, i) => {
    let next;
    if(a === 0){
      return [{'white': true, 'square': v}];
    }
    else {
      next = !(a[a.length - 1]['white']);
    }
    if(i%8 === 0)
       next = !next;
    return a.concat([{'white': next, 'square': v}]);   
  }, 0).map((v, i) => {
    if(game[i] !== null){
      const piece = (game[i].color === 'b')? game[i].type : game[i].type.toUpperCase();
      return {'white': v.white, 'square': v.square, 'piece': piece};
    }
    else {
      return {'white': v.white, 'square': v.square, 'piece': null};
    }
  });
}

export {populateWithPositions};