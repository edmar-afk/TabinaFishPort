import React, { useState, useEffect, useRef } from "react";import { Box, Modal, Button } from "@mui/material";import api from "../../assets/api";import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";import html2canvas from "html2canvas";import vesselImage from "../../images/vessel.jpg";import IosShareIcon from "@mui/icons-material/IosShare";

function VesselModal({ vesselId, isOpen, onClose }) {
	const [open, setOpen] = useState(isOpen);
	const [vesselData, setVesselData] = useState(null);
	const [alertMessage, setAlertMessage] = useState("");
	const [registrationIds, setRegistrationIds] = useState([]);
	const captureRef = useRef();

	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose();
	};

	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);

	useEffect(() => {
		if (open && vesselId) {
			api
				.get(`/api/vessel-registrationDetail/${vesselId}/`)
				.then((response) => {
					setVesselData(response.data);

					api
						.get(`/api/vessel-registrations/${response.data.owner}/`)
						.then((idResponse) => {
							setRegistrationIds(idResponse.data.registration_ids);
						})
						.catch((error) => {
							console.error("Failed to fetch registration IDs:", error);
						});
				})
				.catch((error) => {
					console.error("Failed to fetch vessel registration data:", error);
				});
		}
	}, [open, vesselId]);

	const handleIdClick = (id) => {
		if (id !== vesselId) {
			setVesselData(null); // Clear previous data to show loading
			api
				.get(`/api/vessel-registrationDetail/${id}/`)
				.then((response) => {
					setVesselData(response.data);
					console.log("Vessel ID switched to:", id);
				})
				.catch((error) => console.error("Failed to switch vessel data:", error));
		}
	};

	const handlePrint = () => {
		if (captureRef.current) {
			html2canvas(captureRef.current).then((canvas) => {
				const image = canvas.toDataURL("image/png");
				const link = document.createElement("a");
				link.href = image;
				link.download = `Vessel ${vesselData.vessel_name}'s Registration.png`;
				link.click();
			});
		}
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
					width: { xs: "90vw", sm: "70vw", md: "60vw", lg: "50vw" }, // Responsive width
					minWidth: "800px",
					maxWidth: "800px", // Maximum width limit
					maxHeight: "90vh", // Limit height to 90% of viewport height
					bgcolor: "background.paper",
					boxShadow: 24,
					p: { xs: 2, sm: 4 }, // Responsive padding
					borderRadius: 2,
					overflowY: "auto", // Scroll if content overflows
				}}>
				{vesselData ? (
					<>
						<div className="text-xl font-semibold mb-4">Vessel Registration Details</div>
						<div className="flex flex-row gap-4 items-center">
							{registrationIds.length > 0 ? (
								registrationIds.map((id, index) => (
									<button
										key={id}
										onClick={() => handleIdClick(id)}
										className={`bg-blue-400 px-3 text-white py-1 my-4 shadow-md ${
											id === vesselId ? "bg-blue-700" : ""
										}`}>
										Page {index + 1} {/* Displaying the index starting from 1 */}
									</button>
								))
							) : (
								<p className="text-green-600 font-semibold mb-4">This fisherman has submitted his/her registration first time.</p>
							)}
						</div>
						<div
							className="relative"
							ref={captureRef}>
							<img
								src={vesselImage}
								alt="Vessel"
							/>
							<p className="absolute font-bold top-[9rem] left-[2rem]">{vesselData.vessel_name}</p>
							<p className="absolute font-bold top-[12rem] left-[2rem]">{vesselData.service_type}</p>
							<p className="absolute font-bold top-[12rem] right-[2rem]">{vesselData.home_port}</p>

							<p className="absolute font-bold top-[23.5rem] left-[2rem]">{vesselData.builder_name}</p>
							<p className="absolute font-bold top-[23.5rem] left-[22rem]">{vesselData.year_built}</p>
							<p className="absolute font-bold top-[23.5rem] left-[33rem]">{vesselData.place_built}</p>

							<p className="absolute font-bold top-[25.8rem] left-[2rem]">{vesselData.former_vessel_name}</p>
							<p className="absolute font-bold top-[25.8rem] left-[21.3rem]">{vesselData.former_owner}</p>
							<p className="absolute font-bold top-[25.8rem] left-[33rem]">{vesselData.hull_materials}</p>
							<p className="absolute font-bold top-[28rem] left-[2rem]">{vesselData.color}</p>

							<p className="absolute font-bold top-[31.7rem] left-[2rem]">{vesselData.length}</p>
							<p className="absolute font-bold top-[31.7rem] left-[10rem]">{vesselData.width}</p>
							<p className="absolute font-bold top-[31.7rem] left-[17.7rem]">{vesselData.depth}</p>
							<p className="absolute font-bold top-[31.7rem] left-[25.2rem]">{vesselData.depth}</p>
							<p className="absolute font-bold top-[31.7rem] left-[29.2rem]">{vesselData.gross_tonnage}</p>
							<p className="absolute font-bold top-[31.7rem] left-[37.2rem]">{vesselData.net_tonnage}</p>

							<p className="absolute font-bold top-[35.4rem] left-[2rem]">{vesselData.number_of_engine}</p>
							<p className="absolute font-bold top-[35.4rem] left-[14rem]">{vesselData.cycle}</p>
							<p className="absolute font-bold top-[35.4rem] left-[21.5rem]">{vesselData.horsepower}</p>
							<p className="absolute font-bold top-[35.4rem] left-[29.5rem]">{vesselData.cylinder_number}</p>
							<p className="absolute font-bold top-[35.4rem] left-[37rem]">{vesselData.engine_make}</p>
						</div>

						<div className="mt-4">
							<Button
								onClick={handleClose}
								variant="outlined"
								sx={{ mt: 2 }}>
								Close
							</Button>
							{vesselData.status === "Pending" && (
								<Button
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
							)}
							{vesselData.status === "Granted" && (
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
									<IosShareIcon className="mr-1" /> Download and Print
								</Button>
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
