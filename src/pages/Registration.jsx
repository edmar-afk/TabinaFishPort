import React, { useState } from "react";import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Register from "../partials/registration/Register";

function Registration() {
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
							
							<Register/>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Registration;
