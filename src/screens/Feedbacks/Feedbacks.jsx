import { Flex, Heading, Text, Box } from "@chakra-ui/react";
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
      <Accordion allowToggle mt="1vh">
        {feedbacks.map((obj, i) => (
          <AccordionItem key={i}>
            <AccordionButton>
              <Flex flex="1" textAlign="left">
                <Flex alignItems="space-between" w="100%">
                  <Text fontWeight="bold">#{i}</Text>
                  <Text ml="1vh">{obj.project_id}</Text>
                  <Text ml="1vh">
                    {new Date(obj.timestamp).toLocaleString("en-US")}
                  </Text>
                  {!obj.anonym && (
                    <>
                      <Text ml="1vh">From: {obj.from_user_id}</Text>
                      <Text ml="1vh">To: {obj.to_user_id}</Text>
                    </>
                  )}
                </Flex>
                <Flex>
                  <Text
                    textTransform="capitalize"
                    mr="1vh"
                    fontWeight="bold"
                    color={obj.status === "sent" ? "teal.200" : "teal.600"}
                  >
                    {obj.status}
                  </Text>
                </Flex>
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
