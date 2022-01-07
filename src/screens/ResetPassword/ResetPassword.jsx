import { Flex, useToast, Text } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/layout";

import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useHistory } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const toast = useToast();

  const resetPass = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast({
          title: "Success.",
          description: "Email with instructions sent successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((error) => {
        console.log(error);
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
      <Heading mb="2vh">Reset Password</Heading>
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
      <Box my="5vh">
        <FormControl>
          <Text
            _hover={{ textDecoration: "underline" }}
            cursor={"pointer"}
            mb={"1vh"}
            onClick={() => history.push("/login")}
          >
            <strong>Back to login</strong>
          </Text>
          <Button colorScheme="teal" onClick={resetPass} w="100%">
            Reset
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
}
