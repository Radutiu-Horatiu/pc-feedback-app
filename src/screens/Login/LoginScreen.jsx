import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";

import React, { useState } from "react";
import { FormControl, FormLabel, Input, Grid, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user-slice";

export default function LoginScreen() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const userEmail = useSelector((state) => state.user.email);
	const login = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				dispatch(userActions.setEmail({ email: userCredentials.user.email }));
			})
			.catch((e) => {
				console.log(e);
			});
	};
	const register = (email, pass) => {
		createUserWithEmailAndPassword(auth, email, pass)
			.then((userCredentials) => {
				dispatch(userActions.setEmail({ email: userCredentials.user.email }));
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<Flex w="100vw" h="100vh" justify="center" align="center">
			<Grid>
				<Box padding="1">
					<FormControl id="email" isRequired>
						<FormLabel>Email</FormLabel>
						<Input
							type={"email"}
							placeholder="Email"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</FormControl>
				</Box>
				<Box padding="1">
					<FormControl id="password" isRequired>
						<FormLabel>Password</FormLabel>
						<Input
							type={"password"}
							placeholder="Password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</FormControl>
				</Box>
				<Box align="center" padding="10">
					<FormControl>
						<Button colorScheme="teal" onClick={login}>
							Log In
						</Button>
					</FormControl>
				</Box>
				<Text>{userEmail}</Text>
			</Grid>
		</Flex>
	);
}
