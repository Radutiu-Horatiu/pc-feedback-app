import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user-slice";
import { Flex } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { logout } from "../../store/user/utils";

export default function Navbar() {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.user);

	const logUserOut = () => {
		logout();
		dispatch(userActions.signOut());
		history.push("/login");
	};

	return (
		<Flex flexDir="column" w="15vw" backgroundColor="teal.500" justify="space-between" p="1vh">
			{/* Up */}
			<Flex flexDir="column">
				<Heading size="l">PC-Feedback-App</Heading>
				<Button justifyContent="flex-start" variant="ghost" onClick={() => history.push("/")}>
					<Text>Home</Text>
				</Button>
				<Button justifyContent="flex-start" variant="ghost" onClick={() => history.push("/my-profile")}>
					<Text>My Profile</Text>
				</Button>
				<Button justifyContent="flex-start" variant="ghost">
					<Text>My Requests</Text>
				</Button>
				{user?.role === "Manager" && (
					<Button justifyContent="flex-start" variant="ghost">
						<Text>My Team</Text>
					</Button>
				)}
				<Button justifyContent="flex-start" variant="ghost" onClick={() => history.push("/peg-requests")}>
					<Text>All PEGs</Text>
				</Button>
				<Button justifyContent="flex-start" variant="ghost" onClick={() => history.push("/feedbacks")}>
					<Text>All Feedbacks</Text>
				</Button>
			</Flex>

			{/* Down */}
			<Flex flexDir="column">
				<Button justifyContent="flex-start" variant="ghost" onClick={logUserOut}>
					<Text>Log out</Text>
				</Button>
			</Flex>
		</Flex>
	);
}
