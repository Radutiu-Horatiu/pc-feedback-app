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
import { FaCaretRight, FaCheck, FaUser } from "react-icons/fa";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

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
            <AccordionButton p="2vh" borderWidth={1} borderRadius={20} my="2vh">
              <Flex flex="1" textAlign="left" align="center">
                <Flex w="100%" justify="center" flexDir="column">
                  <Text fontWeight="bold">
                    #{feedbacks.length - i} Feedback
                  </Text>
                  <Text fontSize={"2vh"} color={"teal.400"} fontWeight={"bold"}>
                    {obj.project_id}
                  </Text>
                  <Text fontSize={"2vh"} color={"gray.400"} fontWeight={"bold"}>
                    {obj.category}
                  </Text>
                  <Flex>
                    {!obj.anonym && (
                      <Flex align={"center"} my="1vh">
                        <FaUser />
                        <Text mr="2vh" ml="1vh" fontWeight={"bold"}>
                          {obj.from_user_id}
                        </Text>
                        <FaCaretRight />
                        <FaUser style={{ marginLeft: "2vh" }} />
                        <Text ml="1vh" fontWeight={"bold"}>
                          {obj.to_user_id}
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                  <Text fontSize="1.3vh">
                    {new Date(obj.timestamp).toLocaleString("en-US")}
                  </Text>
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
