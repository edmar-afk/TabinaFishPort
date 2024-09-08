import React, { useState } from "react";import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import FishermenReg from "../partials/registration/FishermenReg";

function FishermenRegistration() {
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
					headerName="Vessel Registration"
				/>

				<main className="grow">
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
						
						<div className="w-full">
							
							<FishermenReg />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default FishermenRegistration;
