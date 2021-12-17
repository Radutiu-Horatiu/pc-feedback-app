import { Flex, useToast } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/layout";

import React, { useState } from "react";
import { FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user/user-slice";
import { useHistory } from "react-router";
import { useColorModeValue } from "@chakra-ui/color-mode";

export default function LoginScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        dispatch(userActions.setEmail({ email: userCredentials?.user?.email }));
        history.push("/");
      })
      .catch((e) => {
        toast({
          title: "Error.",
          description: "Incorrect credentials :(",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <Flex
      justify="center"
      backgroundColor={useColorModeValue("gray.100", "gray.700")}
      flexDir="column"
      w="30vw"
      p="3vh"
      borderRadius={20}
    >
      <Heading mb="2vh">Sign in</Heading>
      <Box padding="1">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Box padding="1">
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type={"password"}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Box align="center" my="5vh">
        <FormControl>
          <Button colorScheme="teal" onClick={login} w="100%">
            Log In
          </Button>
        </FormControl>
      </Box>
      <Box align="center">
        <Text padding="5">
          <strong>Are you new? Please register!</strong>
        </Text>
        <FormControl>
          <Button
            colorScheme="teal"
            onClick={() => history.push("/register")}
            w="100%"
          >
            Register
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
}
