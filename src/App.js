import React from "react";
import "./styles/App.scss";
import Controls from "./components/Controls";

function App() {
  return (
    <div className="App">
      <header className="controls-pane">
        <Controls />
      </header>
    </div>
  );
}

export default App;
