import { Flex, Image } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { useHistory } from "react-router";

import LOGO_LIGHT from "../../assets/feedback_light.png";
import LOGO_DARK from "../../assets/feedback_dark.png";

export default function HomeScreen() {
  const history = useHistory();
  const { colorMode } = useColorMode();

  return (
    <Flex flexDir="column">
      <Heading>Welcome to,</Heading>
      <Heading color="teal.400" fontSize="10vh">
        My-Backfeed
      </Heading>
      {/* Logo */}
      <Flex justify="center" my="5vh">
        <Image
          src={colorMode === "light" ? LOGO_DARK : LOGO_LIGHT}
          w="20vh"
          h="20vh"
        />
      </Flex>
      <Button mt="2vh" onClick={() => history.push("/register")}>
        Join now!
      </Button>
      <Button mt="1vh" onClick={() => history.push("/login")}>
        Already a member?
      </Button>
    </Flex>
  );
}
