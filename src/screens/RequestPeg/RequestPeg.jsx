import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/accordion";
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
									<Text>{peg["Customer name"]}</Text>
									<Text>{new Date(peg["Date of PEG"]).toLocaleDateString("en-US")}</Text>
									<Text>{peg["Evaluator name"]}</Text>
									<Text>{peg["Fiscal year"]}</Text>
									<Text>{peg["Manager name"]}</Text>
									<Text>{peg["Number of project days evaluated"]}</Text>
									<Text>{peg["Personal Number"]}</Text>
									<Text>{peg["Project id"]}</Text>
									<Text>{peg["Project name"]}</Text>
									<Text>{peg["Status"]}</Text>
									<Text>{peg["User id"]}</Text>
								</Flex>
							</Flex>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<Text>{peg["Status"]}</Text>
							{/* <Text color={!obj.text && "teal.600"}>{obj.text ? obj.text : "Feedback not received yet."}</Text> */}
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</Flex>
	);
}
