import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard07 from "../partials/fishermenLists/DashboardCard07";

function Dashboard() {
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
					headerName="Dashboard"
				/>

				<main className="grow">
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
						{/* Dashboard actions */}
						<div className="sm:flex sm:justify-between sm:items-center mb-8">
							{/* Left: Title */}
							<div className="mb-4 sm:mb-0">
								<h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
							</div>

							{/* Right: Actions */}
						</div>

						{/* Cards */}
						<div className="grid grid-cols-12 gap-6">
							{/* Fishermen who registered */}
							<DashboardCard01 />

							{/* Fish caught today */}
							<DashboardCard02 />

							{/* Profit gained today */}
							<DashboardCard03 />
							<div className="mb-14"></div>
							{/* Bar chart Sales */}
							<DashboardCard04 />

							{/* Table Registered Fishermen */}
							<DashboardCard07 isListPage={false} />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Dashboard;
