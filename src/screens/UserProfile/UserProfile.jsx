import { Flex } from '@chakra-ui/react'
import { Center, Text } from '@chakra-ui/layout'
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
    <Flex flexDirection="column" justify="left" align="left">

        <FormControl id="Email" isDisabled={true} padding="3">
            <FormLabel>Email: </FormLabel>
            <Input type="Email" style={{width: "370px"}} />
        </FormControl>

        <FormControl id="Username" isDisabled={true} padding="3">
            <FormLabel>Username: </FormLabel>
            <Input type="Username" style={{width: "370px"}} />
        </FormControl>

        <FormControl id="Name" isDisabled={false} padding="3">
            <FormLabel>Full Name: </FormLabel>
            <Input type="Name" style={{width: "370px"}} />
            <FormHelperText>Enter your first and last Name</FormHelperText >
        </FormControl>

        <FormControl id="FiscalYear" isDisabled={true} padding="3">
            <FormLabel>Fiscal Year: </FormLabel>
            <Input type="FiscalYear" style={{width: "370px"}} />
        </FormControl>

        <FormControl id="PersonalNumber" isDisabled={true} padding="3">
            <FormLabel>Personal Number: </FormLabel>
            <Input type="PersonalNumber" style={{width: "370px"}} />
        </FormControl>

        <FormControl id="CareerLevel" padding="3">
            <FormLabel>Career Level: </FormLabel>
                <Select placeholder="Select career level" style={{width: "370px"}} >
                    <option>Option1</option>
                    <option>Option2</option>
                </Select>
        </FormControl>

        <FormControl id="OrganizationalAssignments" padding="3">
            <FormLabel>Organizational Assignments: </FormLabel>
                <Select placeholder="Select Organizational Assignments" style={{width: "370px"}} >
                    <option>Option1</option>
                    <option>Option2</option>
                </Select>
        </FormControl>

    </Flex>
    )
}
