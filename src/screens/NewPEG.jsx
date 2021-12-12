import { Flex, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function NewPEG() {
    const toast = useToast();
    const [pegId, setpegId] = useState();
    const [employeeName, setemployeeName] = useState();
    const [currentCareerLevel, setcurrentCareerLevel] = useState();
    const [organizationalAssignment, setorganizationalAssignment] = useState();
    const [pegDate, setpegDate] = useState();
    const [projectId, setprojectId] = useState();
    const [customerName, setcustomerName] = useState();
    const [nameOfProject, setnameOfProject] = useState();
    const [nameOfProjectManager, setnameOfProjectManager] = useState();
    const [nameOfProjectEvaluator, setnameOfProjectEvaluator] = useState();
    const [numberProjectDaysEvaluated, setnumberProjectDaysEvaluated] =
        useState();

    const clickSubmitRequestButton = async () => {
        let peg = {
            fiscal_year: 2021,
            employee_name: employeeName,
            peg_id: pegId,
            current_career_level: currentCareerLevel,
            org_assignment: organizationalAssignment,
            date_of_peg: new Date(pegDate).toLocaleString("en-us"),
            project_id: projectId,
            customer_name: customerName,
            name_of_project: nameOfProject,
            name_of_manager: nameOfProjectManager,
            evaluator_name: nameOfProjectEvaluator,
            no_of_project_days_evaluated: 1,
            user_id: "test",
            criteria: 1,
            status: "pending"
        };
        try {
            await axios.request({
                method: "POST",
                url: "http://127.0.0.1:8000/addPeg/",
                data: peg,
            })
            //toast succes
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
            })
        }


        //error

    };

    return (
        <Flex flexDir="column" w="60vh">
            <FormControl id="employee-name" isDisabled>
                <FormLabel>Employee name</FormLabel>
                <Input
                    type="text"
                    onChange={(event) => setemployeeName(event.target.value)}
                />
            </FormControl>
            <FormControl id="personnel-number">
                <FormLabel>Personnel number</FormLabel>
                <Input type="text" onChange={(event) => setpegId(event.target.value)} />
            </FormControl>
            <FormControl id="current-career-level">
                <FormLabel>Current career level</FormLabel>
                <Input
                    type="text"
                    onChange={(event) => setcurrentCareerLevel(event.target.value)}
                />
            </FormControl>
            <FormControl id="organizational-assignment">
                <FormLabel>Organizational assignment</FormLabel>
                <Input
                    type=""
                    onChange={(event) => setorganizationalAssignment(event.target.value)}
                />
            </FormControl>
            <FormControl id="peg-date">
                <FormLabel>Date of PEG</FormLabel>
                <Input
                    type="date"
                    onChange={(event) => setpegDate(event.target.value)}
                />
            </FormControl>
            <FormControl id="project-id">
                <FormLabel>Project ID</FormLabel>
                <Input
                    type="text"
                    onChange={(event) => setprojectId(event.target.value)}
                />
            </FormControl>
            <FormControl id="customer-name">
                <FormLabel>Customer name</FormLabel>
                <Input
                    type="text"
                    onChange={(event) => setcustomerName(event.target.value)}
                />
            </FormControl>
            <FormControl id="name-of-project">
                <FormLabel>Name of the project</FormLabel>
                <Input
                    type="text"
                    onChange={(event) => setnameOfProject(event.target.value)}
                />
            </FormControl>
            <FormControl id="name-of-project-manager">
                <FormLabel>Name of the project manager</FormLabel>
                <Input
                    type="text"
                    onChange={(event) => setnameOfProjectManager(event.target.value)}
                />
            </FormControl>
            <FormControl id="name-of-evaluator">
                <FormLabel>Name of the project evaluator</FormLabel>
                <Input
                    type="text"
                    onChange={(event) => setnameOfProjectEvaluator(event.target.value)}
                />
            </FormControl>
            <FormControl id="number-of-project-days-evaluated">
                <FormLabel>Number of project days evaluated</FormLabel>
                <Input
                    type="text"
                    onChange={(event) =>
                        setnumberProjectDaysEvaluated(event.target.value)
                    }
                />
            </FormControl>
            <Box align="center" padding="5">
                <FormControl>
                    <Button colorScheme="teal" onClick={clickSubmitRequestButton}>
                        Submit request
                    </Button>
                </FormControl>
            </Box>
        </Flex>
    );
}
