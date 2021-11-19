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
  const user = useSelector((state) => state.user);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    dispatch(userActions.setUsername({ username: "Dummy rname" }));
    console.log(user);
  }, [dispatch, user]);

  return (
    <>
      <Flex flexDir="column" w="15vw" backgroundColor="teal.500">
        <Text>Nav</Text>
        <Button justifyContent="flex-start" variant="ghost">
          <Text>My Profile</Text>
        </Button>
        <Button justifyContent="flex-start" variant="ghost">
          <Text>My Requests</Text>
        </Button>
        { user?.role === "Manager" && 
          <Button justifyContent="flex-start" variant="ghost">
            <Text>My Team</Text>
          </Button>
        }
        <Button justifyContent="flex-start" variant="ghost">
          <Text>All PEGs</Text>
        </Button>
        <Button justifyContent="flex-start" variant="ghost">
          <Text>All Feedbacks</Text>
        </Button>
      </Flex>
    </>
  );
}
