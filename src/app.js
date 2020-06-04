
function DrumPad({ txt, id , currentKey, cb, onClick, color}) {
  const [CurrentKey, setCurrentKey] = React.useState("");
  const ref = React.useRef();
  const drumref = React.useRef();
    const { current } = ref;
      if (currentKey.toLowerCase() === txt.toLowerCase()) {
        current.play();
        current.parentNode.classList.add('transformTwo')
        cb(txt)
      }

  return (
    <div className="drum-pad" ref={drumref} id={id} onClick={onClick} style={{ color }}>
      {txt}
      <audio
        className="clip"
        id={txt}
        ref={ref}
        src={`./assets/audios/${txt}.mp3`}
      >
        {" "}
      </audio>
    </div>
  );
}

function DisplayComponent({ txtToDisplay }) {
return <div id="display">{txtToDisplay}</div>
}

function DrumMachine() {
  const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

  const [CurrentKey, setCurrentKey] = React.useState("");
  const [Display, setDisplay] = React.useState('')
  const [color, setColor] = React.useState("");
  const colors = ['red', 'black', 'blue', 'magenta', 'purple', 'yellow', 'coral', '#09fdd4', 'rgba(255, 0, 0, 0.7)']
  const random = Math.round(Math.random() * 8)
  console.log(color)

  const cb = key => {
    console.log(key)
        setDisplay(key)
  }

  const onClick = (e) => {
    setColor(colors[random])
    setCurrentKey(e.target.id)
  };

  React.useEffect(() => {

    document.addEventListener('keyup', (e) => {
        setCurrentKey(e.key)
        setColor(colors[random])
    });
  }, []);

  return (
    <div id="drum-machine">
      <div className="contenedor">
        {keys.map((key, i) => (
          <DrumPad id={key} cb={cb} key={i} currentKey={CurrentKey} txt={key} onClick={onClick} color={color}/>
        ))}
      </div>
        <DisplayComponent txtToDisplay={Display}/>
    </div>
  );
}


function App() {
  const Context = React.createContext();

  return (
    <div className="container">
      <DrumMachine />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
