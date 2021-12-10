import { Flex } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user/user-slice";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    FormHelperText,
} from "@chakra-ui/react"
import { auth } from "../firebase";

export default function NewPEG() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    return (
        <Flex flexDir="column" w="60vh">
            <Heading>Request new PEG</Heading>
            <FormControl id="employee-name" isDisabled>
                <FormLabel>Employee name</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl id="personnel-number">
                <FormLabel>Personnel number</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl id="current-career-level">
                <FormLabel>Current career level</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl id="organizational-assignment">
                <FormLabel>Organizational assignment</FormLabel>
                <Input type="" />
            </FormControl>
            <FormControl id="peg-date">
                <FormLabel>Date of PEG</FormLabel>
                <Input type="date" />
            </FormControl>
            <FormControl id="project-id">
                <FormLabel>Project ID</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl id="customer-name">
                <FormLabel>Customer name</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl id="name-of-project">
                <FormLabel>Name of the project</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl id="name-of-project-manager">
                <FormLabel>Name of the project</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl id="name-of-evaluator">
                <FormLabel>Name of the project</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl id="number-of-project-days-evaluated">
                <FormLabel>Number of project days evaluated</FormLabel>
                <Input type="text" />
            </FormControl>
        </Flex>
    );
}
