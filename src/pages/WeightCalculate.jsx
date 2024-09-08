import { useState, useEffect } from "react";import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WeighIn from "../partials/calculate/WeighIn";
import api from "../assets/api";

function WeightCalculate() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [fishTypes, setFishTypes] = useState([]);

	useEffect(() => {
		const fetchFishTypes = async () => {
			try {
				const response = await api.get("/api/fishtypes/list/");
				const data = Array.isArray(response.data) ? response.data : [];
				setFishTypes(data);
			} catch (error) {
				console.error("Failed to load fish types.", error);
			}
		};
		fetchFishTypes();
	}, []);

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
			/>

			
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				
				<Header
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
					headerName="Fish Calculation"
				/>

				<main className="grow">
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
						<div className="sm:flex sm:justify-between sm:items-center mb-8">
							
							<div className="mb-4 sm:mb-0">
								<h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Fish Calculation</h1>
							</div>

							
						</div>
					
						<div className="w-full">
						
							<WeighIn fishTypes={fishTypes} />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default WeightCalculate;
