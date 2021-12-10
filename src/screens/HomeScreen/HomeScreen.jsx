import { Flex } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CountUp from "react-countup";

export default function HomeScreen() {
  const user = useSelector((state) => state.user);

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
    <Flex flexDir="column">
      {/* User welcome */}
      <Heading>Welcome to My-Backfeed,</Heading>
      <Heading size="3xl" color="teal.400">
        {user.name}
      </Heading>

      {/* Stats */}
      <Flex
        justify="center"
        align="center"
        mt="5vh"
        py="5vh"
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
  );
}
