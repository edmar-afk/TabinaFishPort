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

function DashboardCard07({ isListPage }) {
	const [fishermen, setFishermen] = useState([]);
	const [fishingPermits, setFishingPermits] = useState({});
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

	// Function to handle deleting a fisherman
	const handleDeleteFisherman = async (fishermanId) => {
		try {
			// Show confirmation Swal before proceeding with deletion
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "This will permanently delete this fisherman profile!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
				cancelButtonText: "Cancel",
			});

			if (result.isConfirmed) {
				// Proceed with the deletion
				const response = await api.delete(`/api/users/delete/${fishermanId}/`);
				if (response.status === 204) {
					// Remove the deleted fisherman from the state
					setFishermen(fishermen.filter((fisherman) => fisherman.id !== fishermanId));
					// Show success message
					Swal.fire("Deleted!", "The fisherman profile has been deleted.", "success");
				}
			}
		} catch (error) {
			console.error("Error deleting fisherman:", error);
			Swal.fire("Error!", "There was an error deleting the fisherman profile.", "error");
		}
	};

	useEffect(() => {
		const fetchFishermenAndPermits = async () => {
			try {
				const response = await api.get("/api/fishermen/");
				const fishermenData = response.data;
				setFishermen(fishermenData);

				const permitPromises = fishermenData.map(async (fisherman) => {
					try {
						const permitResponse = await api.get(`/api/fishing-permits/latest/${fisherman.id}/`);
						const permitId = permitResponse.data.owner || null;
						return { fishermanId: fisherman.id, permitId };
					} catch (error) {
						console.error(`Error fetching permit for fisherman ${fisherman.id}:`, error);
						return { fishermanId: fisherman.id, permitId: null };
					}
				});

				const permits = await Promise.all(permitPromises);
				const permitsMap = {};
				permits.forEach(({ fishermanId, permitId }) => {
					permitsMap[fishermanId] = permitId;
				});
				setFishingPermits(permitsMap);
			} catch (error) {
				console.error("Error fetching fishermen data:", error);
			}
		};

		fetchFishermenAndPermits();
	}, []);

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
								<th className="p-2">
									<div className="font-semibold text-center">Action</div>
								</th>
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
										<div className="text-center text-red-400">
											<SailingIcon /> No Permit
										</div>
									</td>
									<td className="p-2">
										<div className="text-center text-orange-500">
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
										{/* Delete button with Swal confirmation */}
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

			{/* Render modal only if there's a selectedPermitId */}
			{selectedPermitId && (
				<FishingPermitModal
					permitId={selectedPermitId}
					isOpen={isModalOpen}
					onClose={closeModal}
				/>
			)}
		</div>
	);
}

export default DashboardCard07;
