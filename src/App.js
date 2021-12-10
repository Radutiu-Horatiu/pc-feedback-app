import "./App.css";
import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { Redirect, Route, Switch, useHistory } from "react-router";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import Navbar from "./screens/HomeScreen/Navbar";
import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FaPlus } from "react-icons/fa";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/user/user-slice";
import RequestPeg from "./screens/RequestPeg/RequestPeg";
import RequestNewFeedback from "./screens/RequestNewFeedback/RequestNewFeedback";
import NewPEG from "./screens/NewPEG";
import UserProfile from "./screens/UserProfile/UserProfile";
import Feedbacks from "./screens/Feedbacks/Feedbacks";
import MyRequests from "./screens/MyRequests/MyRequests";
import LandingPage from "./screens/LandingPage/LandingPage";
import { API } from "./utils/API";
import axios from "axios";
import MyTeamScreen from "./screens/MyTeam/MyTeamScreen";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loggedIn, setloggedIn] = useState(false);
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    if (!user.email.length) setloggedIn(false);
    else setloggedIn(true);
  }, [user]);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        (async () => {
          const response = await axios.request({
            method: "GET",
            url: API.backend + "getUser?id=" + user.uid,
          });
          const myUser = { ...response.data, uid: user.uid };
          if (myUser) dispatch(userActions.setUser(myUser));
        })();
      }
    });
  }, [dispatch]);
  return (
    <Flex h="100vh">
      {loggedIn && <Navbar />}
      {/* Right content */}
      <Flex flexDir="column" w="100%">
        {/* Buttons */}
        {loggedIn && (
          <Flex w="100%" p="2vh">
            <Button w="100%" onClick={() => history.push("/new-peg")}>
              <FaPlus />
              <Text ml="1vh">Request new PEG</Text>
            </Button>
            <Button
              w="100%"
              ml="1vh"
              onClick={() => history.push("/new-feedback")}
            >
              <FaPlus />
              <Text ml="1vh">Request new Feedback</Text>
            </Button>
          </Flex>
        )}
        {/* Dynamic content screen */}
        <Flex h="100%" justify="center" align="center">
          <Switch>
            {loggedIn ? (
              <>
                <Route path="/my-team" exact component={MyTeamScreen} />
                <Route path="/feedbacks" exact component={Feedbacks} />
                <Route path="/my-requests" exact component={MyRequests} />
                <Route path="/peg-requests" exact component={RequestPeg} />
                <Route path="/new-peg" exact component={NewPEG} />
                <Route
                  path="/new-feedback"
                  exact
                  component={RequestNewFeedback}
                />
                <Route path="/my-profile" exact component={UserProfile} />
                <Route path="/" exact component={HomeScreen} />
                {/* <Redirect to="/" /> */}
              </>
            ) : (
              <>
                <Route path="/register" exact component={RegisterScreen} />
                <Route path="/login" exact component={LoginScreen} />
                <Route path="/" exact component={LandingPage} />
                {/* <Redirect to="/" /> */}
              </>
            )}
          </Switch>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
