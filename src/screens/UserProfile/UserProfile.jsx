import { Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user/user-slice';
import { Tag } from '@chakra-ui/tag';
import { FormControl, FormLabel, Select, FormErrorMessage, FormHelperText, Input} from "@chakra-ui/react"
export default function UserProfile() {
  
    
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);
    const email = useSelector(state => state.user.email);
    const name = useSelector(state => state.user.name);
    const role = useSelector(state => state.user.role);
    const fiscalYear = useSelector(state => state.user.fiscalYear);
    const personalNumber = useSelector(state => state.user.personalNumber);
    const careerLevel = useSelector(state => state.user.careerLevel);
    const organizationalAssignments = useSelector(state => state.user.organizationalAssignments);

    /**useEffect(() => {
		dispatch(userActions.setUsername({username: "Arekkusu Poppu"}));
        
	}, [dispatch, username]);**/
    return (
    <Flex flexDirection="column">

        <FormControl id="Email" isDisabled={true}>
            <FormLabel>Email: </FormLabel>
            <Input type="Email" />
        </FormControl>

        <FormControl id="Username" isDisabled={true}>
            <FormLabel>Username: </FormLabel>
            <Input type="Username" />
        </FormControl>

        <FormControl id="Name" isDisabled={false}>
            <FormLabel>Full Name: </FormLabel>
            <Input type="Name" />
            <FormHelperText>Enter your first and last Name</FormHelperText>
        </FormControl>

        <FormControl id="FiscalYear" isDisabled={true}>
            <FormLabel>Fiscal Year: </FormLabel>
            <Input type="FiscalYear" />
        </FormControl>

        <FormControl id="PersonalNumber" isDisabled={true}>
            <FormLabel>Personal Number: </FormLabel>
            <Input type="PersonalNumber" />
        </FormControl>

        <FormControl id="CareerLevel">
            <FormLabel>Career Level: </FormLabel>
                <Select placeholder="Select career level">
                    <option>Option1</option>
                    <option>Option2</option>
                </Select>
        </FormControl>

        <FormControl id="OrganizationalAssignments">
            <FormLabel>Organizational Assignments: </FormLabel>
                <Select placeholder="Select Organizational Assignments">
                    <option>Option1</option>
                    <option>Option2</option>
                </Select>
        </FormControl>

    </Flex>
    )
}
