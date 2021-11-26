import { Flex, Heading, Stack, Text, Button } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/checkbox";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";

export default function NewPEG() {
  const toast = useToast();

  const user = useSelector((state) => state.user);
  const [categoryValue, setcategoryValue] = useState(null);
  const [isAnonym, setIsAnonym] = useState(false);

  // refs
  const userRef = React.useRef(null);
  const projectRef = React.useRef(null);

  // data
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  // load initial data
  React.useEffect(() => {
    setCategories(["category1", "category2", "category3"]);
    setUsers(["User1", "User2"]);
    setProjects(["Project1", "Project2"]);
  }, []);

  // send feedback to backend
  const sendFeedback = async () => {
    if (!userRef.current.value || !projectRef.current.value || !categoryValue) {
      toast({
        title: "Fields missing.",
        description: "All fields are mandatory.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const myFeedback = {
      fromUserId: user.email,
      toUserId: userRef.current.value,
      projectId: projectRef.current.value,
      anonym: isAnonym,
      category: categoryValue,
    };

    console.log(myFeedback);

    toast({
      title: "Success.",
      description: "Request sent successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Flex flexDir="column" w="60vh">
      <Heading>Request new Feedback</Heading>
      {/* User */}
      <FormControl id="User" padding="3">
        <FormLabel>Choose user: </FormLabel>
        <Select placeholder="User" ref={userRef}>
          {users.map((obj, i) => (
            <option key={i}>{obj}</option>
          ))}
        </Select>
      </FormControl>

      {/* Project */}
      <FormControl id="Project" padding="3">
        <FormLabel>Choose project: </FormLabel>
        <Select placeholder="Project" ref={projectRef}>
          {projects.map((obj, i) => (
            <option key={i}>{obj}</option>
          ))}
        </Select>
      </FormControl>

      {/* Anonimity */}
      <FormControl id="Anonimity" padding="3">
        <FormLabel>Anonym: </FormLabel>
        <Checkbox value={isAnonym} onChange={() => setIsAnonym(!isAnonym)}>
          Send anonymous feedback
        </Checkbox>
      </FormControl>

      {/* Categories */}
      <FormControl id="Anonimity" padding="3">
        <FormLabel>Category feedback: </FormLabel>
        <RadioGroup onChange={setcategoryValue} value={categoryValue}>
          <Stack>
            {categories.map((obj, i) => (
              <Radio key={i} value={obj} colorScheme="teal">
                <Text textTransform="capitalize">{obj}</Text>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </FormControl>

      {/* Send request */}
      <Button leftIcon={<FaPaperPlane />} mt={3} onClick={() => sendFeedback()}>
        Send request
      </Button>
    </Flex>
  );
}
