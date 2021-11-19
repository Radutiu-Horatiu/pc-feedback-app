import "./App.css";
import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { Route, Switch } from "react-router";
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

function App() {
	const dispatch = useDispatch();
	const [loggedIn, setloggedIn] = useState(false);
	const user = useSelector((state) => state.user);

	React.useEffect(() => {
    if (!user.email.length)
			setloggedIn(false);
		else
    	setloggedIn(true);
  }, [user]);

	React.useEffect(() => {
		// fastapi example
		// (async () => {
		//   const response = await axios.request({
		//     method: "GET",
		//     url: "http://127.0.0.1:8000/ceva",
		//   });
		//   console.log(response.data);
		// })();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(userActions.setEmail({ email: user.email }));
			}
		});
	}, []);
	return (
		<Flex h="100vh">
			{loggedIn && <Navbar />}
			{/* Right content */}
			<Flex flexDir="column" w="100%">
				{/* Buttons */}
				{loggedIn && <Flex w="100%" p="2vh">
					<Button w="100%">
						<FaPlus />
						<Text ml="1vh">Request new PEG</Text>
					</Button>
					<Button w="100%" ml="1vh">
						<FaPlus />
						<Text ml="1vh">Request new Feedback</Text>
					</Button>
				</Flex>}
				{/* Dynamic content screen */}
				<Flex h="100%" justify="center" align="center">
					<Switch>
						<Route path="/peg-request">
							<RequestPeg />
						</Route>
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
