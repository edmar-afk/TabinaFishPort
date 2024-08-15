import React, { useState } from "react";
import CountUp from "react-countup";
import catchFish from "../../images/catchFish.png";
import Bubbles from "../../components/Bubbles";
import FishCaughtModal from "./FishCaughtModal"; // Adjust the path as needed

function DashboardCard02() {
	const [isModalOpen, setIsModalOpen] = useState(false);

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
					<div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total Kilo</div>
					<div className="flex items-start">
						<div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
							<CountUp
								end={150}
								duration={2.75}
							/>
						</div>
						Kg
					</div>
				</div>
				<div className="grow max-sm:max-h-[128px] max-h-[128px] relative ocean">
					<img
						src={catchFish}
						className="w-[45%] mx-auto"
						alt=""
					/>
					<Bubbles />
				</div>
			</div>

			{/* Modal Component */}
			<FishCaughtModal
				isOpen={isModalOpen}
				handleClose={handleCloseModal}
			/>
		</>
	);
}

export default DashboardCard02;
