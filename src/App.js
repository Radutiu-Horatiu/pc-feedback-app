import "./App.css";
import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { Route, Switch, useHistory } from "react-router";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import Navbar from "./screens/HomeScreen/Navbar";
import { Flex, Text, Heading } from "@chakra-ui/layout";
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
import Lottie from "react-lottie";
import lottieLoadingAnimationData from "./assets/loading_lottie.json";
import ResetPassword from "./screens/ResetPassword/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loggedIn, setloggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const completedProfile = useSelector((state) => state.user.completedProfile);

  React.useEffect(() => {
    if (user.email.length) setloggedIn(true);
    else setloggedIn(false);
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
          if (myUser) {
            dispatch(userActions.setUser(myUser));
            if (!myUser.completedProfile) history.replace("/my-profile");
          }
        })();
      }
      setLoading(false);
    });
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Flex
          w={"100vw"}
          h={"100vh"}
          justify={"center"}
          align={"center"}
          flexDir={"column"}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: lottieLoadingAnimationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            isClickToPauseDisabled
            height={400}
            width={400}
          />
          <Heading>Loading...</Heading>
        </Flex>
      ) : (
        <Flex h="100vh">
          {loggedIn && <Navbar />}
          {/* Right content */}
          <Flex flexDir="column" w="100%">
            {/* Buttons */}
            {loggedIn && completedProfile && (
              <>
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
              </>
            )}
            {/* Dynamic content screen */}
            <Flex h="100%" justify="center" align="center">
              <Switch>
                {loggedIn ? (
                  !completedProfile ? (
                    <Route path="/my-profile" exact component={UserProfile} />
                  ) : (
                    <>
                      <Route path="/my-team" exact component={MyTeamScreen} />
                      <Route path="/feedbacks" exact component={Feedbacks} />
                      <Route path="/my-requests" exact component={MyRequests} />
                      <Route
                        path="/peg-requests"
                        exact
                        component={RequestPeg}
                      />
                      <Route path="/new-peg" exact component={NewPEG} />
                      <Route
                        path="/new-feedback"
                        exact
                        component={RequestNewFeedback}
                      />
                      <Route path="/my-profile" exact component={UserProfile} />
                      <Route path="/" exact component={HomeScreen} />
                    </>
                  )
                ) : (
                  <>
                    <Route path="/register" exact component={RegisterScreen} />
                    <Route path="/login" exact component={LoginScreen} />
                    <Route
                      path="/reset-password"
                      exact
                      component={ResetPassword}
                    />
                    <Route path="/" exact component={LandingPage} />
                  </>
                )}
              </Switch>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default App;
