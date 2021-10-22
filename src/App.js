import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "./firebase";
import axios from "axios";

function App() {
  React.useEffect(() => {
    // firebase connection example
    (async () => {
      await setDoc(doc(db, "test", "test"), {
        data: "This is a test.",
      });
    })();

    // fastapi example
    (async () => {
      const response = await axios.request({
        method: "GET",
        url: "http://127.0.0.1:8000/ceva",
      });
      console.log(response.data);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
