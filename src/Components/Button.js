
function Button({text, onClick}) {
  return (
    <div>
      <button className="btn" onClick={() => onClick(text)}>{text}</button>
    </div>
  )
}

export default Button