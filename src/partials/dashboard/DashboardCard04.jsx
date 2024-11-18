import React, { useEffect, useState } from "react";
import BarChart from "../../charts/BarChart01";
import Bubbles from "../../components/Bubbles";
import api from "../../assets/api"; // Import API utility
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04() {
	const [fishTypes, setFishTypes] = useState([]); // State to store fish types
	const [weighInData, setWeighInData] = useState({}); // State to store weigh-in data

	// Update chartData to dynamically use fishTypes for labels and data
	const chartData = {
		labels: fishTypes.map((fish) => fish.name), // Fish names as chart labels
		datasets: [
			{
				label: fishTypes.length > 0 ? `Daily Kg Caught` : "Fish Types Daily Kg Caught",
				data: fishTypes.map((fish) => weighInData[fish.name] || 0), // Map weigh-in data to fish names
				backgroundColor: tailwindConfig().theme.colors.sky[500],
				hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
				barPercentage: 0.7,
				categoryPercentage: 0.7,
				borderRadius: 4,
			},
		],
	};

	// useEffect hook to fetch fish types and weigh-in data
	useEffect(() => {
		// Function to fetch fish types and weigh-in data
		const fetchFishData = async () => {
			try {
				// Fetch fish types from the API
				const fishResponse = await api.get("/api/fishtypes/list/");
				const fishData = fishResponse.data;
				setFishTypes(fishData); // Store the fetched data in state

				// Fetch weigh-in data for each fish type
				const fetchWeighInData = async () => {
					const data = {};
					for (const fish of fishData) {
						const response = await api.get(`/api/weighin/${fish.name}/`);
						const weighIn = response.data; // The response is an object, not an array
						if (weighIn && weighIn.total_kg_today !== undefined) {
							data[fish.name] = weighIn.total_kg_today; // Store the total_kg_today value
						} else {
							console.error(`Unexpected response format for ${fish.name}:`, weighIn);
							data[fish.name] = 0; // Default to 0 if the response is not as expected
						}
					}
					setWeighInData(data); // Update weigh-in data state
				};


				fetchWeighInData(); // Call the fetch for weigh-in data
			} catch (err) {
				console.error("Error fetching fish types or weigh-in data:", err); // Handle errors
			}
		};

		fetchFishData(); // Call the function to fetch fish data and weigh-in data
	}, []); // Empty dependency array ensures this runs only once when the component mounts

	// Ensure chartData is ready
	if (fishTypes.length === 0 || Object.keys(weighInData).length === 0) {
		return <div>Loading...</div>; // Handle loading state
	}

	return (
		<div className="flex flex-col col-span-full bg-white dark:bg-gray-800 shadow-sm rounded-xl w-full ocean">
			<header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex flex-row justify-between">
				<h2 className="font-semibold text-gray-800 dark:text-gray-100">Fish Caught Report</h2>
			</header>

			<BarChart
				data={chartData}
				width={595}
				height={248}
			/>
			<Bubbles />
		</div>
	);
}

export default DashboardCard04;
