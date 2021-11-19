import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user-slice";
import { useHistory } from "react-router";
import { logout } from "../../store/user/utils";

export default function HomeScreen() {
	const history = useHistory();
	const dispatch = useDispatch();
	const username = useSelector((state) => state.user.username);
	const email = useSelector((state) => state.user.email);

	const logUserOut = () => {
		logout();
		dispatch(userActions.signOut());
		history.push("/login");
	}

	return (
		<Flex>
			<Text>{email}</Text>
			<Text>{username}</Text>
			<Button onClick={logUserOut}>Log out</Button>
		</Flex>
	);
}
