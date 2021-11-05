import { Flex } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user/user-slice';
import { Link } from "react-router-dom";
export default function HomeScreen() {
  const dispatch = useDispatch();
	const username = useSelector(state => state.user.username);

	useEffect(() => {
		dispatch(userActions.setUsername({username: "Dummy rname"}));
	}, [dispatch, username]);
  return (
    <Flex>
      <Text>{username}</Text>
    </Flex>
    
  )
}
