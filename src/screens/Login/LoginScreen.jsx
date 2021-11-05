import { Flex } from '@chakra-ui/react'
import { GridItem, Text } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user/user-slice';
import {
    FormControl,
    FormLabel,
    Input,
    Grid,
    Box
} from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

export default function LoginScreen() {
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);

    useEffect(() => {
        dispatch(userActions.setUsername({ username: "Dummy rname" }));
    }, [dispatch, username]);
    return (
        <Flex w="100vw" h="100vh" justify="center" align="center">
            <Grid>
                <Box>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder="Email" />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type={"password"} placeholder="Password" />
                    </FormControl>
                </Box>
                <Box align="center">
                    <FormControl>
                        <Button colorScheme="blue">Log In</Button>
                    </FormControl>
                </Box>
            </Grid>  
        </Flex>

        // <Grid templateColumns="repeat(3, 1fr)" gap={2} h="100vh">
        //     <GridItem></GridItem>

        //     <GridItem>
        //         <FormControl id="email" isRequired>
        //             <FormLabel>Email</FormLabel>
        //             <Input placeholder="Email" />
        //         </FormControl>
        //         <FormControl id="password" isRequired>
        //             <FormLabel>Password</FormLabel>
        //             <Input type={"password"} placeholder="Password" />
        //         </FormControl>
        //         <FormControl>
        //             <Button colorScheme="blue">Log In</Button>
        //         </FormControl>
        //     </GridItem>

        //     <GridItem></GridItem>
        // </Grid>

    )
}
