import { Flex } from '@chakra-ui/react'
import React from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    Grid,
    Box
} from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

export default function RegisterScreen() {
    return (
        <Flex w="100vw" h="100vh" justify="center" align="center">
            <Grid>
                <Box padding="1">
                    <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input placeholder="Name" />
                    </FormControl>
                </Box>
                <Box padding="1">
                    <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder="Email" />
                    </FormControl>
                </Box>
                <Box padding="1">
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type={"password"} placeholder="Password" />
                    </FormControl>
                </Box>
                <Box padding="1">
                    <FormControl id="confirmPassword" isRequired>
                        <FormLabel>Confirm password</FormLabel>
                        <Input type={"password"} placeholder="Please confirm password" />
                    </FormControl>
                </Box>
                <Box align="center" padding="10">
                    <FormControl>
                        <Button colorScheme="blue">Register</Button>
                    </FormControl>
                </Box>
            </Grid>
        </Flex>
    )
}
