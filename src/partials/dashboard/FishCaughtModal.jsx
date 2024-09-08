import React, { useState, useEffect } from "react";import { Modal } from "@mui/material";
import { format } from "date-fns";
import api from "../../assets/api";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import CloseIcon from "@mui/icons-material/Close";

const FishCaughtModal = ({ isOpen, handleClose }) => {
	const [currentDateTime, setCurrentDateTime] = useState("");
	const [fishData, setFishData] = useState([]);
	const [isDescending, setIsDescending] = useState(true); 

	useEffect(() => {
		const updateDateTime = () => {
			const now = new Date();
			setCurrentDateTime(format(now, "MMM dd yyyy, hh:mm:ss a")); 
		};

		updateDateTime();
		const intervalId = setInterval(updateDateTime, 1000); 
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		const fetchFishData = async () => {
			try {
				const response = await api.get("/api/fish-totals/"); 
				const data = response.data;

			
				const sortedData = data.sort((a, b) => (isDescending ? b.total_kg - a.total_kg : a.total_kg - b.total_kg));

				setFishData(sortedData);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			}
		};

		if (isOpen) {
			fetchFishData();
		}
	}, [isOpen, isDescending]);

	const handleSortToggle = () => {
		setIsDescending((prev) => !prev);
	};

	return (
		<Modal
			open={isOpen}
			onClose={handleClose} 
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<div className="fixed inset-0 flex items-center justify-center">
				<div className="bg-white overflow-y-scroll dark:bg-gray-800 p-6 border-2 border-black dark:border-white shadow-xl rounded-lg w-full h-full mx-auto relative min-h-[200px] max-h-[500px] min-w-[360px] max-w-[400px]">
					
					<div className="text-gray-800 text-sm dark:text-white sticky -top-6 py-4 bg-white dark:bg-gray-800/20 backdrop-blur-lg">
						As Of {currentDateTime}, here's the list of fish that were caught in Tabina Fish Port.
                    </div>
                    
                    <p className="text-center text-xs py-4 animate-pulse text-gray-600 dark:text-gray-300">Click the table to close</p>
					<div>
						<button
							className="text-sm font-bold mb-2 mt-4 flex items-center"
							onClick={handleSortToggle}>
							<SortOutlinedIcon />
							Sort {isDescending ? "(High to Low)" : "(Low to High)"}
						</button>
						<table
							onClick={handleClose}
							className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
										Fish
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
										Total Kilos
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
								{fishData.map((fish, index) => (
									<tr key={index}>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
											{fish.fish}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
											{fish.total_kg}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default FishCaughtModal;
