import React, { useEffect, useState } from "react";import PhishingIcon from "@mui/icons-material/Phishing";
import SailingIcon from "@mui/icons-material/Sailing";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import fishermanBg from "../images/fishermanbg.jpg";
import { Link } from "react-router-dom";
import api from "../assets/api";
import ProfileModal from "../partials/profile/ProfileModal";
import Header from "../partials/fisherman/Header";
function FishermanDashboard() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const [permitStatus, setPermitStatus] = useState(null); // State to store fishing permit status
	const [vesselStatus, setVesselStatus] = useState(null); // State to store vessel status
	const [loadingPermit, setLoadingPermit] = useState(true); // State for permit loading
	const [loadingVessel, setLoadingVessel] = useState(true); // State for vessel loading

	// Fetch permit status
	useEffect(() => {
		if (userData.id) {
			api
				.get(`/api/permit/status/${userData.id}/`)
				.then((response) => {
					setPermitStatus(response.data);
					setLoadingPermit(false);
				})
				.catch((error) => {
					console.error("Error fetching permit status:", error);
					setPermitStatus(null);
					setLoadingPermit(false);
				});
		}
	}, [userData.id]);

	// Fetch vessel status
	useEffect(() => {
		if (userData.id) {
			api
				.get(`/api/vessel/status/${userData.id}/`)
				.then((response) => {
					setVesselStatus(response.data);
					setLoadingVessel(false);
				})
				.catch((error) => {
					console.error("Error fetching vessel status:", error);
					setVesselStatus(null);
					setLoadingVessel(false);
				});
		}
	}, [userData.id]);

	return (
		<>
			<img
				src={fishermanBg}
				alt=""
				className="fixed w-full -z-50 h-screen"
			/>
			<div className="bg-white/70 backdrop-blur-sm text-gray-800 text-[15px] overflow-x-hidden">
				<Header
					fishermanName={userData.first_name}
					userId={userData.id}
				/>
				<div className="h-screen">
					{/* <div className="max-w-5xl mx-auto text-center relative px-4 sm:px-10 pt-24">
						<h1 className="lg:text-5xl md:text-3xl text-4xl font-semibold md:!leading-[80px]">
							Welcome, {userData.first_name}. You're one step to becoming a Registered Fisherman.
						</h1>
						<Link
							to={"/logout"}
							className="text-lg text-red-400 flex items-center justify-center mt-8">
							<ExitToAppIcon className="mr-2" /> Logout
						</Link>
					</div> */}

					<div className="px-4 sm:px-10 mt-24">
						<div className="mt-32 max-w-7xl mx-auto">
							<div className="flex flex-row flex-wrap justify-evenly mt-4">
								{/* Fishing Permit Card */}
								<div className="flex-1 text-center bg-blue-950/80 shadow-2xl mx-4 my-4 px-6 py-8 rounded-2xl hover:scale-110 hover:mr-12 duration-300">
									<PhishingIcon
										fontSize="large"
										className="bg-blue-600 p-1 rounded-lg mb-4 text-white"
									/>
									<h3 className="text-xl mb-4 text-purple-100">Fishing Permit Registration</h3>

									{loadingPermit ? (
										<p className="text-gray-300">Loading status...</p>
									) : permitStatus && permitStatus.permit ? (
										<>
											<p
												className={`text-lg font-bold mb-2 ${
													permitStatus.permit.status === "Granted" ? "text-green-500" : "text-yellow-500"
												}`}>
												Status: {permitStatus.permit.status || "Pending"}
											</p>
											{permitStatus.permit.status === "Granted" && (
												<Link
													to={"/fishingPermit-registration"}
													className="btn-renew bg-green-700  py-1 px-4 rounded-full text-white">
													Renew
												</Link> // Replace with your actual button code
											)}
										</>
									) : (
										<p className="text-red-500">No Permit registration found.</p>
									)}
									<p className="text-gray-300 mt-2">Please fill up the form to become a certified Tabina Fisherman.</p>
									<Link
										to={"/fishingPermit-registration"}
										className="text-blue-400 inline-block mt-4 hover:underline">
										Fill up here
									</Link>
								</div>

								{/* Vessel Registration Card */}
								<div className="flex-1 text-center bg-blue-950/80 shadow-2xl mx-4 my-4 px-6 py-8 rounded-2xl hover:scale-110 hover:ml-12 duration-300">
									<SailingIcon
										fontSize="large"
										className="bg-blue-600 p-1 rounded-lg mb-4 text-white"
									/>
									<h3 className="text-xl mb-4 text-purple-100">Vessel Registration</h3>
									{loadingVessel ? (
										<p className="text-gray-300">Loading status...</p>
									) : vesselStatus && vesselStatus.vessel ? (
										<>
											<p
												className={`text-lg font-bold mb-2 ${
													vesselStatus.vessel.status === "Granted" ? "text-green-500" : "text-yellow-500"
												}`}>
												Status: {vesselStatus.vessel.status || "Pending"}
											</p>
											{vesselStatus.vessel.status === "Granted" && (
												<Link
													to={"/vessel-registration"}
													className="btn-renew bg-green-700  py-1 px-4 rounded-full text-white">
													Renew
												</Link> // Replace with your actual button code
											)}
										</>
									) : (
										<p className="text-red-500">No vessel registration found.</p>
									)}

									<p className="text-gray-300 mt-2">Please fill up the form to become a certified Tabina Fisherman.</p>
									<Link
										to={"/vessel-registration"}
										className="text-blue-400 inline-block mt-4 hover:underline">
										Fill up here
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default FishermanDashboard;
