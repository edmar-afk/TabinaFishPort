import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import catchFish from "../../images/catchFish.png";
import Bubbles from "../../components/Bubbles";
import FishCaughtModal from "./FishCaughtModal";
import api from "../../assets/api";

function DashboardCard02() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [totalWeight, setTotalWeight] = useState(0); // State for total weight
	const [totalPrice, setTotalPrice] = useState(0); // State for total price

	// Fetch the total weight of fish caught today
	useEffect(() => {
		const fetchTotalWeight = async () => {
			try {
				const response = await api.get("/api/total-weight-today/"); // Update with your actual API endpoint
				setTotalWeight(response.data.total_weight_today); // Set the fetched total weight
			} catch (error) {
				console.error("Error fetching total weight:", error);
			}
		};

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

		fetchTotalWeight();
	}, []);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div
				onClick={handleOpenModal}
				className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl cursor-pointer">
				<div className="px-5 pt-5">
					<header className="flex justify-between items-start mb-2">
						<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Estimated Fish caught today</h2>
					</header>

					<div className="flex flex-row justify-between">
						<div>
							<div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total Kilo</div>
							<div className="flex items-start">
								<div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
									<CountUp
										end={totalWeight} // Dynamically display the fetched total weight
										duration={2.75}
									/>
								</div>
								Kg
							</div>
						</div>

						<div>
							<div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
								Total Fish Income
							</div>
							<div className="flex justify-end">
								<div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
									<CountUp
										end={totalPrice} // Dynamically display the fetched total price
										duration={2.75}
										prefix="₱" // Optional: Display dollar sign for price
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="grow max-sm:max-h-[128px] max-h-[128px] relative ocean">
					<img
						src={catchFish}
						className="w-[45%] mx-auto"
						alt="Catch Fish"
					/>
					<Bubbles />
				</div>
			</div>

			<FishCaughtModal
				isOpen={isModalOpen}
				handleClose={handleCloseModal}
			/>
		</>
	);
}

export default DashboardCard02;
