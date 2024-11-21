import React, { useState, useEffect } from "react";import { Box, Modal, Button, Alert } from "@mui/material";import api from "../../assets/api";import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

function FishingPermitModal({ permitId, isOpen, onClose }) {
	const [open, setOpen] = useState(isOpen);
	const [permitData, setPermitData] = useState(null);
	const handleOpen = () => setOpen(true);
	const [alertMessage, setAlertMessage] = useState("");
	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose(); // Trigger onClose if passed from parent
	};

	useEffect(() => {
		setOpen(isOpen); // Sync internal open state with the isOpen prop
	}, [isOpen]);

	useEffect(() => {
		if (open && permitId) {
			api
				.get(`/api/fishing-permit/${permitId}/`)
				.then((response) => {
					setPermitData(response.data);
				})
				.catch((error) => {
					console.error("Failed to fetch fishing permit data:", error);
				});
		}
	}, [open, permitId]);

	// Grant the fishing permit
	const grantRequest = () => {
		api
			.patch(`/api/fishing-permits/${permitData.id}/grant/`)
			.then((response) => {
				// Update the permit data with the new status
				setPermitData(response.data);
				setAlertMessage("Fishing permit has been successfully granted.");
			})
			.catch((error) => {
				console.error("Failed to grant fishing permit:", error);
				setAlertMessage("An error occurred while granting the permit.");
			});
	};

	// Handle Print functionality
	const handlePrint = () => {
		const content = document.getElementById("permitDetailsTable");
		const printWindow = window.open("", "_blank");
		printWindow.document.write("<html><head><title>Fishing Permit</title></head><body>");
		printWindow.document.write(content.innerHTML);
		printWindow.document.write("</body></html>");
		printWindow.document.close();
		printWindow.print();
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: { xs: "90vw", sm: "70vw", md: "60vw", lg: "50vw" }, // Responsive width
						maxWidth: "800px", // Maximum width limit
						maxHeight: "90vh", // Limit height to 90% of viewport height
						bgcolor: "background.paper",
						boxShadow: 24,
						p: { xs: 2, sm: 4 }, // Responsive padding
						borderRadius: 2,
						overflowY: "auto", // Scroll if content overflows
					}}>
					{permitData ? (
						<>
							<div className="mb-4 text-lg text-gray-700 font-bold">
								<p>Fishing Permit Details</p>
							</div>

							<div className="overflow-x-auto">
								<table
									id="permitDetailsTable"
									className="min-w-full table-auto border-collapse border border-gray-300">
									<thead>
										<tr>
											<th className="px-4 py-2 text-left border border-gray-300">Fields</th>
											<th className="px-4 py-2 text-left border border-gray-300">Answers</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Owner Name:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.owner_name}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Address:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.address}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Home Port:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.home_port}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Vessel Name:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.vessel_name}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Vessel Type:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.vessel_type}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Color:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.color}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Type of Service:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.service_type}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Vessel Description:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.vessel_description}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Length (meters):</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.length}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Breadth (meters):</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.breadth}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Depth (meters):</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.depth}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Gross Tonnage:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.gross}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Net Tonnage:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.net}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Engine Make:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.engine}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Serial Number:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.serial_num}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Horse Power:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.horse_power}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Number of Cylinders:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.cylinder_num}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Number of Engines:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.engine_num}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Number of Crew:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.crew_num}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Coast Guard Number:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.coast_guard_num}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">MFVR Number:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.mfvr_num}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">OR Number:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.or_num}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Date Issued:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.date_issued}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Amount:</td>
											<td className="px-4 py-2 border border-gray-300">₱{permitData.amount}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Fishing Gear Used:</td>
											<td className="px-4 py-2 border border-gray-300">{permitData.fishing_gear_used}</td>
										</tr>
										<tr>
											<td className="px-4 py-2 font-semibold border border-gray-300">Status:</td>
											<td
												className={`px-4 py-2 border border-gray-300 font-bold ${
													permitData.status === "Pending" ? "text-orange-800" : "text-green-700"
												}`}>
												{permitData.status}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</>
					) : (
						<div>Loading permit details...</div>
					)}
					<div className="mb-4">
						<Button
							onClick={handleClose}
							sx={{ mt: 2 }}
							variant="outlined">
							Close
						</Button>

						{/* Conditionally render the buttons based on the status */}
						{permitData?.status === "Pending" ? (
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
						) : permitData?.status === "Granted" ? (
							<Button
								onClick={handlePrint}
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
					{permitData?.status === "Granted" ? (
						<p className="bg-green-50 rounded-lg p-4 text-green-800">
							This permit has been granted by the LGU and can therefore be used as official authorization to proceed
							with printing.
						</p>
					) : null}

					{alertMessage && (
						<Alert
							severity="success"
							onClose={() => setAlertMessage("")}
							sx={{ mb: 2 }}>
							{alertMessage}
						</Alert>
					)}
				</Box>
			</Modal>
		</div>
	);
}

export default FishingPermitModal;
