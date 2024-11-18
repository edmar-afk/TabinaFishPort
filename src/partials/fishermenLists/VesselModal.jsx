import React, { useState, useEffect } from "react";
import { Box, Modal, Button } from "@mui/material";
import api from "../../assets/api";
function VesselModal({ vesselId, isOpen, onClose }) {
	const [open, setOpen] = useState(isOpen);
	const [vesselData, setVesselData] = useState(null);
    
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
					</>
				) : (
					<div>Loading vessel details...</div>
				)}
				<Button
					onClick={handleClose}
					sx={{ mt: 2 }}
					variant="outlined">
					Close
				</Button>
			</Box>
		</Modal>
	);
}

export default VesselModal;
