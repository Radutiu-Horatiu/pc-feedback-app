import { Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user/user-slice';
import { Tag } from '@chakra-ui/tag';
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
        <Text>Username: {username}</Text>
        <Text>Email: {email}</Text>
        <Text>Name: {name}</Text>
        <Text>Role: {role}</Text>
        <Text>Fiscal Year: {fiscalYear}</Text>
        <Text>Personal Number: {personalNumber}</Text>
        <Text>Career Level: {careerLevel}</Text>
        <Text>Organizational Assignments: {organizationalAssignments}</Text>
    </Flex>
    )
}
