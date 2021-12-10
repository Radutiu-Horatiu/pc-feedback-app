import { Flex } from "@chakra-ui/react";
import { FormControl, FormLabel, Button } from "@chakra-ui/react"
import axios from "axios";
import React, { useState } from "react";
import {
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'
export default function MyTeamScreen() {

    const [teamMembers, setteamMembers] = useState([]);
    const clickViewTeamMembersButton = async () => {
        let members = await axios.request({
            method: "GET",
            url: "http://127.0.0.1:8000/getAllUsers/",
        })
        setteamMembers(members.data)
        console.log(members.data)


    };
    return (
        <Flex>
            <FormControl id="TeamMembers" padding="3">
                <Button colorScheme="teal" onClick={clickViewTeamMembersButton}>View team members</Button>
                <Table variant='striped' colorScheme='teal'>
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
                        {teamMembers.map((member) => {
                            return (
                                <Tr>
                                    <Td>{member.name}</Td>
                                    <Td>{member.email}</Td>
                                    <Td>{member.username}</Td>
                                    <Td>{member.role}</Td>
                                    <Td>{member.personal_number}</Td>
                                    <Td>{member.career_level}</Td>
                                    <Td>{member.fiscal_year}</Td>
                                    <Td>{member.organisational_assignment}</Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </FormControl>
        </Flex>
    );
}