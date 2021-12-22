import { Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
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
import { userActions } from "../../store/user/user-slice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
export default function UserProfile() {
  const dispatch = useDispatch();
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
    if (!name || !personalNumber || !careerLevel || !organizationalAssignment) {
      toast({
        title: "Error.",
        description: "All fields are mandatory.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: name,
        username: username,
        email: email,
        role: role,
        fiscal_year: fiscalYear,
        personal_number: personalNumber,
        career_level: careerLevel,
        organisational_assignment: organizationalAssignment,
      });
      dispatch(userActions.setCompletedProfile({ completedProfile: true }));
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
      {!user.completedProfile && (
        <Text color={"red.300"} mt={"1vh"}>
          Please complete profile in order to use app.
        </Text>
      )}
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
          <FormHelperText>Enter your first and last name</FormHelperText>
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
            <option>Junior consultant</option>
            <option>Consultant</option>
            <option>Senior constultant</option>
            <option>Manager</option>
            <option>Senior manager</option>
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
            <option>Management</option>
            <option>Recruitment</option>
            <option>Development</option>
            <option>Talent aquisition</option>
          </Select>
        </FormControl>
      </Grid>
      <Button
        colorScheme="teal"
        onClick={editUser}
        mt={"3vh"}
        leftIcon={<FaCheck />}
      >
        Update profile
      </Button>
    </Flex>
  );
}
