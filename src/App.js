import "./App.css";
import React from "react";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "./firebase";
import axios from "axios";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import UserProfile from "./screens/UserProfile/UserProfile";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

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
    <Router>
      <Switch>
        <Route path="/user-profile">
          <UserProfile />
        </Route>
        <Route path="/">
          <HomeScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
