import React, { useState } from "react";import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Register from "../partials/registration/Register";
import WeighIn from "../partials/calculate/WeighIn";

function WeightCalculate() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
			/>

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
					headerName="Fish Calculation"
				/>

				<main className="grow">
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
						<div className="sm:flex sm:justify-between sm:items-center mb-8">
							{/* Left: Title */}
							<div className="mb-4 sm:mb-0">
								<h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Fish Calculation</h1>
							</div>

							{/* Right: Actions */}
						</div>
						{/* Cards */}
						<div className="w-full">
							{/* Table Registered Fishermen */}
							<WeighIn />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default WeightCalculate;
