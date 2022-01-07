import {
  Flex,
  Heading,
  Text,
  Button,
  Textarea,
  useColorModeValue,
  FormErrorMessage,
  Input,
  FormControl,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { API } from "../../utils/API";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function NewPEG() {
  const toast = useToast();
  const modalVariant = useColorModeValue("gray.200", "teal.800");

  const user = useSelector((state) => state.user);
  const feedbackRef = useRef(null);

  // data
  const [feedbacks, setFeedbacks] = useState([]);
  const [PEGs, setPEGs] = useState([]);
  const [openFeedback, setOpenFeedback] = useState(null);
  const [openPEG, setOpenPEG] = useState(null);

  // load initial data
  React.useEffect(() => {
    (async () => {
      // get feedbacks
      let response = await axios.request({
        method: "GET",
        url: API.backend + "getAllFeedback",
      });

      setFeedbacks(
        response.data.filter(
          (f) => f.to_user_id === user.email && f.status === "sent"
        )
      );

      // get pegs
      response = await axios.request({
        method: "GET",
        url: API.backend + "allPegs",
      });

      console.log(user.uid)

      let filteredPEGs = response.data.filter(
        (p) => p["User id"] === user.uid && p.Status === "pending"
      );

      setPEGs(filteredPEGs);
    })();
  }, [user]);

  // send feedback to backend
  const sendFeedback = async (id) => {
    let myId = id;
    let text = feedbackRef.current.value;

    if (!text) {
      toast({
        title: "Error.",
        description: "Text cannot be null.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    setOpenFeedback(null);

    // update doc in firebase
    const docRef = doc(db, "feedback", myId);
    await updateDoc(docRef, {
      text: text,
      status: "received",
    });

    // remove feedback from list
    setFeedbacks((current) => current.filter((f) => f.uid !== myId));

    toast({
      title: "Succes.",
      description: "Feedback sent.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const validateRating = (value) => {
    let error;
    if (!(value > 0 && value <= 10)) {
      error = "Rating from 1 to 10 is required.";
    }
    return error;
  };

  const submitForm = async (values) => {
    const myResult = {
      peg_id: openPEG,
      prof_industry_exp: {
        name: "Industry Experience",
        rating: values.prof_industry_exp_rating,
        description: values.prof_industry_exp_desc,
        comments: values.prof_industry_exp_comm,
      },
      proj_program_management: {
        name: "Program management",
        rating: values.proj_program_management_rating,
        description: values.prof_industry_exp_desc,
        comments: values.proj_program_management_comm,
      },
      strategy_focus: {
        name: "Strategy focus",
        rating: values.strategy_focus_rating,
        description: values.strategy_focus_desc,
        comments: values.strategy_focus_comm,
      },
      customer_focus: {
        name: "Customer focus",
        rating: values.customer_focus_rating,
        description: values.customer_focus_desc,
        comments: values.customer_focus_comm,
      },
      employee_focus: {
        name: "Employee focus",
        rating: values.employee_focus_rating,
        description: values.employee_focus_desc,
        comments: values.employee_focus_comm,
      },
      excellence_focus: {
        name: "Excellence focus",
        rating: values.excellence_focus_rating,
        description: values.excellence_focus_desc,
        comments: values.excellence_focus_comm,
      },
      overall_rating: (
        (parseInt(values.prof_industry_exp_rating) +
          parseInt(values.proj_program_management_rating) +
          parseInt(values.strategy_focus_rating) +
          parseInt(values.customer_focus_rating) +
          parseInt(values.employee_focus_rating) +
          parseInt(values.excellence_focus_rating)) /
        6
      ).toFixed(2),
    };

    // update doc in firebase
    const docRef = doc(db, "peg", openPEG);
    await updateDoc(docRef, {
      result: myResult,
      Status: "completed",
    });

    // remove peg from list
    setPEGs((current) => current.filter((p) => p.id !== openPEG));
    setOpenPEG(null);

    toast({
      title: "Succes.",
      description: "PEG sent.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Flex w="100%" px="5vh" h="100%">
      {/* Open modal Feedback */}
      {openFeedback && (
        <Flex
          pos="absolute"
          w="100vw"
          h="100vh"
          top="0"
          left="0"
          justify="center"
          align="center"
          backgroundColor="rgb(0,0,0,0.7)"
          zIndex="10"
        >
          <Flex
            flexDir="column"
            w="30vw"
            bgColor={modalVariant}
            p="5vh"
            borderRadius={5}
          >
            <Text fontWeight="bold">Write your feedback</Text>
            <Textarea
              mt="1vh"
              placeholder="Hello there.."
              ref={feedbackRef}
            ></Textarea>
            <Flex mt="1vh">
              <Button onClick={() => sendFeedback(openFeedback)} w="50%">
                Send
              </Button>
              <Button onClick={() => setOpenFeedback(null)} w="50%" ml="1vh">
                Close
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}

      {/* Open modal PEG */}
      {openPEG && (
        <Flex
          pos="absolute"
          w="100vw"
          h="100vh"
          top="0"
          left="0"
          justify="center"
          align="center"
          backgroundColor="rgb(0,0,0,0.7)"
          zIndex="10"
        >
          <Flex
            flexDir="column"
            w="60vw"
            bgColor={modalVariant}
            p="5vh"
            borderRadius={5}
          >
            <Text fontWeight="bold">Resolve PEG request</Text>
            <Formik
              initialValues={{
                prof_industry_exp_rating: 5,
                proj_program_management_rating: 5,
                strategy_focus_rating: 5,
                customer_focus_rating: 5,
                employee_focus_rating: 5,
                excellence_focus_rating: 5,
                prof_industry_exp_desc: "",
                proj_program_management_desc: "",
                strategy_focus_desc: "",
                customer_focus_desc: "",
                employee_focus_desc: "",
                excellence_focus_desc: "",
                prof_industry_exp_comm: "",
                proj_program_management_comm: "",
                strategy_focus_comm: "",
                customer_focus_comm: "",
                employee_focus_comm: "",
                excellence_focus_comm: "",
              }}
              onSubmit={(values, actions) => {
                submitForm(values);
              }}
            >
              {(props) => (
                <Form>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Criteria</Th>
                        <Th>Rating</Th>
                        <Th>Description</Th>
                        <Th>Comments</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>Industry Experience</Td>
                        <Td>
                          <Field
                            name="prof_industry_exp_rating"
                            validate={validateRating}
                          >
                            {({ field, form }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="prof_industry_exp_rating"
                                  type="number"
                                  type="number"
                                  placeholder="5"
                                />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="prof_industry_exp_desc">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="prof_industry_exp_desc"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="prof_industry_exp_comm">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="prof_industry_exp_comm"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Project Management</Td>
                        <Td>
                          <Field
                            name="proj_program_management_rating"
                            validate={validateRating}
                          >
                            {({ field, form }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="proj_program_management_rating"
                                  type="number"
                                  placeholder="5"
                                />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="proj_program_management_desc">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="proj_program_management_desc"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="proj_program_management_comm">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="proj_program_management_comm"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Strategy Focus</Td>
                        <Td>
                          <Field
                            name="strategy_focus_rating"
                            validate={validateRating}
                          >
                            {({ field, form }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="strategy_focus_rating"
                                  type="number"
                                  placeholder="5"
                                />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="strategy_focus_desc">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="strategy_focus_desc"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="strategy_focus_comm">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="strategy_focus_comm"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Customer Focus</Td>
                        <Td>
                          <Field
                            name="customer_focus_rating"
                            validate={validateRating}
                          >
                            {({ field, form }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="customer_focus_rating"
                                  type="number"
                                  placeholder="5"
                                />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="customer_focus_desc">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="customer_focus_desc"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="customer_focus_comm">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="customer_focus_comm"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Employee Focus</Td>
                        <Td>
                          <Field
                            name="employee_focus_rating"
                            validate={validateRating}
                          >
                            {({ field, form }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="employee_focus_rating"
                                  type="number"
                                  placeholder="5"
                                />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="employee_focus_desc">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="employee_focus_desc"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="employee_focus_comm">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="employee_focus_comm"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Excellence Focus</Td>
                        <Td>
                          <Field
                            name="excellence_focus_rating"
                            validate={validateRating}
                          >
                            {({ field, form }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="excellence_focus_rating"
                                  type="number"
                                  placeholder="5"
                                />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="excellence_focus_desc">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="excellence_focus_desc"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field name="excellence_focus_comm">
                            {({ field }) => (
                              <FormControl>
                                <Input
                                  {...field}
                                  id="excellence_focus_comm"
                                  placeholder="Hello.."
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>

                  <Flex mt="1vh">
                    <Button type="submit" w="50%">
                      Send
                    </Button>
                    <Button onClick={() => setOpenPEG(null)} w="50%" ml="1vh">
                      Close
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      )}

      {/* My PEGs */}
      <Flex w="50%" flexDir="column" h="90vh" overflowY="scroll" mr={"1vh"}>
        <Heading mb="3vh">My PEG Requests</Heading>
        {!PEGs.length > 0 && <Text>No PEGs for you.</Text>}
        {PEGs.map((obj, i) => (
          <Flex
            key={i}
            borderWidth={1}
            borderRadius={5}
            p="2vh"
            flexDir="column"
            my="1vh"
          >
            <Text fontWeight="bold" color="teal.500">
              #{i} PEG
            </Text>
            <Text>Evaluator: {obj["Evaluator name"]}</Text>
            <Text>Manager: {obj["Manager name"]}</Text>
            <Text>Project: {obj["Project name"]}</Text>
            <Text>
              Date: {new Date(obj["Date of PEG"]).toLocaleString("en-US")}
            </Text>
            <Flex borderTopWidth={1} w={"100%"} my="1vh"></Flex>
            <Text fontWeight="bold">Resolve request</Text>
            <Button mt="1vh" onClick={() => setOpenPEG(obj.id)}>
              Complete
            </Button>
          </Flex>
        ))}
      </Flex>

      {/* My Requests */}
      <Flex w="50%" flexDir="column" h="90vh" overflowY="scroll">
        <Heading mb="3vh">My Feedback Requests</Heading>
        {!feedbacks.length > 0 && <Text>No requests for you.</Text>}
        {feedbacks.map((obj, i) => (
          <Flex
            key={i}
            borderWidth={1}
            borderRadius={5}
            p="2vh"
            flexDir="column"
            my="1vh"
          >
            <Text fontWeight="bold" color="teal.500">
              #{i} Request
            </Text>
            <Text>Category: {obj.category}</Text>
            <Text>From user: {obj.from_user_id}</Text>
            <Text>Project ID: {obj.project_id}</Text>
            <Text>Date: {new Date(obj.timestamp).toLocaleString("en-US")}</Text>
            <Flex borderTopWidth={1} w={"100%"} my="1vh"></Flex>
            <Text fontWeight="bold">Resolve request</Text>
            <Button mt="1vh" onClick={() => setOpenFeedback(obj.uid)}>
              Complete
            </Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
