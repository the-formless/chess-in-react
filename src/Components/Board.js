import Square from "./Square"

function Board({arr}) {
  let b = arr.reduce((a, v, i, curr) => {
    let next = [!a[a.length - 1]]; 
    if((i + 1)%8 === 0)
       next = [!next[0]];
    return a.concat(next);   
  }, [true]).slice(0, 64);

  return (
    <div className='chessBoard'>
      {b.map((v, i) => <Square key={i} name={v} white={v}/>)}
    </div>
  )
}

export default Board