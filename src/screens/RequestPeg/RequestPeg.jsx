import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/accordion";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
export default function RequestPeg() {
	const [pegs, setpegs] = useState([]);
	useEffect(() => {
		fetch("http://127.0.0.1:8000/allPegs/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setpegs(data);
			});
	}, []);

	return (
		<Flex flexDir="column" h="90vh" overflowY="scroll" w="80vw">
			<Heading>All PEGs</Heading>
			<Accordion allowToggle mt="1vh" px="1vh">
				{pegs.map((peg, i) => (
					<AccordionItem key={i} border="none">
						<AccordionButton p="2vh" borderWidth={1} borderRadius={20} my="2vh">
							<Flex flex="1" textAlign="left" align="center">
								<Flex w="100%" justify="center" flexDir="column">
									<Text fontWeight="bold">#{i} PEG</Text>
									{/* <Text>{peg["Customer name"]}</Text> */}
									<Text>Cand: {new Date(peg["Date of PEG"]).toLocaleDateString("en-US")}</Text>
									<Text>De catre: {peg["Evaluator name"]}</Text>
									{/* <Text>{peg["Fiscal year"]}</Text> */}
									{/* <Text>{peg["Manager name"]}</Text> */}
									{/* <Text>{peg["Number of project days evaluated"]}</Text> */}
									{/* <Text>{peg["Personal Number"]}</Text> */}
									{/* <Text>{peg["Project id"]}</Text> */}
									<Text>Pe ce proiect: {peg["Project name"]}</Text>
									{/* <Text>{peg["Status"]}</Text> */}
									{/* <Text>{peg["User id"]}</Text> */}
								</Flex>
							</Flex>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							{peg["Status"] == "completed" ? (
								<>
									<Table variant="simple">
										<Thead>
											<Tr>
												<Th>Criteria</Th>
												<Th isNumeric>Rating</Th>
												<Th>Description</Th>
												<Th>Comments</Th>
											</Tr>
										</Thead>
										<Tbody>
											<Tr>
												<Td>{peg.result["customer_focus"].name}</Td>
												<Td isNumeric>{peg.result["customer_focus"].rating}</Td>
												<Td>{peg.result["customer_focus"].description}</Td>
												<Td>{peg.result["customer_focus"].comments}</Td>
											</Tr>
											<Tr>
												<Td>{peg.result["employee_focus"].name}</Td>
												<Td isNumeric>{peg.result["employee_focus"].rating}</Td>
												<Td>{peg.result["employee_focus"].description}</Td>
												<Td>{peg.result["employee_focus"].comments}</Td>
											</Tr>
											<Tr>
												<Td>{peg.result["excellence_focus"].name}</Td>
												<Td isNumeric>{peg.result["excellence_focus"].rating}</Td>
												<Td>{peg.result["excellence_focus"].description}</Td>
												<Td>{peg.result["excellence_focus"].comments}</Td>
											</Tr>
											<Tr>
												<Td>{peg.result["strategy_focus"].name}</Td>
												<Td isNumeric>{peg.result["strategy_focus"].rating}</Td>
												<Td>{peg.result["strategy_focus"].description}</Td>
												<Td>{peg.result["strategy_focus"].comments}</Td>
											</Tr>
											<Tr>
												<Td>{peg.result["proj_program_management"].name}</Td>
												<Td isNumeric>{peg.result["proj_program_management"].rating}</Td>
												<Td>{peg.result["proj_program_management"].description}</Td>
												<Td>{peg.result["proj_program_management"].comments}</Td>
											</Tr>
											<Tr>
												<Td>{peg.result["prof_industry_exp"].name}</Td>
												<Td isNumeric>{peg.result["prof_industry_exp"].rating}</Td>
												<Td>{peg.result["prof_industry_exp"].description}</Td>
												<Td>{peg.result["prof_industry_exp"].comments}</Td>
											</Tr>
										</Tbody>
									</Table>
									<Text>Overall Rating: {peg.result.overall_rating}</Text>
								</>
							) : (
								<Text color={"teal.600"}>PEG not received yet.</Text>
							)}

							{/* <Text color={!obj.text && "teal.600"}>{obj.text ? obj.text : "Feedback not received yet."}</Text> */}
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</Flex>
	);
}
