import React, { useEffect, useState, useRef } from "react";
import BarChart from "../../charts/BarChart01";
import Bubbles from "../../components/Bubbles";
import api from "../../assets/api"; // Import API utility
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04() {
	const [fishTypes, setFishTypes] = useState([]); // State to store fish types
	const [weighInData, setWeighInData] = useState({}); // State to store weigh-in data
	const [selectedDate, setSelectedDate] = useState(
		localStorage.getItem("selectedDate") || new Date().toISOString().split("T")[0]
	); // Retrieve date from localStorage

	const chartRef = useRef(null); // Ref for BarChart component to scroll to it

	// Fetch fish types and weigh-in data based on the selected date
	const fetchFishData = async (date) => {
		try {
			// Fetch fish types
			const fishResponse = await api.get("/api/fishtypes/list/");
			const fishData = fishResponse.data;
			setFishTypes(fishData);

			// Fetch weigh-in data for each fish type based on the selected date
			const data = {};

			for (const fish of fishData) {
				try {
					// Update the request URL to include the date in the path
					const response = await api.get(`/api/weighin/${fish.name}/${date}/`);

					const weighIn = response.data;
					if (weighIn?.total_kg) {
						data[fish.name] = weighIn.total_kg; // Set to the actual value
					} else {
						data[fish.name] = 0; // Default to 0 if no data found
					}
				} catch (error) {
					console.error(`Error fetching data for ${fish.name}:`, error);
					data[fish.name] = 0; // Default to 0 if error occurs
				}
			}
			console.log("Updated weighInData:", data); // Log the updated weigh-in data
			setWeighInData(data); // Set updated weigh-in data
		} catch (err) {
			console.error("Error fetching fish types or weigh-in data:", err);
		}
	};

	// useEffect hook to fetch data when the selected date changes
	useEffect(() => {
		// Store the selected date in localStorage
		localStorage.setItem("selectedDate", selectedDate);
		
		fetchFishData(selectedDate); // Fetch weigh-in data based on the selected date
	}, [selectedDate]); // Trigger whenever selectedDate changes

	// Handle form submission for date selection
	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		localStorage.setItem("selectedDate", selectedDate); // Store date in localStorage
		window.location.reload(); // Reload the page to reflect the new date
	};

	// Ensure chartData is ready
	const chartData = {
		labels: fishTypes.map((fish) => fish.name),
		datasets: [
			{
				label: fishTypes.length > 0 ? `Fish Caught in ${selectedDate}` : "Fish Types Daily Kg Caught",
				data: fishTypes.map((fish) => weighInData[fish.name] || 0), // Ensure weighInData is correctly accessed
				backgroundColor: tailwindConfig().theme.colors.sky[500],
				hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
				barPercentage: 0.7,
				categoryPercentage: 0.7,
				borderRadius: 4,
			},
		],
	};

	// Scroll to BarChart after page reload
	useEffect(() => {
		if (chartRef.current) {
			// Delay the scroll to ensure the page has fully loaded
			setTimeout(() => {
				chartRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
			}, 500); // 500ms delay
		}
	}, [selectedDate]);

	if (fishTypes.length === 0 || Object.keys(weighInData).length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col col-span-full bg-white dark:bg-gray-800 shadow-sm rounded-xl w-full ocean">
			<header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex flex-row justify-between">
				<h2 className="font-semibold text-gray-800 dark:text-gray-100">Fish Caught Report</h2>
				{/* Date Input Form */}
				<form
					onSubmit={handleSubmit}
					className="flex items-center space-x-2">
					<input
						type="date"
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)} // Update selected date
						className="border border-gray-300 rounded px-2 py-1"
					/>
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
						Check
					</button>
				</form>
			</header>

			{/* BarChart with ref to scroll to */}
			<div ref={chartRef}>
				<BarChart
					data={chartData}
					width={595}
					height={248}
				/>
			</div>

			<Bubbles />
		</div>
	);
}

export default DashboardCard04;
