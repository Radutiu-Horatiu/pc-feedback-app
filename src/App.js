import "./App.css";
import React from "react";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "./firebase";
import axios from "axios";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { Route, Switch } from "react-router";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";

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
    <Switch>
      <Route path="/register">
        <RegisterScreen />
      </Route>
      <Route path="/login">
        <LoginScreen />
      </Route>
      <Route path="/">
        <HomeScreen />
      </Route>
    </Switch>
  );
}

export default App;
