import React from "react";
import "./styles/App.scss";
import Controles from "./components/Controls";

function App() {
  return (
    <div className="App">
      <header className="controls-pane">
        <Controles />
      </header>
    </div>
  );
}

export default App;
