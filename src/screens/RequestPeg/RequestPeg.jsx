import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
export default function RequestPeg() {
	const [pegs, setpegs] = useState(null);
	useEffect(() => {
		fetch("http://127.0.0.1:8000/allPegs/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setpegs(data);
			});
	}, []);
	const refresh = () => {
		console.log("refresh");
	};
	return (
		<Flex>
			<Table variant="simple">
				<TableCaption>PEG REQUESTS</TableCaption>
				<Thead>
					<Tr>
						<Th isNumeric>Criteria</Th>
						<Th>Customer name</Th>
						<Th>Date of PEG</Th>
						<Th>Evaluator Name</Th>
						<Th isNumeric>Fiscal year</Th>
						<Th>Manager name</Th>
						<Th isNumeric>No. of days evaluated</Th>
						<Th isNumeric>Personal Number</Th>
						<Th>Project id</Th>
						<Th>Project name</Th>
						<Th>Status</Th>
						<Th>User id</Th>
					</Tr>
				</Thead>
				<Tbody>
					{pegs?.map((peg) => {
						return (
							<Tr>
								<Td isNumeric>{peg["Criteria"]}</Td>
								<Td>{peg["Customer name"]}</Td>
								<Td>{new Date(peg["Date of PEG"]).toLocaleDateString("en-US")}</Td>
								<Td>{peg["Evaluator name"]}</Td>
								<Td>{peg["Fiscal year"]}</Td>
								<Td>{peg["Manager name"]}</Td>
								<Td>{peg["Number of project days evaluated"]}</Td>
								<Td>{peg["Personal Number"]}</Td>
								<Td>{peg["Project id"]}</Td>
								<Td>{peg["Project name"]}</Td>
								<Td>{peg["Status"]}</Td>
								<Td>{peg["User id"]}</Td>
							</Tr>
						);
					})}
				</Tbody>
				<Tfoot>
					<Tr>
						<Th isNumeric>Criteria</Th>
						<Th>Customer name</Th>
						<Th>Date of PEG</Th>
						<Th>Evaluator Name</Th>
						<Th isNumeric>Fiscal year</Th>
						<Th>Manager name</Th>
						<Th isNumeric>No. of days evaluated</Th>
						<Th isNumeric>Personal Number</Th>
						<Th>Project id</Th>
						<Th>Project name</Th>
						<Th>Status</Th>
						<Th>User id</Th>
					</Tr>
				</Tfoot>
			</Table>
		</Flex>
	);
}
