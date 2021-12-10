import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user-slice";
import { useColorMode } from "@chakra-ui/color-mode";
import { Flex, Image } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { logout } from "../../store/user/utils";
import {
  FaCheck,
  FaHome,
  FaList,
  FaMoon,
  FaSignOutAlt,
  FaSun,
  FaUserAlt,
  FaUserCircle,
} from "react-icons/fa";
import LOGO_LIGHT from "../../assets/feedback_light.png";
import LOGO_DARK from "../../assets/feedback_dark.png";

export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const { colorMode, toggleColorMode } = useColorMode();

  const logUserOut = () => {
    logout();
    dispatch(userActions.signOut());
    history.push("/login");
  };

  return (
    <Flex
      flexDir="column"
      w="35vh"
      backgroundColor={useColorModeValue("gray.200", "gray.700")}
      justify="space-between"
      p="1vh"
    >
      {/* Up */}
      <Flex flexDir="column">
        <Flex align="center" mb="3vh">
          <Image
            src={colorMode === "light" ? LOGO_DARK : LOGO_LIGHT}
            w="5vh"
            h="5vh"
          />
          <Heading fontSize="3vh" ml="1vh">
            My-Backfeed
          </Heading>
        </Flex>
        <Button
          justifyContent="flex-start"
          variant="ghost"
          onClick={() => history.push("/")}
          leftIcon={<FaHome />}
          my="1vh"
        >
          <Text>Home</Text>
        </Button>
        <Button
          justifyContent="flex-start"
          variant="ghost"
          onClick={() => history.push("/my-profile")}
          leftIcon={<FaUserAlt />}
          my="1vh"
        >
          <Text>My Profile</Text>
        </Button>
        <Button
          justifyContent="flex-start"
          variant="ghost"
          onClick={() => history.push("/my-requests")}
          leftIcon={<FaCheck />}
          my="1vh"
        >
          <Text>My Requests</Text>
        </Button>
        {user?.role === "Manager" && (
          <Button justifyContent="flex-start" variant="ghost">
            <Text>My Team</Text>
          </Button>
        )}
        <Button
          justifyContent="flex-start"
          variant="ghost"
          onClick={() => history.push("/peg-requests")}
          leftIcon={<FaList />}
          my="1vh"
        >
          <Text>All PEGs</Text>
        </Button>
        <Button
          justifyContent="flex-start"
          variant="ghost"
          onClick={() => history.push("/feedbacks")}
          leftIcon={<FaList />}
          my="1vh"
        >
          <Text>All Feedbacks</Text>
        </Button>
      </Flex>

      {/* Down */}
      <Flex flexDir="column">
        <Button
          justifyContent="flex-start"
          variant="ghost"
          my="1vh"
          _readOnly
          leftIcon={<FaUserCircle />}
        >
          <Text>{user.name}</Text>
        </Button>
        <Button
          justifyContent="flex-start"
          variant="ghost"
          my="1vh"
          onClick={toggleColorMode}
          leftIcon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        >
          <Text>Switch theme</Text>
        </Button>
        <Button
          my="1vh"
          justifyContent="flex-start"
          variant="ghost"
          onClick={logUserOut}
          leftIcon={<FaSignOutAlt />}
        >
          <Text>Log out</Text>
        </Button>
      </Flex>
    </Flex>
  );
}
