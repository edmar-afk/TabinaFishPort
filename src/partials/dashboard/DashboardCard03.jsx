import React, { useState, useEffect } from "react";
import Bubbles from "../../components/Bubbles";
import profit from "../../images/profit.png";
import CountUp from "react-countup";
import api from "../../assets/api";

function DashboardCard03() {
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		// Fetch the total price for today from the API
		api
			.get("/api/total-price-today/")
			.then((response) => {
				setTotalPrice(response.data.total_price_today); // Update state with the total price
			})
			.catch((error) => {
				console.error("Error fetching total price:", error);
				setTotalPrice(0); // Set to 0 if there's an error
			});
	}, []);

	return (
		<div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
			<div className="px-5 pt-5">
				<header className="flex justify-between items-start mb-2">
					<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">LGU Income gained today</h2>
				</header>
				<div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
				<div className="flex items-start">
					<div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
						₱
						<CountUp
							end={totalPrice} // Dynamically set the end value
							duration={2.75}
							separator=","
							prefix=""
						/>
					</div>
				</div>
			</div>

			<div className="grow max-sm:max-h-[128px] xl:max-h-[128px] ocean">
				<img
					src={profit}
					className="w-[70%] mx-auto"
					alt=""
				/>
				<Bubbles />
			</div>
		</div>
	);
}

export default DashboardCard03;
