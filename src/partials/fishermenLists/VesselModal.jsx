import React, { useState, useEffect } from "react";
import { Box, Modal, Button, Alert } from "@mui/material";
import api from "../../assets/api";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

function VesselModal({ vesselId, isOpen, onClose }) {
	const [open, setOpen] = useState(isOpen);
	const [vesselData, setVesselData] = useState(null);
	const [alertMessage, setAlertMessage] = useState("");

	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose();
	};

	useEffect(() => {
		setOpen(isOpen); // Sync internal open state with isOpen prop
	}, [isOpen]);

	useEffect(() => {
		if (open && vesselId) {
			api
				.get(`/api/vessel-registrationDetail/${vesselId}/`)
				.then((response) => {
					setVesselData(response.data);
				})
				.catch((error) => {
					console.error("Failed to fetch vessel registration data:", error);
				});
		}
	}, [open, vesselId]);

	// Grant the vessel registration
	const grantRequest = () => {
		api
			.patch(`/api/vessel-registration/${vesselData.id}/grant/`)
			.then((response) => {
				// Update the permit data with the new status
				setVesselData(response.data);
				setAlertMessage("Vessel Registration has been successfully granted.");
			})
			.catch((error) => {
				console.error("Failed to grant Vessel Registration:", error);
				setAlertMessage("An error occurred while granting the registraiton.");
			});
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: { xs: "90vw", sm: "70vw", md: "60vw", lg: "50vw" },
					maxWidth: "800px",
					maxHeight: "90vh",
					bgcolor: "background.paper",
					boxShadow: 24,
					p: { xs: 2, sm: 4 },
					borderRadius: 2,
					overflowY: "auto",
				}}>
				{vesselData ? (
					<>
						<div className="text-xl font-semibold mb-4">Vessel Registration Details</div>
						<div className="overflow-x-auto">
							<table className="min-w-full table-auto border-collapse border border-gray-300">
								<thead>
									<tr>
										<th className="px-4 py-2 text-left border border-gray-300">Field</th>
										<th className="px-4 py-2 text-left border border-gray-300">Details</th>
									</tr>
								</thead>
								<tbody>
									{Object.entries(vesselData).map(([key, value]) => (
										<tr key={key}>
											<td className="px-4 py-2 font-semibold border border-gray-300 capitalize">
												{key.replace(/_/g, " ")}
											</td>
											<td className="px-4 py-2 border border-gray-300">{value || "N/A"}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Conditionally render the status and buttons */}
						<div className="mt-4">
							<div className="mb-4">
								<Button
									onClick={handleClose}
									sx={{ mt: 2 }}
									variant="outlined">
									Close
								</Button>

								{/* Conditionally render buttons based on vessel status */}
								{vesselData.status === "Pending" ? (
									<Button
										onClick={grantRequest}
										variant="contained"
										sx={{
											mt: 2,
											ml: 2,
											backgroundColor: "blue",
											color: "white",
											"&:hover": { backgroundColor: "darkblue" },
										}}>
										Grant Request
									</Button>
								) : vesselData.status === "Granted" ? (
									<Button
										variant="contained"
										sx={{
											mt: 2,
											ml: 2,
											backgroundColor: "blue",
											color: "white",
											"&:hover": { backgroundColor: "darkblue" },
										}}>
										<LocalPrintshopIcon className="mr-1" /> Print
									</Button>
								) : null}
							</div>

							{/* Display a success message if the request is granted */}
							{vesselData.status === "Granted" && (
								<p className="bg-green-50 rounded-lg p-4 text-green-800">
									This Vessel Registration has been granted by the LGU and can therefore be used as official
									authorization to proceed with printing.
								</p>
							)}
						</div>
					</>
				) : (
					<div>Loading vessel details...</div>
				)}
			</Box>
		</Modal>
	);
}

export default VesselModal;
