import { Flex, Heading, Stack, Text, Button, Textarea } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/checkbox";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { API } from "../../utils/API";

export default function NewPEG() {
  const toast = useToast();

  const user = useSelector((state) => state.user);
  const [categoryValue, setcategoryValue] = useState(null);
  const [isAnonym, setIsAnonym] = useState(false);

  // refs
  const userRef = React.useRef(null);
  const projectRef = React.useRef(null);
  const textRef = React.useRef(null);

  // data
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  // load initial data
  React.useEffect(() => {
    (async () => {
      const response = await axios.request({
        method: "GET",
        url: API.backend + "getAllUsers",
      });

      setUsers(response.data);
    })();

    setCategories(["Tech skills", "Soft skills", "Other skills"]);
    setProjects(["Galactic colonization", "Web 3.0", "Backfeed-Coin"]);
  }, []);

  // send feedback to backend
  const sendFeedback = async () => {
    if (!categoryValue) {
      toast({
        title: "Fields missing.",
        description: "Category is a mandatory field.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const myFeedback = {
      from_user_id: user.email,
      to_user_id: userRef.current.value,
      status: textRef.current.value ? "received" : "sent",
      project_id: projectRef.current.value || "",
      anonym: isAnonym,
      category: categoryValue,
      text: textRef.current.value || "",
    };

    await axios.request({
      method: "POST",
      url: API.backend + "addFeedback",
      data: myFeedback,
    });

    userRef.current.value = "";
    projectRef.current.value = "";
    textRef.current.value = "";
    setcategoryValue(null);
    setIsAnonym(false);

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
            <option key={i}>{obj.email}</option>
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
          Anonymous feedback
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

      {/* Text */}
      <FormControl id="Text" padding="3">
        <FormLabel>Feedback text: </FormLabel>
        <Textarea placeholder="Write feedback here.." ref={textRef} />
      </FormControl>

      {/* Send request */}
      <Button leftIcon={<FaPaperPlane />} mt={3} onClick={() => sendFeedback()}>
        Send request/feedback
      </Button>
    </Flex>
  );
}
