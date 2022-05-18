
function Button({text,link, onClick}) {
  return (
    <div>
      <a href={link}><button className="btn" onClick={() => onClick(text)}>{text}</button>
      </a>
    </div>
  )
}

export default Button