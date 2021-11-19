import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user-slice";
import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
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
  useDisclosure,
} from "@chakra-ui/react";

export default function Navbar() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    dispatch(userActions.setUsername({ username: "Dummy rname" }));
  }, [dispatch, username]);
  return (
    <>
      <Flex w="15vw" h="100vw" backgroundColor="teal.500">
        <Text>Nav</Text>
      </Flex>
      {/* <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
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
      </Drawer> */}
    </>
  );
}
