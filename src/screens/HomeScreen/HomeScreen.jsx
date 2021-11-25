import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import React from "react";
import { useSelector } from "react-redux";

export default function HomeScreen() {
	const email = useSelector((state) => state.user.email);

	return (
		<Flex>
			<Text>Hello, {email}</Text>
		</Flex>
	);
}
