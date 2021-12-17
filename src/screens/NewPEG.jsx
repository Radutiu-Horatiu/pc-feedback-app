import { Flex } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user/user-slice";
import { FaPaperPlane } from "react-icons/fa";
import { API } from "../utils/API";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { auth } from "../firebase";

export function getCurrentDate(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}

export default function NewPEG() {
  const projectRef = React.useRef(null);
  const customerRef = React.useRef(null);
  const evaluatorRef = React.useRef(null);
  const dispatch = useDispatch();

  const toast = useToast();

  const user = useSelector((state) => state.user);
  const [projectID, setProjectID] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const [nameOfProjectManager, setNameOfProjectManager] = useState(null);
  const [numberOfDaysEvaluated, setNumberOfDaysEvaluated] = useState(null);

  // data
  const [customers, setCustomers] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [projects, setProjects] = useState([]);

  // load initial data
  React.useEffect(() => {
    // (async () => {
    // const response = await axios.request({
    //     method: "GET",
    //     url: API.backend + "getAllUsers",
    // });

    // setUsers(response.data);
    // })();
    setProjects([
      {
        projectId: 1,
        projectName: "name",
        projectManager: "m1",
        evaluator: "ev1",
        customers: ["c1", "c2"],
        projectDays: 10,
      },
      {
        projectId: 2,
        projectName: "name2",
        projectManager: "m12",
        evaluator: "ev12",
        customers: ["c1", "c2"],
        projectDays: 100,
      },
    ]);
  }, []);

  const changeActiveProject = (pName) => {
    const myProject = projects.filter((p) => p.projectName === pName)[0];
    setSelectedProject(myProject);
  };

  const sendNewPEG = async () => {
    if (!projectRef.current.value) {
      toast({
        title: "Fields missing.",
        description: "All fields are mandatory.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const myPEG = {
      from_user_id: user.email,
      employee_name: user.name,
      personnel_number: user.personalNumber,
      current_career_level: user.careerLevel,
      organizational_assignment: user.organizationalAssignment,
      date_of_peg: getCurrentDate("/"),
      name_of_project: projectRef.current.value,
      project_id: projectID,
      number_of_days_evaluated: numberOfDaysEvaluated,
    };

    //   await axios.request({
    //     method: "POST",
    //     url: API.backend + "addFeedback",
    //     data: myFeedback,
    //   });

    //   userRef.current.value = "";
    //   projectRef.current.value = "";
    //   setcategoryValue(null);
    //   setIsAnonym(false);

    //   toast({
    //     title: "Success.",
    //     description: "Request sent successfully.",
    //     status: "success",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top-right",
    //   });
  };

  return (
    <div>
      <Heading>Request new PEG</Heading>
      <Flex flexDir="row" w="100vh">
        <Flex flexDir="column" w="60vh" marginRight="50">
          <FormControl id="employee-name" padding="2" isDisabled>
            <FormLabel>Employee name</FormLabel>
            <Input type="text" value={user.name} />
          </FormControl>
          <FormControl id="personnel-number" padding="2" isDisabled>
            <FormLabel>Personnel number</FormLabel>
            <Input type="text" value={user.personalNumber} />
          </FormControl>
          <FormControl id="current-career-level" padding="2" isDisabled>
            <FormLabel>Current career level</FormLabel>
            <Input type="text" value={user.careerLevel} />
          </FormControl>
          <FormControl id="organizational-assignment" padding="2" isDisabled>
            <FormLabel>Organizational assignment</FormLabel>
            <Input type="" value={user.organizationalAssignment} />
          </FormControl>
          <FormControl id="peg-date" isDisabled padding="2">
            <FormLabel>Date of PEG</FormLabel>
            <Input type="text" value={getCurrentDate("/")} />
          </FormControl>
        </Flex>
        <Flex flexDir="column" w="60vh">
          <FormControl id="name-of-project" padding="2">
            <FormLabel>Name of the project</FormLabel>
            <Select
              placeholder="Select project"
              ref={projectRef}
              onChange={(e) => changeActiveProject(e.target.value)}
            >
              {projects.map((obj, i) => (
                <option key={i}>{obj.projectName}</option>
              ))}
            </Select>
          </FormControl>
          {selectedProject && (
            <Flex flexDir="column">
              <Text>Name: {selectedProject.projectName}</Text>
              <Text>Manager: {selectedProject.projectManager}</Text>
              <Text>Evaluator: {selectedProject.evaluator}</Text>
              <Text>Days: {selectedProject.projectDays}</Text>
            </Flex>
          )}

          {/* <FormControl id="project-id" padding="2">
            <FormLabel>Project ID</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="name-of-project-manager" padding="2">
            <FormLabel>Name of the project manager</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="customer-name" padding="2">
            <FormLabel>Choose customer name:</FormLabel>
            <Select placeholder="Select customer name" ref={customerRef}>
              {customers.map((obj, i) => (
                <option key={i}>{obj}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="name-of-evaluator" padding="2">
            <FormLabel>Name of the evaluator</FormLabel>
            <Select placeholder="Select evaluator" ref={evaluatorRef}>
              {evaluators.map((obj, i) => (
                <option key={i}>{obj}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="number-of-project-days-evaluated" padding="2">
            <FormLabel>Number of project days evaluated</FormLabel>
            <Input type="number" />
          </FormControl> */}
        </Flex>
      </Flex>
      <Button
        isFullWidth="true"
        leftIcon={<FaPaperPlane />}
        mt={3}
        onClick={() => sendNewPEG()}
      >
        Send PEG request
      </Button>
    </div>
  );
}
