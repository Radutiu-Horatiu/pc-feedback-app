import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user/user-slice';
import {
    Button,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    Input,
    DrawerHeader,
    DrawerBody,
    useDisclosure
} from "@chakra-ui/react"


export default function Navbar() {
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  

    useEffect(() => {
        dispatch(userActions.setUsername({ username: "Dummy rname" }));
    }, [dispatch, username]);
    return (
        <>
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                Menu
      </Button>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Section</DrawerHeader>

                    <DrawerBody>
                        <p>Content</p>
                        <p>Content</p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}