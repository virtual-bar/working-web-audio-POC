import React from "react";
import "./styles/App.scss";
import Volume from "./components/Volume";
import Play from "./components/Play";

function App() {
  return (
    <div className="App">
      <header className="Controls">
        <Play />
        <Volume />
      </header>
    </div>
  );
}

export default App;
