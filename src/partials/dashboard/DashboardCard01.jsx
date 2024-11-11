import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import fishermenRegistered from "../../images/fishermenRegistered.png";
import Bubbles from "../../components/Bubbles";
import api from "../../assets/api";

function DashboardCard01() {
	const [nonSuperUserCount, setNonSuperUserCount] = useState(0);

	useEffect(() => {
		// Fetch data from the API
		api
			.get("/api/non-superuser-count/")
			.then((response) => {
				// Set the count to the state
				setNonSuperUserCount(response.data.non_superuser_count);
			})
			.catch((error) => {
				console.error("Error fetching non-superuser count:", error);
			});
	}, []);

	return (
		<div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
			<div className="px-5 pt-5">
				<header className="flex justify-between items-start mb-2">
					<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Registered Fishermen</h2>
				</header>
				<div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">total</div>
				<div className="flex items-start">
					<div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
						<CountUp
							end={nonSuperUserCount}
							duration={2.75}
						/>
					</div>
				</div>
			</div>

			<div className="grow max-sm:max-h-[128px] xl:max-h-[128px] ocean">
				<img
					src={fishermenRegistered}
					className="w-[80%] mx-auto"
					alt=""
				/>
				<Bubbles />
			</div>
		</div>
	);
}

export default DashboardCard01;
