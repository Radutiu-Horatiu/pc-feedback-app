import { Flex, Heading, Text, Button, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { API } from "../../utils/API";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function NewPEG() {
  const toast = useToast();

  const user = useSelector((state) => state.user);
  const feedbackRef = React.useRef(null);

  // data
  const [feedbacks, setFeedbacks] = useState([]);
  const [PEGs, setPEGs] = useState([]);
  const [openFeedback, setOpenFeedback] = useState(null);

  // load initial data
  React.useEffect(() => {
    (async () => {
      const response = await axios.request({
        method: "GET",
        url: API.backend + "getAllFeedback",
      });

      setFeedbacks(
        response.data.filter(
          (f) => f.to_user_id === user.email && f.status === "sent"
        )
      );
    })();
  }, [user]);

  // send feedback to backend
  const sendFeedback = async (id) => {
    let myId = id;
    let text = feedbackRef.current.value;

    if (!text) {
      toast({
        title: "Error.",
        description: "Text cannot be null.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    setOpenFeedback(null);

    // update doc in firebase
    const docRef = doc(db, "feedback", myId);
    await updateDoc(docRef, {
      text: text,
      status: "received",
    });

    // remove feedback from list
    setFeedbacks((current) => current.filter((f) => f.uid !== myId));

    toast({
      title: "Succes.",
      description: "Feedback sent.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Flex w="100%" px="5vh" h="100%">
      {/* Open modal */}
      {openFeedback && (
        <Flex
          pos="absolute"
          w="100vw"
          h="100vh"
          top="0"
          left="0"
          justify="center"
          align="center"
          backgroundColor="rgb(0,0,0,0.7)"
          zIndex="10"
        >
          <Flex
            flexDir="column"
            w="30vw"
            bgColor="teal.800"
            p="5vh"
            borderRadius={5}
          >
            <Text>Write your feedback</Text>
            <Textarea
              mt="1vh"
              placeholder="Hello there.."
              ref={feedbackRef}
            ></Textarea>
            <Flex mt="1vh">
              <Button onClick={() => sendFeedback(openFeedback)} w="50%">
                Send
              </Button>
              <Button onClick={() => setOpenFeedback(null)} w="50%" ml="1vh">
                Close
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}

      {/* My PEGs */}
      <Flex w="50%" flexDir="column" h="90vh" overflowY="scroll">
        <Heading>My PEGs</Heading>
        {!PEGs.length > 0 && <Text>No PEGs for you.</Text>}
      </Flex>

      {/* My Requests */}
      <Flex w="50%" flexDir="column" h="90vh" overflowY="scroll">
        <Heading mb="3vh">My Feedback Requests</Heading>
        {!feedbacks.length > 0 && <Text>No requests for you.</Text>}
        {feedbacks.map((obj, i) => (
          <Flex
            key={i}
            borderWidth={1}
            borderRadius={5}
            p="2vh"
            flexDir="column"
            my="1vh"
          >
            <Text fontWeight="bold">#{i}</Text>
            <Text>Category: {obj.category}</Text>
            <Text>From user: {obj.from_user_id}</Text>
            <Text>Project ID: {obj.project_id}</Text>
            <Text>
              Date: {new Date(obj.timestamp).toLocaleTimeString("en-US")}
            </Text>
            <Flex borderTopWidth={1} w={"100%"} my="1vh"></Flex>
            <Text fontWeight="bold">Resolve feedback</Text>
            <Button mt="1vh" onClick={() => setOpenFeedback(obj.uid)}>
              Complete
            </Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
