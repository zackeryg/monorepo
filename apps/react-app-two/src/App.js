import "./App.css";
import * as camelify from "@zgriesinger/camelify";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo" alt="logo" style={{ fontSize: "10rem" }}>
          🐫
        </div>
        <h3> Second Demo App Camelifying from a Sub Package </h3>
        <p>Check out the camels below</p>
        <p>{camelify("Edit <code>src/App.js</code> and save to reload.")}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {camelify("Learn React")}
        </a>
      </header>
    </div>
  );
}

export default App;
