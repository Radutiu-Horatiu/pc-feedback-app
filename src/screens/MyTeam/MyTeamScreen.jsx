import { Flex, Heading, Select, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { API } from "../../utils/API";
import { useColorModeValue, useColorMode } from "@chakra-ui/color-mode";
import { useSelector } from "react-redux";

export default function MyTeamScreen() {
  const [teamMembers, setteamMembers] = useState([]);
  const availableRoles = [
    "Manager",
    "Engineer",
    "Developer",
    "Lead",
    "Administrator",
  ];
  const toast = useToast();
  const user = useSelector((state) => state.user);
  const { colorMode } = useColorMode();

  const availableProjects = [
    "Galactic colonization",
    "Web 3.0",
    "Backfeed-Coin",
  ];
  const availableTeams = ["Team A", "Team B", "Team C"];

  React.useEffect(() => {
    (async () => {
      let members = await axios.request({
        method: "GET",
        url: "http://127.0.0.1:8000/getAllUsers/",
      });

      const myTeam = members.data.filter((u) => user.uid === u.id)[0]?.team;

      setteamMembers(members.data.filter((u) => myTeam === u.team && user.uid !== u.id));
    })();
  }, []);

  const updateUser = async (thisUser, field, value) => {
    let myUser = thisUser;

    myUser.team = myUser.team || "-";
    myUser.project = myUser.project || "-";
    myUser[field] = value;

    try {
      await axios.request({
        method: "POST",
        url: API.backend + "updateUser",
        data: myUser,
      });
      toast({
        title: "Succes.",
        description: "User team updated successfully.",
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
    <Flex flexDir={"column"} px={"3vh"}>
      <Heading>{user?.role === "Administrator" ? "People" : "My Team"}</Heading>
      <Flex overflowY={"scroll"} maxH={"80vh"}>
        <Table
          variant="striped"
          colorScheme={useColorModeValue("gray", "teal")}
        >
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              {user.role !== "Administrator" && <Th>Username</Th>}
              {user.role !== "Administrator" && <Th>Role</Th>}
              {user.role !== "Administrator" && <Th>Personal Number</Th>}
              <Th>Career Level</Th>
              {user.role !== "Administrator" && <Th>Fiscal Year</Th>}
              {user.role !== "Administrator" && <Th>Org. Assignment</Th>}
              {user.role === "Administrator" && (
                <>
                  <Th>Assign project</Th>
                  <Th>Assign team</Th>
                </>
              )}
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
                  {user.role !== "Administrator" && <Td>{member.username}</Td>}
                  {user.role === "Administrator" &&
                  member.email !== user.email ? (
                    <Td>
                      <Select
                        defaultValue={member.role || ""}
                        placeholder="Choose role"
                        onChange={(e) => {
                          updateUser(member, "role", e.target.value);
                        }}
                      >
                        {availableRoles.map((obj, i) => (
                          <option key={i} value={obj}>
                            {obj}
                          </option>
                        ))}
                      </Select>
                    </Td>
                  ) : (
                    <Td>
                      <Text>{user.role}</Text>
                    </Td>
                  )}
                  {user.role !== "Administrator" && (
                    <Td>{member.personal_number}</Td>
                  )}
                  {user.role !== "Administrator" && (
                    <Td>{member.career_level}</Td>
                  )}
                  {user.role !== "Administrator" && (
                    <Td>{member.fiscal_year}</Td>
                  )}
                  {user.role !== "Administrator" && (
                    <Td>{member.organisational_assignment}</Td>
                  )}
                  {user.role === "Administrator" && (
                    <>
                      <Td>
                        <Select
                          defaultValue={member.project || ""}
                          placeholder="Project"
                          onChange={(e) => {
                            updateUser(member, "project", e.target.value);
                          }}
                        >
                          {availableProjects.map((obj, i) => (
                            <option key={i} value={obj}>
                              {obj}
                            </option>
                          ))}
                        </Select>
                      </Td>
                      <Td>
                        <Select
                          defaultValue={member.team || ""}
                          placeholder="Team"
                          onChange={(e) => {
                            updateUser(member, "team", e.target.value);
                          }}
                        >
                          {availableTeams.map((obj, i) => (
                            <option key={i} value={obj}>
                              {obj}
                            </option>
                          ))}
                        </Select>
                      </Td>
                    </>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
}
