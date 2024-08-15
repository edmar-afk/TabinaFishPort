import React, { useState, useEffect } from "react";
import api from "../../assets/api";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import SetMealTwoToneIcon from "@mui/icons-material/SetMealTwoTone";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AddFishModal from "./AddFishModal";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";

function DashboardCard07({ isListPage }) {
	const [fishTypes, setFishTypes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

	const fetchFishTypes = async () => {
		try {
			const response = await api.get("/api/fishtypes/list/");
			const data = Array.isArray(response.data) ? response.data : [];
			setFishTypes(data);
		} catch (error) {
			setError("Failed to load fish types.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFishTypes();
	}, []);

	const handleAlertClose = () => {
		setAlert({ ...alert, open: false });
	};

	const handleModalSubmit = (success, message) => {
		setAlert({
			open: true,
			message,
			severity: success ? "success" : "error",
		});

		if (success) {
			fetchFishTypes(); // Refresh data on success
		}
	};

	const handleDelete = async (id) => {
		try {
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			});

			if (result.isConfirmed) {
				await api.delete(`/api/fishtypes/${id}/`);
				setAlert({
					open: true,
					message: "Fish type deleted successfully!",
					severity: "success",
				});
				fetchFishTypes(); // Refresh data after deletion
			}
		} catch (error) {
			setAlert({
				open: true,
				message: "Failed to delete fish type.",
				severity: "error",
			});
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className="col-span-full bg-white dark:bg-gray-800 shadow-sm rounded-xl">
			{alert.open && (
				<Alert
					variant="filled"
					severity={alert.severity}
					onClose={handleAlertClose}
					className="mb-4">
					{alert.message}
				</Alert>
			)}

			<header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex flex-row justify-between">
				<h2 className="font-semibold text-gray-800 dark:text-gray-100">Type of Fish known in Tabina</h2>
				<AddFishModal onSubmit={handleModalSubmit} />
			</header>
			<div className="p-3">
				{/* Table */}
				<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-gray-300">
						{/* Table header */}
						<thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
							<tr>
								<th className="p-2">
									<div className="font-semibold text-left">Fish Name</div>
								</th>

								<th className="p-2">
									<div className="font-semibold text-center">Action</div>
								</th>
							</tr>
						</thead>
						{/* Table body */}
						<tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
							{fishTypes.map((fishType) => (
								<tr key={fishType.id}>
									<td className="p-2">
										<div className="flex items-center">
											<SetMealTwoToneIcon className="mr-2" />
											<div className="text-gray-800 dark:text-gray-100">{fishType.name}</div>
										</div>
									</td>

									<td className="p-2 flex justify-center">
										<a
											href="#"
											className="text-center text-blue-400 flex items-center hover:scale-110 duration-300 mr-2">
											<BorderColorOutlinedIcon
												fontSize="small"
												className="mr-1"
											/>
											Update
										</a>

										<a
											href="#"
											onClick={() => handleDelete(fishType.id)}
											className="text-center text-red-400 flex items-center hover:scale-110 duration-300">
											<DeleteForeverOutlinedIcon
												fontSize="small"
												className="mr-1"
											/>
											Delete
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default DashboardCard07;
