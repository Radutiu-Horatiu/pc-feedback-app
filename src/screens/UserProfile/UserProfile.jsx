import { Flex, Grid, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { useSelector } from "react-redux";
import { API } from "../../utils/API";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

import {
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
export default function UserProfile() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [fiscalYear, setFiscalYear] = useState(0);
  const [personalNumber, setPersonalNumber] = useState(0);
  const [organizationalAssignment, setOrganizationalAssignment] = useState("");
  const [careerLevel, setCareerLevel] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setCareerLevel(user?.careerLevel);
    setEmail(user.email);
    setUsername(user.username);
    setName(user.name);
    setFiscalYear("2021");
    setPersonalNumber(user.personalNumber);
    setRole(user.role);
    setOrganizationalAssignment(user.organizationalAssignment);
  }, [user]);
  const editUser = async () => {
    const myUser = {
      id: user.uid,
      name: name,
      username: username,
      email: email,
      role: role,
      fiscal_year: fiscalYear,
      personal_number: personalNumber,
      career_level: careerLevel,
      organisational_assignment: organizationalAssignment,
    };
    try {
      await axios.request({
        method: "POST",
        url: API.backend + "updateUser",
        data: myUser,
      });
      toast({
        title: "Succes.",
        description: "User updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch {
      toast({
        title: "Error.",
        description: "Something went wrong, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <Flex flexDirection="column" justify="left" align="left">
      <Heading>My Profile</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={"3vh"}>
        <FormControl id="Email" isReadOnly={true}>
          <FormLabel>Email: </FormLabel>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="Email"
            style={{ width: "370px" }}
          />
        </FormControl>

        <FormControl id="Username">
          <FormLabel>Username: </FormLabel>
          <Input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="Username"
            style={{ width: "370px" }}
          />
        </FormControl>

        <FormControl id="Name">
          <FormLabel>Full Name: </FormLabel>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="Name"
            style={{ width: "370px" }}
          />
          <FormHelperText>Enter your first and last Name</FormHelperText>
        </FormControl>

        <FormControl id="FiscalYear" isReadOnly={true}>
          <FormLabel>Fiscal Year: </FormLabel>
          <Input
            type="FiscalYear"
            style={{ width: "370px" }}
            value={fiscalYear}
          />
        </FormControl>

        <FormControl id="PersonalNumber">
          <FormLabel>Personal Number: </FormLabel>
          <Input
            type="PersonalNumber"
            style={{ width: "370px" }}
            value={personalNumber}
            onChange={(e) => setPersonalNumber(e.target.value)}
          />
        </FormControl>

        <FormControl id="CareerLevel">
          <FormLabel>Career Level: </FormLabel>
          <Select
            placeholder="Select career level"
            style={{ width: "370px" }}
            value={careerLevel}
            onChange={(e) => {
              setCareerLevel(e.target.value);
            }}
          >
            <option>Junior</option>
            <option>Mid</option>
            <option>Senior</option>
          </Select>
        </FormControl>
        <FormControl id="OrganizationalAssignments">
          <FormLabel>Organizational Assignments: </FormLabel>
          <Select
            placeholder="Select Organizational Assignments"
            style={{ width: "370px" }}
            value={organizationalAssignment}
            onChange={(e) => {
              setOrganizationalAssignment(e.target.value);
            }}
          >
            <option>Option1</option>
            <option>Option2</option>
          </Select>
        </FormControl>
      </Grid>
      <Button colorScheme="teal" onClick={editUser} mt={"3vh"} leftIcon={<FaCheck />}>
        Update profile
      </Button>
    </Flex>
  );
}
