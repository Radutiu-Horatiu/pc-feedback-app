import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user-slice";
import { Flex } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router";
import { logout } from "../../store/user/utils";
import { FaCheck, FaHome, FaList, FaSignOutAlt, FaUser } from "react-icons/fa";

export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const logUserOut = () => {
    logout();
    dispatch(userActions.signOut());
    history.push("/login");
  };

  return (
    <Flex
      flexDir="column"
      w="15vw"
      backgroundColor="teal.500"
      justify="space-between"
      p="1vh"
    >
      {/* Up */}
      <Flex flexDir="column">
        <Heading fontSize="3vh" mb="2vh">
          My-Backfeed
        </Heading>
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
					leftIcon={<FaUser />}
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
          onClick={logUserOut}
          leftIcon={<FaSignOutAlt />}
        >
          <Text>Log out</Text>
        </Button>
      </Flex>
    </Flex>
  );
}
