import { Flex } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import React from "react";
import { useHistory } from "react-router";

export default function HomeScreen() {
  const history = useHistory();

  return (
    <Flex flexDir="column">
      <Heading>Welcome to,</Heading>
      <Heading color="teal.400" fontSize="10vh">
        My-Backfeed
      </Heading>
      <Button mt="2vh" onClick={() => history.push("/login")}>Join now</Button>
    </Flex>
  );
}
