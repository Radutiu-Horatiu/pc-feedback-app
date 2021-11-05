import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user-slice";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "@firebase/auth";

export default function HomeScreen() {
	const dispatch = useDispatch();
	const username = useSelector((state) => state.user.username);
	const email = useSelector((state) => state.user.email);
	useEffect(() => {
		dispatch(userActions.setUsername({ username: "Dummy rname" }));
	}, [dispatch, username]);
	useEffect(() => {
		login("omihai00@gmail.com", "123456");
	}, []);

	const login = (email, pass) => {
		signInWithEmailAndPassword(auth, email, pass)
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
		<Flex>
			<Text>{email}</Text>
			<Text>{username}</Text>
		</Flex>
	);
}
