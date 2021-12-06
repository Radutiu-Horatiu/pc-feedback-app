import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormControl, FormLabel, Input, Grid, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user-slice";
import { auth } from "../../firebase";
import { useHistory } from "react-router";
import { Heading, Text } from "@chakra-ui/layout";
import { API } from "../../utils/API";
import { useColorModeValue } from "@chakra-ui/color-mode";
import axios from "axios";

export default function RegisterScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const saveUserToFirebase = async (email, name, uid) => {
    await axios.request({
      method: "POST",
      url: API.backend + "addUser",
      data: {
        email,
        name,
        uid,
      },
    });
  };

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        dispatch(userActions.setEmail({ email: userCredentials.user.email }));
        dispatch(userActions.setName({ name: name }));
        saveUserToFirebase(
          userCredentials.user.email,
          name,
          userCredentials.user.uid
        );
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Flex
      justify="center"
      backgroundColor={useColorModeValue("gray.100", "gray.800")}
      flexDir="column"
      w="30vw"
      p="3vh"
      borderRadius={20}
    >
      <Heading mb="2vh">Sign up</Heading>
      <Box padding="1">
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>
      </Box>
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
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Box padding="1">
        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirm password</FormLabel>
          <Input
            type="password"
            placeholder="Please confirm password"
            onChange={(e) => {
              setPasswordVerify(e.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Box align="center" my="10">
        <FormControl>
          <Button
            onClick={register}
            colorScheme="teal"
            w="100%"
            disabled={
              (password != passwordVerify) |
              (password.length == 0) |
              (passwordVerify.length == 0)
            }
          >
            Register
          </Button>
        </FormControl>
      </Box>
      <Box align="center">
        <Text padding="5">
          <strong>Already have an account? Please log in!</strong>
        </Text>
        <FormControl>
          <Button colorScheme="teal" onClick={() => history.push("/login")} w="100%">
            Log In
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
}
