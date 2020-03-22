import React from "react";
import "./styles/App.scss";
import Controls from "./components/Controls";

const audio = new Audio('/outfoxing.mp3');

function App() {
  return (
    <div className="App">
      <header className="controls-pane">
        <Controls audioElement={audio} />
      </header>
    </div>
  );
}

export default App;
