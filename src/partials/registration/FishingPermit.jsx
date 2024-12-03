import logo from "../../images/logo.png";import api from "../../assets/api";import { useState, useEffect } from "react";import ArrowBackIcon from "@mui/icons-material/ArrowBack";import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function FishingPermit() {
	const [loading, setLoading] = useState(true); // Add loading state
	const userData = JSON.parse(localStorage.getItem("userData")) || {};
	const [formData, setFormData] = useState({
		vessel_name: "",
		vessel_type: "",
		color: "",
		service_type: "",
		vessel_description: "",
		length: "",
		breadth: "",
		depth: "",
		draught: "", // Added draught field
		gross: "",
		net: "", // Added net field
		engine: "",
		serial_num: "",
		horse_power: "",
		cylinder_num: "",
		engine_num: "",
		crew_num: "",
		coast_guard_num: "",
		mfvr_num: "",
		or_num: "",
		date_issued: "",
		amount: 760,
		fishing_gear_used: "",
		status: "Pending",
		owner: userData.id || "", // Add owner as userData.id
	});

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userData")) || {};

		if (userData.first_name && formData.owner_name !== userData.first_name) {
			setFormData((prevFormData) => ({
				...prevFormData,
				owner_name: userData.first_name,
			}));
		}

		const fetchLatestPermit = async () => {
			try {
				const response = await api.get(`/api/fishing-permit/latest/${userData.id}/`);
				if (response.status === 200 && response.data) {
					setFormData((prevFormData) => ({
						...prevFormData,
						...response.data,
						amount: response.data.amount || 760, // Dynamically set amount if available
						status: prevFormData.status === "Pending" ? "Pending" : response.data.status,
					}));
				}
			} catch (error) {
				console.error("Error fetching fishing permit:", error);
			} finally {
				setLoading(false);
			}
		};

		if (userData.id) {
			fetchLatestPermit();
		} else {
			setLoading(false); // Stop loading if no userData.id
		}
	}, [userData.id, userData.first_name, formData.status]);


	// Handle input change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault(); // Prevent form submission default behavior

		try {
			// Fetch the current permit status before proceeding
			const response = await api.get(`/api/fishing-permit/latest/${userData.id}/`);
			if (response.status === 200 && response.data) {
				const permitStatus = response.data.status; // assuming the status field is 'status'

				// If permit status is granted, warn the user before proceeding
				if (permitStatus === "Granted") {
					Swal.fire({
						title: "Warning!",
						text: 'If you proceed, the status of your fishing permit will be "Pending". Do you want to continue?',
						icon: "warning",
						showCancelButton: true,
						confirmButtonText: "Yes, proceed",
						cancelButtonText: "No, cancel",
					}).then(async (result) => {
						if (result.isConfirmed) {
							// Proceed with the form submission
							await submitForm(); // Call the existing form submission function
						}
					});
				} else {
					// If the permit is not granted, proceed with normal registration
					await submitForm();
				}
			}
		} catch (error) {
			console.error("Error checking permit status:", error);
			Swal.fire({
				title: "Error!",
				text: "There was an error checking the permit status. Please try again.",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

	// Separate function to submit the form
	const submitForm = async () => {
		try {
			console.log("FormData before submit:", formData);
			const response = await api.post(`/api/register-fishing-permit/${userData.id}/`, formData);
			if (response.status === 201) {
				Swal.fire({
					title: "Success!",
					text: "Fishing permit registered successfully!",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					// Refresh the page after the alert is closed
					window.location.reload();
				});
			}
		} catch (error) {
			console.error("Error registering fishing permit:", error);
			Swal.fire({
				title: "Error!",
				text: "There was an error submitting the form. Please try again.",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

	if (loading) return <div>Loading...</div>;
	return (
		<>
			<div className="flex flex-col justify-center items-center font-[sans-serif]">
				<div className="flex flex-row flex-wrap sm:flex-nowrap items-center bg-white dark:bg-gray-800 w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
					<form
						className="sm:p-8 p-4 w-full"
						onSubmit={handleSubmit}>
						<div className="mb-12 flex flex-row justify-between items-center">
							<div>
								<h3 className="text-purple-500 text-3xl font-extrabold max-md:text-center">Fishing Permit</h3>
								<p className="text-xs">Please fill in any inputs below.</p>
							</div>
							<Link
								to={"/fishermen-registration"}
								className="flex text-xs items-center">
								<ArrowBackIcon fontSize="small" />
								<p>Go back</p>
							</Link>
						</div>

						<div className="grid lg:grid-cols-2 gap-6">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Name of Owner:</label>
								<input
									name=""
									type="text"
									className="bg-white dark:bg-gray-800 w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg border-2 border-orange-700"
									value={formData.owner_name} // Use formData.owner_name instead
									onChange={handleChange}
									placeholder={userData.first_name}
									disabled
								/>
								<p className="text-xs text-orange-600">
									This field is generated based on the Profile you've logged in.
								</p>
							</div>

							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">
									Address<span className="text-xs font-bold">(Purok, Barangay, Municipality, Province)</span>:
								</label>
								<input
									name="address"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.address}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="grid lg:grid-cols-2 gap-6 mt-8">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Home Port:</label>
								<input
									name="home_port"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder="Enter name"
									value={formData.home_port}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Name of Fishing Vessel:</label>
								<input
									name="vessel_name"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.vessel_name}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="flex flex-row justify-between flex-wrap md:flex-nowrap mt-8 w-full">
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Vessel Type:</label>
								<input
									name="vessel_type"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.vessel_type}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Color:</label>
								<input
									name="color"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.color}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Type of Service:</label>
								<input
									name="service_type"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.service_type}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Vessel Description:</label>
								<input
									name="vessel_description"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.vessel_description}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="flex flex-row justify-between flex-wrap md:flex-nowrap mt-8 w-full">
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Length: (mtrs.):</label>
								<input
									name="length"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.length}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Breadth: (mtrs.):</label>
								<input
									name="breadth"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.breadth}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Depth: (mtrs.):</label>
								<input
									name="depth"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.depth}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Gross Tonnage:</label>
								<input
									name="gross"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.gross}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Net Tonnage:</label>
								<input
									name="net"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.net}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="flex flex-row justify-between flex-wrap md:flex-nowrap mt-8 w-full">
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Engine Make:</label>
								<input
									name="engine"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.engine}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Serial Number:</label>
								<input
									name="serial_num"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.serial_num}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Horse Power:</label>
								<input
									name="horse_power"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.horse_power}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">No. of Cylinder:</label>
								<input
									name="cylinder_num"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.cylinder_num}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">No. of Engine:</label>
								<input
									name="engine_num"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.engine_num}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="grid lg:grid-cols-3 gap-6 mt-8">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">No. of Crew:</label>
								<input
									name="crew_num"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.crew_num}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Coast Guard No.:</label>
								<input
									name="coast_guard_num"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.coast_guard_num}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">MFVR No.:</label>
								<input
									name="mfvr_num"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.mfvr_num}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="flex flex-row justify-between flex-wrap md:flex-nowrap mt-8 w-full">
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">OR Number:</label>
								<input
									name="or_num"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.or_num}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Date Issued:</label>
								<input
									name="date_issued"
									type="date"
									className="bg-white dark:bg-gray-800 w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.date_issued}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">
									Amount <span className="font-bold text-xs">(PHP)</span>:
								</label>
								<input
									name="amount"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder="760"
									value="760"
									onChange={handleChange}
									disabled
								/>
								<p className="text-xs text-orange-700 font-semibold">Please prepare an amount after you register</p>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Fishing Gear Used:</label>
								<input
									name="fishing_gear_used"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.fishing_gear_used}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="mt-6">
							<button
								type="submit"
								className=" px-8 text-sm tracking-wide font-semibold py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none transition-all">
								Register Fishing Permit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default FishingPermit;
