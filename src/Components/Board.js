import Square from "./Square"
import * as getPiece from "./getPieceNames"

//populates array b with values for white square {true/false} and name of squares {a1..a8, ...h8}
function populateWithPositions(arr) {
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
  }, 0);
}

function Board({arr}) {
  let b = populateWithPositions(arr);

  return (
    <div className='chessBoard'>
      {b.map((v, i) => <Square key={i} square={v.square} white={v.white} piece={null}/>)}
    </div>
  )
}

export default Board