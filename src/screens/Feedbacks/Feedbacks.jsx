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
import { Select } from '@chakra-ui/react'

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [displayedfeedbacks, setDisplayedfeedbacks] = useState([]);
  React.useEffect(() => {
    (async () => {
      const response = await axios.request({
        method: "GET",
        url: API.backend + "getAllFeedback",
      });

      setFeedbacks(response.data);
      setDisplayedfeedbacks(response.data);
    })();
  }, []);

  const [selectedfeedback, setselectedfeedback] = useState();
  const showFilteredFeedbacks = () => {
    console.log("FILTER FEEDBACKS")
    console.log(feedbacks.length)
		const feedbacksFiltered = feedbacks.filter(
			(p) => p.status === selectedfeedback);
		console.log(feedbacksFiltered.length)
    console.log(feedbacksFiltered)
    setDisplayedfeedbacks(feedbacksFiltered);
  }
  const clearFilteredFeedbacks = () => {
		setDisplayedfeedbacks(feedbacks);
	}

  return (
    <Flex flexDir="column" h="90vh" overflowY="scroll" w="80vw">
      <Heading>All Feedbacks</Heading>
      <br />
      <Flex>
        <Select placeholder='Select Feedback Filter option' width={300} mr="2vh" value ={selectedfeedback} onChange={e=>setselectedfeedback(e.target.value)}>
          <option value='received'>Received</option>
          <option value='sent'>Pending</option>
        </Select>
        <Button mr="2vh" color="teal.200" onClick={() => {showFilteredFeedbacks();}}>FILTER</Button>
        <Button mr="2vh" color="teal.200" onClick={() => {clearFilteredFeedbacks();}}>REFRESH</Button>
      </Flex>
      <Accordion allowToggle mt="1vh" px="1vh">
        {displayedfeedbacks.map((obj, i) => (
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
