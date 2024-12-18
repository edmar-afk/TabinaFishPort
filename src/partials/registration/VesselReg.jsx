import logo from "../../images/logo.png";import api from "../../assets/api";import { useState, useEffect } from "react";import ArrowBackIcon from "@mui/icons-material/ArrowBack";import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function VesselReg() {
	const [loading, setLoading] = useState(true);
	const userData = JSON.parse(localStorage.getItem("userData")) || {};
	const [formData, setFormData] = useState({
		vessel_name: "",
		service_type: "",
		home_port: "",
		builder_name: "",
		year_built: "",
		place_built: "",
		former_vessel_name: "",
		former_owner: "",
		hull_materials: "",
		color: "",
		length: "",
		width: "",
		depth: "",
		draught: "",
		gross_tonnage: "",
		net_tonnage: "",
		engine_make: "",
		cycle: "",
		horsepower: "",
		cylinder_number: "",
		number_of_engine: "",
		owner: userData.id || "",
		status: "Pending", // Add initial status
		amount: 554,
	});
	console.log(formData);
	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userData")) || {};

		// Update formData if userData is available and formData.owner_name hasn't been set yet
		if (userData.first_name && formData.owner_name !== userData.first_name) {
			setFormData((prevFormData) => ({
				...prevFormData,
				owner_name: userData.first_name, // Set the owner's first name
			}));
		}

		const fetchLatestPermit = async () => {
			try {
				const response = await api.get(`/api/vessel-registration/latest/${userData.id}/`);
				console.log(response); // Log the response to inspect the data
				if (response.status === 200 && response.data) {
					// Update formData if valid data is returned
					setFormData((prevFormData) => ({
						...prevFormData,
						amount: response.data.amount || prevFormData.amount,
						status: prevFormData.status === "Pending" ? "Pending" : response.data.status,
						vessel_name: response.data.vessel_name || prevFormData.vessel_name,
						service_type: response.data.service_type || prevFormData.service_type,
						home_port: response.data.home_port || prevFormData.home_port,
						builder_name: response.data.builder_name || prevFormData.builder_name,
						year_built: response.data.year_built || prevFormData.year_built,
						place_built: response.data.place_built || prevFormData.place_built,
						former_vessel_name: response.data.former_vessel_name || prevFormData.former_vessel_name,
						former_owner: response.data.former_owner || prevFormData.former_owner,
						hull_materials: response.data.hull_materials || prevFormData.hull_materials,
						color: response.data.color || prevFormData.color,
						length: response.data.length || prevFormData.length,
						width: response.data.width || prevFormData.width,
						depth: response.data.depth || prevFormData.depth,
						draught: response.data.draught || prevFormData.draught,
						gross_tonnage: response.data.gross_tonnage || prevFormData.gross_tonnage,
						net_tonnage: response.data.net_tonnage || prevFormData.net_tonnage,
						engine_make: response.data.engine_make || prevFormData.engine_make,
						cycle: response.data.cycle || prevFormData.cycle,
						horsepower: response.data.horsepower || prevFormData.horsepower,
						cylinder_number: response.data.cylinder_number || prevFormData.cylinder_number,
						number_of_engine: response.data.number_of_engine || prevFormData.number_of_engine,
					}));
				}
			} catch (error) {
				console.error("Error fetching vessel registration:", error);
			} finally {
				setLoading(false); // Set loading to false after fetching data
			}
		};

		if (userData.id) {
			fetchLatestPermit();
		} else {
			setLoading(false); // If userData.id is not available, stop loading
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
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Submitting formData:", formData);

		try {
			// Fetch current registration status before submitting the form
			const response = await api.get(`/api/vessel-registration/latest/${userData.id}/`);
			if (response.status === 200 && response.data) {
				const vesselStatus = response.data.status; // assuming the status field is 'status'

				// If the vessel status is not 'Pending', warn the user
				if (vesselStatus !== "Pending") {
					Swal.fire({
						title: "Notice",
						text: 'If you proceed, the status of your vessel registration will be "Pending". Do you want to continue?',
						icon: "info",
						showCancelButton: true,
						confirmButtonText: "Yes, proceed",
						cancelButtonText: "No, cancel",
					}).then(async (result) => {
						if (result.isConfirmed) {
							// Proceed with the form submission
							await submitForm(); // Call your existing submit function
						}
					});
				} else {
					// If the status is 'Pending', just submit the form
					await submitForm();
				}
			}
		} catch (error) {
			console.error("Error checking vessel status:", error);
			Swal.fire({
				title: "Error!",
				text: "There was an error checking the vessel status. Please try again.",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

	// Separate function to submit the form
	const submitForm = async () => {
		try {
			console.log("FormData before submit:", formData);
			const response = await api.post(`/api/vessel-registration/${userData.id}/`, formData);
			if (response.status === 201) {
				Swal.fire({
					title: "Registration Submitted",
					text: "Vessel Registration Submitted Successfully!",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					// Refresh the page after the alert is dismissed
					window.location.reload();
				});

				// Reset the form
				setFormData({
					vessel_name: "",
					service_type: "",
					home_port: "",
					builder_name: "",
					year_built: "",
					place_built: "",
					former_vessel_name: "",
					former_owner: "",
					hull_materials: "",
					color: "",
					length: "",
					width: "",
					depth: "",
					draught: "",
					gross_tonnage: "",
					net_tonnage: "",
					engine_make: "",
					cycle: "",
					horsepower: "",
					cylinder_number: "",
					number_of_engine: "",
					owner: userData.id,
				});
			}
		} catch (error) {
			console.error("Error registering vessel:", error);
			Swal.fire({
				title: "Error!",
				text: "There was an error submitting the form. Please try again later.",
				icon: "error",
				confirmButtonText: "OK",
			}).then(() => {
				// Optionally refresh the page after an error alert is dismissed
				window.location.reload();
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
								<h3 className="text-purple-500 text-3xl font-extrabold">Vessel Registration</h3>
								<p className="text-xs">Please fill in any inputs below.</p>
							</div>
							<Link
								to={"/fishermen-registration"}
								className="flex text-xs items-center">
								<ArrowBackIcon fontSize="small" />
								<p>Go back</p>
							</Link>
						</div>
						<div>
							<label className="text-gray-800 dark:text-white text-sm mb-0 block">Name of Vessel:</label>
							<select
								name="vessel_name"
								className="bg-white dark:bg-gray-800 w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
								value={formData.vessel_name}
								onChange={handleChange}>
								<option value="Bangka">Bangka</option>
								<option value="Pump Boat">Pump Boat</option>
								<option value="Tapay Tapay">Tapay Tapay</option>
								<option value="Kubkuban">Kubkuban</option>
								<option value="Payao">Payao</option>
							</select>
						</div>

						<div className="grid grid-cols-2 gap-6 mt-3">
							<div className="w-full">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Type of Service:</label>
								<input
									name="service_type"
									type="text"
									className="bg-white dark:bg-gray-800 w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.service_type}
									onChange={handleChange}
									required
								/>
							</div>
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
						</div>

						<p className="font-bold text-gray-800 dark:text-white text-lg sm:text-3xl mb-2 mt-16 uppercase text-left">
							General particulars
						</p>
						<div className="grid lg:grid-cols-3 gap-6">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Builder:</label>
								<input
									name="builder_name"
									type="text"
									className="bg-white dark:bg-gray-800 w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder={userData.builder_name}
									value={formData.builder_name}
									onChange={handleChange}
								/>
							</div>

							<div className="w-full">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Year Built:</label>
								<input
									name="year_built"
									type="date"
									className="bg-white dark:bg-gray-800 w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.year_built}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Place Built:</label>
								<input
									name="place_built"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder="Enter name"
									value={formData.place_built}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="grid lg:grid-cols-4 gap-6 mt-8">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Former Vessel Name:</label>
								<input
									name="former_vessel_name"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder="Enter name"
									value={formData.former_vessel_name}
									onChange={handleChange}
									required
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Former Owner:</label>
								<input
									name="former_owner"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.former_owner}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="w-full">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Hull Materials:</label>
								<input
									name="hull_materials"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.hull_materials}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full">
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
						</div>

						<div className="flex flex-row justify-start gap-4 flex-wrap md:flex-nowrap mt-8 w-full"></div>

						<p className="font-bold text-gray-800 dark:text-white text-lg sm:text-3xl mb-2 mt-16 uppercase text-left">
							Register Dimensions and Tonnages
						</p>
						<div className="flex flex-row justify-between flex-wrap md:flex-nowrap w-full">
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
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Width:</label>
								<input
									name="width"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.width}
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
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Draught</label>
								<input
									name="draught"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.draught}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Gross Tonnage:</label>
								<input
									name="gross_tonnage"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.gross_tonnage}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Net Tonnage:</label>
								<input
									name="net_tonnage"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.net_tonnage}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<p className="font-bold text-gray-800 dark:text-white text-lg sm:text-3xl mb-2 mt-16 uppercase text-left">
							Particulars Dimensions and Tonnages
						</p>
						<div className="flex flex-row justify-between flex-wrap md:flex-nowrap w-full">
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Engine Make:</label>
								<input
									name="engine_make"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.engine_make}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Cycle:</label>
								<input
									name="cycle"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.cycle}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Horse Power:</label>
								<input
									name="horsepower"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.horsepower}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">No. of Cylinder:</label>
								<input
									name="cylinder_number"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.cylinder_number}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">No. of Engine:</label>
								<input
									name="number_of_engine"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
									value={formData.number_of_engine}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="mt-6">
							<button
								type="submit"
								className=" px-8 text-sm tracking-wide font-semibold py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none transition-all">
								Register Vessel
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default VesselReg;
