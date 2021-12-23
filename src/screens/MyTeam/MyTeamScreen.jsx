import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { API } from "../../utils/API";
import { useColorModeValue, useColorMode } from "@chakra-ui/color-mode";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { FaCaretDown, FaCaretRight, FaCheck } from "react-icons/fa";

export default function MyTeamScreen() {
  const [teamMembers, setteamMembers] = useState([]);
  const modalVariant = useColorModeValue("gray.200", "teal.800");
  const [openRequestFeedback, setOpenRequestFeedback] = useState(null);
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
  const availableSkills = ["Tech skills", "Soft skills", "Other skills"];
  const availableTeams = ["Team A", "Team B", "Team C"];

  const projectRef = useRef(null);
  const categoryRef = useRef(null);

  React.useEffect(() => {
    (async () => {
      let members = await axios.request({
        method: "GET",
        url: "http://127.0.0.1:8000/getAllUsers/",
      });

      if (user.role !== "Administrator") {
        const myTeam = members.data.filter((u) => user.uid === u.id)[0]?.team;

        setteamMembers(
          members.data.filter((u) => myTeam === u.team && user.uid !== u.id)
        );
      } else setteamMembers(members.data);
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

  const sendFeedbackRequest = async (fromUser, toUser) => {
    if (!projectRef.current?.value || !categoryRef.current?.value) {
      toast({
        title: "Fields missing.",
        description: "Project and category are mandatory fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const myFeedback = {
      from_user_id: openRequestFeedback.fromUser,
      to_user_id: openRequestFeedback.toUser,
      status: "sent",
      project_id: projectRef.current.value,
      anonym: false,
      category: categoryRef.current?.value,
      text: "",
    };

    await axios.request({
      method: "POST",
      url: API.backend + "addFeedback",
      data: myFeedback,
    });

    toast({
      title: "Success.",
      description: "Request sent successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });

    setOpenRequestFeedback(null);
  };

  return (
    <>
      {/* Open modal Feedback */}
      {openRequestFeedback?.fromUser && openRequestFeedback?.toUser && (
        <Flex
          pos="absolute"
          w="100vw"
          h="100vh"
          top="0"
          left="0"
          justify="center"
          align="center"
          backgroundColor="rgb(0,0,0,0.7)"
          zIndex="10"
        >
          <Flex
            flexDir="column"
            w="30vw"
            bgColor={modalVariant}
            p="5vh"
            borderRadius={5}
          >
            <Flex align={"center"}>
              <FaCheck fontSize={"3vh"} />
              <Text fontWeight="bold" fontSize={"3vh"} ml={"1vh"}>
                Make feedback request
              </Text>
            </Flex>
            {/* User */}
            <Text fontWeight="bold" fontSize={"2vh"} mt={"2vh"} mb={"1vh"}>
              Users
            </Text>
            <Text>From:</Text>
            <Input readOnly value={openRequestFeedback.fromUser} />
            <Text>To:</Text>
            <Input readOnly value={openRequestFeedback.toUser} />

            {/* Project */}
            <Text fontWeight="bold" fontSize={"2vh"} mt={"2vh"} mb={"1vh"}>
              Project
            </Text>
            <Select placeholder="Project" ref={projectRef}>
              {availableProjects.map((obj, i) => (
                <option key={i}>{obj}</option>
              ))}
            </Select>

            {/* Skill */}
            <Text fontWeight="bold" fontSize={"2vh"} mt={"2vh"} mb={"1vh"}>
              Skill
            </Text>
            <Select placeholder="Skill" ref={categoryRef}>
              {availableSkills.map((obj, i) => (
                <option key={i}>{obj}</option>
              ))}
            </Select>
            <Flex mt="3vh">
              <Button onClick={() => sendFeedbackRequest()} w="50%">
                Send
              </Button>
              <Button
                onClick={() => setOpenRequestFeedback(null)}
                w="50%"
                ml="1vh"
              >
                Close
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
      
      {/* Table */}
      <Flex flexDir={"column"} px={"3vh"}>
        <Heading>
          {user?.role === "Administrator" ? "People" : "My Team"}
        </Heading>
        <Flex overflowY={"scroll"} maxH={"80vh"}>
          <Table
            variant="striped"
            w={"80vw"}
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
                {(user.careerLevel === "Manager" ||
                  user.careerLevel === "Senior Manager") && (
                  <Th>Request Feedback</Th>
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
                    {user.role !== "Administrator" && (
                      <Td>{member.username}</Td>
                    )}
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
                    {(user.careerLevel === "Manager" ||
                      user.careerLevel === "Senior Manager") && (
                      <Td>
                        <Select
                          placeholder="To which user"
                          onChange={(e) => {
                            setOpenRequestFeedback({
                              fromUser: member.email,
                              toUser: e.currentTarget.value,
                            });
                          }}
                        >
                          {teamMembers
                            .filter((u) => u.email !== member.email)
                            .map((obj, i) => (
                              <option key={i} value={obj.email}>
                                {obj.email}
                              </option>
                            ))}
                          <option value={user.email}>{user.email}</option>
                        </Select>
                      </Td>
                    )}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
}
