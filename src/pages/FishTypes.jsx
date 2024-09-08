import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import DashboardCard07 from "../partials/fishTypes/DashboardCard07";

function FishTypes() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden">
			
			<Sidebar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
			/>

			
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				
				<Header
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
					headerName="Fish Types"
				/>

				<main className="grow">
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
						
						<div className="sm:flex sm:justify-between sm:items-center mb-8">
							
							<div className="mb-4 sm:mb-0 text-gray-800 dark:text-gray-100">
								<h1 className="text-2xl md:text-3xl font-bold">Lists of Fishes</h1>
								<p>Update the fish's kilo price whenever necessary.</p>
							</div>

						
						</div>

					
						<div className="grid grid-cols-12 gap-6">
							
							<DashboardCard07 isListPage={true} />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default FishTypes;
