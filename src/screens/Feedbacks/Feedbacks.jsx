import { Flex, Heading, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import axios from "axios";
import React, { useState } from "react";
import { API } from "../../utils/API";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { FaCheck } from "react-icons/fa";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  const themeBackground = useColorModeValue("gray.200", "gray.700");

  React.useEffect(() => {
    (async () => {
      const response = await axios.request({
        method: "GET",
        url: API.backend + "getAllFeedback",
      });

      setFeedbacks(response.data);
    })();
  }, []);

  return (
    <Flex flexDir="column" h="90vh" overflowY="scroll" w="80vw">
      <Heading>All Feedbacks</Heading>
      <Accordion allowToggle mt="1vh" px="1vh">
        {feedbacks.map((obj, i) => (
          <AccordionItem key={i} border="none">
            <AccordionButton
              p="2vh"
              bg={themeBackground}
              _hover={themeBackground}
              borderRadius={20}
              my="2vh"
            >
              <Flex flex="1" textAlign="left" align="center">
                <Flex w="100%" justify="center" flexDir="column">
                  <Text fontWeight="bold">#{i} Feedback</Text>
                  <Text>{obj.project_id}</Text>
                  <Flex>
                    {!obj.anonym && (
                      <>
                        <Text>Request sent by: {obj.from_user_id}</Text>
                        <Text ml="1vh">To: {obj.to_user_id}</Text>
                      </>
                    )}
                  </Flex>
                  <Text fontSize="1.3vh">{new Date(obj.timestamp).toLocaleString("en-US")}</Text>
                </Flex>
                <Button
                  textTransform="capitalize"
                  fontWeight="bold"
                  color={obj.status === "received" ? "teal.200" : "teal.600"}
                  leftIcon={obj.status === "received" && <FaCheck />}
                  isLoading={obj.status === "sent" && true}
                  loadingText={obj.status === "sent" && "Pending"}
                  mr="2vh"
                >
                  {obj.status}
                </Button>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color={!obj.text && "teal.600"}>
                {obj.text ? obj.text : "Feedback not received yet."}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
}
