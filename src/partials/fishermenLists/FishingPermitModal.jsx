import React, { useState, useEffect, useRef } from "react";import { Box, Modal, Button, Alert } from "@mui/material";
import api from "../../assets/api";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import html2canvas from "html2canvas";
import permitImage from "../../images/permit.jpg";
import IosShareIcon from "@mui/icons-material/IosShare";
function FishingPermitModal({ permitId, isOpen, onClose }) {
	const [open, setOpen] = useState(isOpen);
	const [permitData, setPermitData] = useState(null);
	const handleOpen = () => setOpen(true);
	const [alertMessage, setAlertMessage] = useState("");
	const [expirationDates, setExpirationDates] = useState([]);
	const handleClose = () => {
		setOpen(false);
		if (onClose) onClose(); // Trigger onClose if passed from parent
	};

	// Create a ref for the div that contains the content to capture
	const captureRef = useRef();

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

	// Fetch expiration dates when permit data is updated
	useEffect(() => {
		if (permitData) {
			api
				.get(`/api/permit-expiration-dates/${permitData.id}/`)
				.then((response) => {
					console.log("Updated expiration dates:", response.data);
					setExpirationDates(response.data); // Update expiration dates state
				})
				.catch((error) => {
					console.error("Failed to fetch updated expiration dates:", error);
					setAlertMessage("An error occurred while fetching updated expiration dates.");
				});
		}
	}, [permitData]); // Runs every time permitData is updated

	// Grant the fishing permit
	const grantRequest = () => {
		api
			.patch(`/api/fishing-permits/${permitData.id}/grant/`)
			.then((response) => {
				// Update the permit data with the new status
				setPermitData(response.data);
				setAlertMessage("Fishing permit has been successfully granted.");

				// After granting the permit, trigger the expiration date upload
				api
					.post(`/api/permit-expiration/${permitData.id}/`)
					.then((expirationResponse) => {
						console.log("Expiration Date successfully set:", expirationResponse.data);
						// No need to re-fetch expiration dates here since the effect above will handle it
					})
					.catch((expirationError) => {
						console.error("Failed to set expiration date:", expirationError);
						setAlertMessage("An error occurred while setting the expiration date.");
					});
			})
			.catch((error) => {
				console.error("Failed to grant fishing permit:", error);
				setAlertMessage("An error occurred while granting the permit.");
			});
	};

	// Capture the div content and download as image
	const handlePrint = () => {
		if (captureRef.current) {
			html2canvas(captureRef.current).then((canvas) => {
				// Convert canvas to image
				const image = canvas.toDataURL("image/png");
				// Create a temporary link element to trigger the download
				const link = document.createElement("a");
				link.href = image;
				link.download = `${permitData.owner_name}'s permit.png`;
				link.click();
			});
		}
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
						minWidth: "800px",
						maxWidth: "800px", // Maximum width limit
						maxHeight: "90vh", // Limit height to 90% of viewport height
						bgcolor: "background.paper",
						boxShadow: 24,
						p: { xs: 2, sm: 4 }, // Responsive padding
						borderRadius: 2,
						overflowY: "auto", // Scroll if content overflows
					}}>
					{/* download image when the button print is clicked */}
					<div
						className="relative w-full"
						ref={captureRef}>
						<img
							src={permitImage}
							alt=""
							width={900}
						/>
						{permitData && (
							<>
								<p className="absolute font-bold top-[16.5rem] text-xs left-16">{permitData.owner_name}</p>
								<p className="absolute font-bold top-[16.5rem] text-xs right-8">{permitData.address}</p>

								<p className="absolute font-bold top-[19.6rem] text-xs left-16">{permitData.home_port}</p>
								<p className="absolute font-bold top-[19.6rem] text-xs right-12">{permitData.vessel_name}</p>

								<p className="absolute font-bold top-[23rem] text-xs left-16">{permitData.vessel_type}</p>
								<p className="absolute font-bold top-[23rem] text-xs left-[20rem] w-[80px]">{permitData.color}</p>
								<p className="absolute font-bold top-[23rem] text-xs left-[27.5rem] w-[100px]">
									{permitData.service_type}
								</p>
								<p className="absolute font-bold top-[23rem] text-xs left-[36.5rem] w-[80px]">
									{permitData.vessel_description}
								</p>

								<p className="absolute font-bold top-[30.8rem] text-xs left-24">{permitData.length}</p>
								<p className="absolute font-bold top-[30.8rem] text-xs left-52">{permitData.breadth}</p>
								<p className="absolute font-bold top-[30.8rem] text-xs left-[22rem]">{permitData.depth}</p>
								<p className="absolute font-bold top-[30.8rem] text-xs left-[31rem]">{permitData.gross}</p>
								<p className="absolute font-bold top-[30.8rem] text-xs left-[39rem]">{permitData.net}</p>

								<p className="absolute font-bold top-[34.5rem] text-xs left-24">{permitData.engine}</p>
								<p className="absolute font-bold top-[34.5rem] text-xs left-52">{permitData.serial_num}</p>
								<p className="absolute font-bold top-[34.5rem] text-xs left-[22rem]">{permitData.horse_power}</p>
								<p className="absolute font-bold top-[34.5rem] text-xs left-[31rem]">{permitData.cylinder_num}</p>
								<p className="absolute font-bold top-[34.5rem] text-xs left-[39rem]">{permitData.engine_num}</p>

								<p className="absolute font-bold top-[38.8rem] text-xs left-20">{permitData.crew_num}</p>
								<p className="absolute font-bold top-[38.8rem] text-xs left-52">{permitData.coast_guard_num}</p>
								<p className="absolute font-bold top-[38.8rem] text-xs left-[22rem]">{permitData.mfvr_num}</p>

								<p className="absolute font-bold top-[42.2rem] text-xs left-20">{permitData.crew_num}</p>
								<p className="absolute font-bold top-[42.2rem] text-xs left-52">{permitData.date_issued}</p>
								<p className="absolute font-bold top-[42.2rem] text-xs left-[22rem]">₱{permitData.amount}</p>

								<p className="absolute font-bold top-[39.7rem] text-sm left-[28rem]">{permitData.fishing_gear_used}</p>
							</>
						)}
					</div>

					<div className=" z-50">
						<div>
							<div>
								{expirationDates.length > 0 ? (
									expirationDates.map((date) => {
										const currentDate = new Date();
										const expirationDate = new Date(date.date_expired);
										const timeDifference = expirationDate - currentDate;
										const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert ms to days

										return (
											<div key={date.id}>
												<p>Date Registered: {new Date(date.date_registered).toLocaleDateString()}</p>
												<p>
													Date Expired: {expirationDate.toLocaleDateString()} -
													{daysRemaining > 0 ? `${daysRemaining} days remaining` : "Expired"}
												</p>
											</div>
										);
									})
								) : (
									<p>No expiration dates available.</p>
								)}
							</div>
						</div>
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
									onClick={handlePrint} // Trigger the print functionality
									variant="contained"
									sx={{
										mt: 2,
										ml: 2,
										backgroundColor: "blue",
										color: "white",
										"&:hover": { backgroundColor: "darkblue" },
									}}>
									<IosShareIcon className="mr-1" /> Download
								</Button>
							) : null}
						</div>
						{permitData?.status === "Granted" ? (
							<p className="bg-green-50 rounded-lg p-4 text-green-800 w-[700px]">
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
					</div>
				</Box>
			</Modal>
		</div>
	);
}

export default FishingPermitModal;
