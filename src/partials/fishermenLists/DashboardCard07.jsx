import React, { useEffect, useState } from "react";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import me from "../../images/fishermanPic.jpg";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import PhishingIcon from "@mui/icons-material/Phishing";
import SailingIcon from "@mui/icons-material/Sailing";
import api from "../../assets/api";
import FishingPermitModal from "./FishingPermitModal";
import Swal from "sweetalert2"; // Import Swal
import VesselModal from "./VesselModal";

const DashboardCard07 = ({ isListPage }) => {
	const [fishermen, setFishermen] = useState([]);
	const [fishingPermits, setFishingPermits] = useState({});
	const [vesselRegistrations, setVesselRegistrations] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPermitId, setSelectedPermitId] = useState(null);

	const openModal = (permitId) => {
		setSelectedPermitId(permitId);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedPermitId(null);
		setIsModalOpen(false);
	};

	const [selectedVesselId, setSelectedVesselId] = useState(null);
	const [isVesselModalOpen, setIsVesselModalOpen] = useState(false);

	const openVesselModal = (vesselId) => {
		setSelectedVesselId(vesselId);
		setIsVesselModalOpen(true);
	};

	const closeVesselModal = () => {
		setSelectedVesselId(null);
		setIsVesselModalOpen(false);
	};

	useEffect(() => {
		const fetchFishermenAndData = async () => {
			try {
				const response = await api.get("/api/fishermen/");
				const fishermenData = response.data;
				setFishermen(fishermenData);

				// Fetch permits and vessel registrations concurrently
				const dataPromises = fishermenData.map(async (fisherman) => {
					try {
						const [permitResponse, vesselResponse] = await Promise.all([
							api.get(`/api/fishing-permits/latest/${fisherman.id}/`),
							api.get(`/api/vessel-registration/latest/${fisherman.id}/`),
						]);

						return {
							fishermanId: fisherman.id,
							permitId: permitResponse.data.owner || null,
							vesselRegistration: vesselResponse.data || null,
						};
					} catch (error) {
						console.error(`Error fetching data for fisherman ${fisherman.id}:`, error);
						return { fishermanId: fisherman.id, permitId: null, vesselRegistration: null };
					}
				});

				const allData = await Promise.all(dataPromises);
				const permitsMap = {};
				const vesselsMap = {};

				allData.forEach(({ fishermanId, permitId, vesselRegistration }) => {
					permitsMap[fishermanId] = permitId;
					vesselsMap[fishermanId] = vesselRegistration;
				});

				setFishingPermits(permitsMap);
				setVesselRegistrations(vesselsMap);
			} catch (error) {
				console.error("Error fetching fishermen data:", error);
			}
		};

		fetchFishermenAndData();
	}, []);


	const handleDeleteFisherman = async (fishermanId) => {
		try {
			// Show a confirmation dialog
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "This will delete the fisherman and their associated data.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
				cancelButtonText: "Cancel",
			});

			if (result.isConfirmed) {
				// Make the API call to delete the fisherman
				await api.delete(`/api/users/delete/${fishermanId}/`);

				// Update the state by removing the deleted fisherman
				setFishermen((prevFishermen) => prevFishermen.filter((fisherman) => fisherman.id !== fishermanId));

				// Show success alert
				Swal.fire("Deleted!", "The fisherman has been deleted.", "success");
			}
		} catch (error) {
			console.error("Error deleting fisherman:", error);
			Swal.fire("Error!", "There was an error deleting the fisherman.", "error");
		}
	};




	return (
		<div className="col-span-full bg-white dark:bg-gray-800 shadow-sm rounded-xl">
			<header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
				<h2 className="font-semibold text-gray-800 dark:text-gray-100">Registered Fishermen</h2>
			</header>
			<div className="p-3">
				<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-gray-300">
						<thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
							<tr>
								<th className="p-2">
									<div className="font-semibold text-left">Name</div>
								</th>
								<th className="p-2">
									<div className="font-semibold text-center">Vessel Registration</div>
								</th>
								<th className="p-2">
									<div className="font-semibold text-center">Fishing Permit Registration</div>
								</th>
								{isListPage && (
									<th className="p-2">
										<div className="font-semibold text-center">Action</div>
									</th>)}
							</tr>
						</thead>
						<tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
							{fishermen.map((fisherman) => (
								<tr key={fisherman.id}>
									<td className="p-2">
										<div className="flex items-center">
											<img
												src={me}
												className="w-10 rounded-full mr-2"
												alt=""
											/>
											<div className="text-gray-800 dark:text-gray-100">{fisherman.first_name}</div>
										</div>
									</td>
									<td className="p-2">
										<div className="text-center">
											{vesselRegistrations[fisherman.id]?.id ? (
												<div
													className="cursor-pointer flex items-center justify-center gap-1"
													onClick={() => openVesselModal(vesselRegistrations[fisherman.id].id)}>
													<SailingIcon />
													<span className="text-blue-600 dark:text-blue-300">View Vessel</span>
												</div>
											) : (
												"No Registration"
											)}
										</div>
									</td>
									<td className="p-2">
										<div className="text-center">
											{fishingPermits[fisherman.id] ? (
												<div
													className="cursor-pointer"
													onClick={() => openModal(fishingPermits[fisherman.id])}>
													<PhishingIcon />
													<span className="text-blue-600 dark:text-blue-300">View Permit</span>
												</div>
											) : (
												"No Permit"
											)}
										</div>
									</td>
									<td className="p-2 flex justify-evenly">
										{isListPage && (
											<a
												href="#"
												className="text-center text-red-400 flex items-center"
												onClick={() => handleDeleteFisherman(fisherman.id)}>
												<DeleteForeverOutlinedIcon
													fontSize="small"
													className="mr-1"
												/>
												Delete
											</a>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{selectedPermitId && (
				<FishingPermitModal
					permitId={selectedPermitId}
					isOpen={isModalOpen}
					onClose={closeModal}
				/>
			)}

			{selectedVesselId && (
				<VesselModal
					vesselId={selectedVesselId}
					isOpen={isVesselModalOpen}
					onClose={closeVesselModal}
				/>
			)}
		</div>
	);
};

export default DashboardCard07;
