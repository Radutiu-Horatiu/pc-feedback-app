import { Flex, Heading, Select, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { API } from "../../utils/API";
import { useColorModeValue, useColorMode } from "@chakra-ui/color-mode";
import { useSelector } from "react-redux";

export default function MyTeamScreen() {
  const [teamMembers, setteamMembers] = useState([]);
  const availableRoles = ["Manager", "Engineer", "Developer", "Lead"];
  const toast = useToast();
  const user = useSelector((state) => state.user);
  const { colorMode } = useColorMode();

  React.useEffect(() => {
    (async () => {
      let members = await axios.request({
        method: "GET",
        url: "http://127.0.0.1:8000/getAllUsers/",
      });
      setteamMembers(members.data);
    })();
  }, []);

  const updateUserRole = async (thisUser, role) => {
    let myUser = thisUser;
    myUser.role = role;

    try {
      await axios.request({
        method: "POST",
        url: API.backend + "updateUser",
        data: myUser,
      });
      toast({
        title: "Succes.",
        description: "User role updated successfully.",
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
    <Flex flexDir={"column"}>
      <Heading>My Team</Heading>
      <Flex overflowY={"scroll"} maxH={"80vh"}>
        <Table
          variant="striped"
          colorScheme={useColorModeValue("gray", "teal")}
        >
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Username</Th>
              <Th>Role</Th>
              <Th>Personal Number</Th>
              <Th>Career Level</Th>
              <Th>Fiscal Year</Th>
              <Th>Organisational Assignment</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teamMembers.map((member, i) => {
              return (
                <Tr
                  key={i}
                  color={
                    user.email === member.email &&
                    (colorMode === "light" ? "gray.700" : "teal.200")
                  }
                  fontWeight={user.email === member.email && "bold"}
                >
                  <Td>{member.name}</Td>
                  <Td>{member.email}</Td>
                  <Td>{member.username}</Td>
                  <Td>
                    <Select
                      defaultValue={
                        availableRoles.includes(member.role) ? member.role : ""
                      }
                      placeholder="Choose role"
                      onChange={(e) => {
                        updateUserRole(member, e.target.value);
                      }}
                    >
                      {availableRoles.map((obj, i) => (
                        <option key={i} value={obj}>
                          {obj}
                        </option>
                      ))}
                    </Select>
                  </Td>
                  <Td>{member.personal_number}</Td>
                  <Td>{member.career_level}</Td>
                  <Td>{member.fiscal_year}</Td>
                  <Td>{member.organisational_assignment}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
}
