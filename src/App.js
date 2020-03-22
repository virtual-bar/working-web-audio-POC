import React from "react";
import "./styles/App.scss";
import Controls from "./components/Controls";

const audio = new Audio('/outfoxing.mp3');

function App() {
  return (
    <div className="App">
      <Controls audioElement={audio} />
    </div>
  );
}

export default App;
