import { Flex, Image } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { useSelector } from "react-redux";
import CountUp from "react-countup";

import LOGO_LIGHT from "../../assets/feedback_light.png";
import LOGO_DARK from "../../assets/feedback_dark.png";

export default function HomeScreen() {
  const user = useSelector((state) => state.user);
  const { colorMode } = useColorMode();

  const [stats, setStats] = useState([]);

  // load stats from backend
  React.useEffect(() => {
    setStats([
      { text: "Feedbacks", value: 123 },
      { text: "PEGs", value: 98 },
      { text: "My Requests", value: 57 },
    ]);
  }, []);

  return (
    <Flex flexDir="column" w="80%">
      <Flex
        flexDir="column"
        backgroundColor={useColorModeValue("gray.200", "gray.700")}
        p="1vh"
        borderRadius={20}
      >
        <Flex w="100%" justify="space-evenly" align="center">
          {/* User welcome */}
          <Flex flexDir="column">
            <Heading>Welcome to My-Backfeed,</Heading>
            <Heading size="3xl" color="teal.400">
              {user.name}
            </Heading>
          </Flex>

          {/* Logo */}
          <Flex justify="center" my="3vh">
            <Image
              src={colorMode === "light" ? LOGO_DARK : LOGO_LIGHT}
              w="20vh"
              h="20vh"
            />
          </Flex>
        </Flex>

        {/* Stats */}
        <Flex
          justify="center"
          align="center"
          py="3vh"
          borderTopWidth={1}
          flexDir="column"
        >
          <Heading>Stats</Heading>
          <Flex justify="space-evenly" w="100%" mt="1vh">
            {/* Total feedback requests */}
            {stats.map((obj, i) => (
              <Flex key={i} flexDir="column" align="center" justify="center">
                <Text fontSize="4vh" color="teal.400" fontWeight="bold">
                  <CountUp end={obj.value} duration={3} />
                </Text>
                <Text>{obj.text}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
