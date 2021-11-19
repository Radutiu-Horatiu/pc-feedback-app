import "./App.css";
import React from "react";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "./firebase";
import axios from "axios";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { Route, Switch } from "react-router";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import Navbar from "./screens/HomeScreen/Navbar";
import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FaPlus } from "react-icons/fa";
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
    <Flex h="100vh">
      <Navbar />
      {/* Right content */}
      <Flex flexDir="column" w="100%">
        {/* Buttons */}
        <Flex w="100%" p="2vh">
          <Button w="100%">
            <FaPlus />
            <Text ml="1vh">Request new PEG</Text>
          </Button>
          <Button w="100%" ml="1vh">
            <FaPlus />
            <Text ml="1vh">Request new Feedback</Text>
          </Button>
        </Flex>
        {/* Dynamic content screen */}
        <Flex h="100%" justify="center" align="center">
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
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
