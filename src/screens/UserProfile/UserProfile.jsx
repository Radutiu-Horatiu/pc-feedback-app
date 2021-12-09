import { Flex, Grid, Box } from "@chakra-ui/react";
import { Center, Text } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user-slice";
import { Tag } from "@chakra-ui/tag";
import { API } from "../../utils/API";
import axios from "axios";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
export default function UserProfile() {
  const dispatch = useDispatch();
  /*const username = useSelector((state) => state.user.username);
  const email = useSelector((state) => state.user.email);
  const name = useSelector((state) => state.user.name);
  const role = useSelector((state) => state.user.role);
  const fiscalYear = useSelector((state) => state.user.fiscalYear);
  const personalNumber = useSelector((state) => state.user.personalNumber);
  const careerLevel = useSelector((state) => state.user.careerLevel);
  const organizationalAssignments = useSelector(
    (state) => state.user.organizationalAssignments
  );*/
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [fiscalYear, setFiscalYear] = useState(0);
  const [personalNumber, setPersonalNumber] = useState(0);
  const [organizationalAssignment, setOrganizationalAssignment] = useState("");
  const [careerLevel, setCareerLevel] = useState("");
  const user = useSelector((state) => state.user);


  React.useEffect(() => {
      setCareerLevel(user?.careerLevel);
      setEmail(user.email);
      setUsername(user.username);
      setName(user.name);
      setFiscalYear(user.fiscalYear);
      setPersonalNumber(user.personalNumber);
      setRole(user.role);
      setOrganizationalAssignment(user.organizationalAssignment);
  }, []);
  const editUser = async () => {
      const myUser = 
      {
          uid: user.uid,
          email: email,
          username: username,
          name: name,
          role: role,
          fiscalYear: fiscalYear,
          organizationalAssignment: organizationalAssignment,
          careerLevel: careerLevel,
          personalNumber: personalNumber,
      }
      await axios.request({
        method: "POST",
        url: API.backend + "/updateUser?id=NG7QNDVfDOgAPoJrkAovVwLTGWm2",
        data: myUser,
      });
  }
  return (
    <Flex flexDirection="column" justify="left" align="left">
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
      <FormControl id="Email" isReadOnly={true} padding="3">
        <FormLabel>Email: </FormLabel>
        <Input value={email} onChange={(e) => {setEmail(e.target.value)}} type="Email" style={{ width: "370px" }} />
      </FormControl>

      <FormControl id="Username" padding="3">
        <FormLabel>Username: </FormLabel>
        <Input value={username} onChange={(e) => {setUsername(e.target.value)}} type="Username" style={{ width: "370px" }} />
      </FormControl>

      <FormControl id="Name"  padding="3">
        <FormLabel>Full Name: </FormLabel>
        <Input value={name} onChange={(e) => {setName(e.target.value)}} type="Name" style={{ width: "370px" }} />
        <FormHelperText>Enter your first and last Name</FormHelperText>
      </FormControl>

        <FormControl id="FiscalYear" isReadOnly={true} padding="3">
          <FormLabel>Fiscal Year: </FormLabel>
          <Input type="FiscalYear" style={{ width: "370px" }} />
        </FormControl>

        <FormControl id="PersonalNumber" isReadOnly={true} padding="3">
          <FormLabel>Personal Number: </FormLabel>
          <Input type="PersonalNumber" style={{ width: "370px" }} />
        </FormControl>

        <FormControl id="CareerLevel" padding="3">
          <FormLabel>Career Level: </FormLabel>
          <Select
                placeholder="Select career level" style={{ width: "370px" }}
                value={careerLevel}
                onChange={(e) => {setCareerLevel(e.target.value)}}
           >
            <option>Option1</option>
            <option>Option2</option>
          </Select>
        </FormControl>
        <FormControl id="OrganizationalAssignments" padding="3">
          <FormLabel>Organizational Assignments: </FormLabel>
          <Select
            placeholder="Select Organizational Assignments"
            style={{ width: "370px" }}
            value={organizationalAssignment}
            onChange={(e) => {setOrganizationalAssignment(e.target.value)}}
          >
            <option>Option1</option>
            <option>Option2</option>
          </Select>
        </FormControl>
        <FormControl id="Role" padding="3">
          <FormLabel>Roles: </FormLabel>
          <Select
            placeholder="Select Organizational Assignments"
            style={{ width: "370px" }}
            value={role}
            onChange={(e) => {setRole(e.target.value)}}
          >
            <option>Option1</option>
            <option>Option2</option>
          </Select>
        </FormControl>
        <Button
            style={{ marginTop: "43px", width: "370px", marginLeft: "15px" }}
            colorScheme="teal"
            onClick={() => {editUser();}}
        >
            Edit User</Button>
      </Grid>
    </Flex>
  );
}
