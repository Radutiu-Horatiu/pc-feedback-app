import { Flex } from "@chakra-ui/react";
import React from "react";
import { FormControl, FormLabel, Select, FormErrorMessage, FormHelperText, Input} from "@chakra-ui/react"

export default function MyTeamScreen() {
    return (
        <Flex>
            <FormControl id="TeamMembers" padding="3">
                <FormLabel>Team Members: </FormLabel>
                <Select placeholder="Member name" style={{ width: "370px" }} >
                    <option>Member 1</option>
                    <option>Member 2</option>
                </Select>
            </FormControl>
        </Flex>
    );
}