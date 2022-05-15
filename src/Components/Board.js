import Square from "./Square"

function Board({arr}) {
  //populates array b with values for white square {true/false}
  const aCopy = arr.slice().flat();
  //console.log(a);
  let b = aCopy.reduce((a, v, i, curr) => {
    let next;
    if(a === 0){
      return [{'white': true, 'x':v.x, 'y':v.y}];
    }
    else {
      next = !(a[a.length - 1]['white']);
    }
    if(i%8 === 0)
       next = !next;
    return a.concat([{'white': next, 'x':v.x, 'y':v.y}]);   
  }, 0);

  return (
    <div className='chessBoard'>
      {b.map((v, i) => <Square key={i} x={v.x} y={v.y} white={v.white}/>)}
    </div>
  )
}

export default Board