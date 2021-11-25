import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormControl, FormLabel, Input, Grid, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user-slice";
import { auth } from "../../firebase";

export default function RegisterScreen() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordVerify, setPasswordVerify] = useState("");
	const register = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				dispatch(userActions.setEmail({ email: userCredentials.user.email }));
				dispatch(userActions.setName({ name: name }));
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<Flex justify="center" align="center">
			<Grid>
				<Box padding="1">
					<FormControl id="name" isRequired>
						<FormLabel>Name</FormLabel>
						<Input
							placeholder="Name"
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</FormControl>
				</Box>
				<Box padding="1">
					<FormControl id="email" isRequired>
						<FormLabel>Email</FormLabel>
						<Input
							type="email"
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
							type="password"
							placeholder="Password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</FormControl>
				</Box>
				<Box padding="1">
					<FormControl id="confirmPassword" isRequired>
						<FormLabel>Confirm password</FormLabel>
						<Input
							type="password"
							placeholder="Please confirm password"
							onChange={(e) => {
								setPasswordVerify(e.target.value);
							}}
						/>
					</FormControl>
				</Box>
				<Box align="center" padding="10">
					<FormControl>
						<Button onClick={register} colorScheme="teal" disabled={(password != passwordVerify) | (password.length == 0) | (passwordVerify.length == 0)}>
							Register
						</Button>
					</FormControl>
				</Box>
			</Grid>
		</Flex>
	);
}
