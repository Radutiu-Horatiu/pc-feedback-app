import { Flex } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaPaperPlane } from "react-icons/fa";
import { API } from "../utils/API";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";

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
  const evaluatorRef = React.useRef(null);

  const toast = useToast();

  const user = useSelector((state) => state.user);
  const [selectedProject, setSelectedProject] = useState(null);

  const availableProjects = [
    "Galactic colonization",
    "Web 3.0",
    "Backfeed-Coin",
  ];

  // data
  const [evaluators, setEvaluators] = useState([]);
  const [projects, setProjects] = useState([]);

  React.useEffect(() => {
    if (!selectedProject) return;
    (async () => {
      let members = await axios.request({
        method: "GET",
        url: "http://127.0.0.1:8000/getAllUsers/",
      });

      const myEvaluators = members.data.filter(
        (m) => m.project === selectedProject.projectName
      );
      let evaluatorsArr = [];
      myEvaluators.forEach((e, i) => {
        evaluatorsArr.push({ evaluatorId: i, evaluatorName: e.name });
      });
      setEvaluators(evaluatorsArr);
    })();
  }, [selectedProject]);

  // load initial data
  React.useEffect(() => {
    setProjects([
      {
        projectId: "1",
        projectName: "Galactic colonization",
        projectManager: "Anda Khreiss",
        evaluator: "Popescu Ioana",
        customers: "Porsche Munchen",
        projectDays: 100,
      },
      {
        projectId: "2",
        projectName: "Web 3.0",
        projectManager: "Popescu Ioana",
        evaluator: "Anda Khreiss",
        customers: "Porsche Stuttgart",
        projectDays: 10,
      },
      {
        projectId: "3",
        projectName: "Backfeed-Coin",
        projectManager: "Andrew Smith",
        evaluator: "Andrew Smith",
        customers: "Porsche Stuttgart",
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
      peg_id: user.personalNumber,
      fiscal_year: 2021,
      user_id: user.uid,
      date_of_peg: getCurrentDate("/"),
      project_id: selectedProject.projectId,
      customer_name: selectedProject.customers,
      name_of_project: projectRef.current.value,
      name_of_manager: selectedProject.projectManager,
      evaluator_name: evaluatorRef.current.value,
      no_of_project_days_evaluated: selectedProject.projectDays,
      criteria: 1,
      status: "pending",
    };

    try {
      await axios.request({
        method: "POST",
        url: API.backend + "addPeg/",
        data: myPEG,
      });
      console.log(myPEG);

      //toast success
      toast({
        title: "Success.",
        description: "PEG added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Failed.",
        description: "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
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
              <FormControl id="project-name" isDisabled padding="2">
                <FormLabel>Name</FormLabel>
                <Input type="text" value={selectedProject.projectName} />
              </FormControl>
              <FormControl id="project-manager" isDisabled padding="2">
                <FormLabel>Manager</FormLabel>
                <Input type="text" value={selectedProject.projectManager} />
              </FormControl>
              {/* <FormControl id="evaluator" isDisabled padding="2">
                <FormLabel>Evaluator</FormLabel>
                <Input type="text" value={selectedProject.evaluator} />
              </FormControl> */}
              <FormControl id="evaluator" padding="2">
                <FormLabel>Name of the evaluator</FormLabel>
                <Select placeholder="Select evaluator" ref={evaluatorRef}>
                  {evaluators.map((obj, i) => (
                    <option key={i}>{obj.evaluatorName}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="evaluator" isDisabled padding="2">
                <FormLabel>Days</FormLabel>
                <Input type="text" value={selectedProject.projectDays} />
              </FormControl>
            </Flex>
          )}
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
