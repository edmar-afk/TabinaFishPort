import React, { useState } from "react";import logo from "../images/logo.png";import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";import { Link, useNavigate } from "react-router-dom";import api from "../assets/api";import CircularProgress from "@mui/material/CircularProgress";import Swal from "sweetalert2";
function Register() {
	const [formData, setFormData] = useState({
		full_name: "",
		mobile_num: "",
		password: "",
		password2: "",
		is_superuser: false, // Display only; not sent to the API
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [errors, setErrors] = useState({
		mobile_num: "",
	});


	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		if (name === "mobile_num") {
			// Validate mobile number in real-time
			const mobileRegex = /^(09\d{9})$/;
			if (!mobileRegex.test(value)) {
				setErrors({
					...errors,
					mobile_num: "Mobile number must start with 09 and be 11 digits long.",
				});
			} else {
				setErrors({
					...errors,
					mobile_num: "",
				});
			}
		}
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate mobile number
		const mobileRegex = /^(09\d{9})$/;
		if (!mobileRegex.test(formData.mobile_num)) {
			setErrors({ ...errors, mobile_num: "Mobile number must start with 09 and be 11 digits long." });
			return;
		}

		// Reset error if validation passes
		setErrors({ ...errors, mobile_num: "" });

		if (formData.password !== formData.password2) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Passwords do not match.",
			});
			return;
		}

		setLoading(true);

		try {
			// Send the registration data
			await api.post("/api/register/", {
				username: formData.mobile_num, // Using mobile number as username
				password: formData.password,
				first_name: formData.full_name,
				email: "", // or add another field to capture email if required
			});

			// If registration is successful, show success Swal
			Swal.fire({
				icon: "success",
				title: "Registration Successful",
				text: "You will be redirected to the login page.",
				confirmButtonText: "Okay",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/");
				}
			});
		} catch (error) {
			console.error(error);

			// Default error message
			let errorMessage = "Something went wrong. Please try again.";

			// Check if the error response contains the 'username' field error
			if (error.response && error.response.data && error.response.data.username) {
				// Custom message for mobile number (username) already existing
				if (error.response.data.username[0].includes("username")) {
					errorMessage = "A user with that Mobile Number already exists.";
				} else {
					errorMessage = error.response.data.username[0];
				}
			}

			// Show the error message in SweetAlert
			Swal.fire({
				icon: "error",
				title: "Registration Failed",
				text: errorMessage,
			});
		} finally {
			setLoading(false);
		}
	};


	return (
		<>
			<div className="max-w-screen-lg mx-auto p-2 sm:p-5 mt-4 sm:mt-14 shadow-2xl rounded-2xl">
				<div className="grid grid-cols-1 md:grid-cols-12 border">
					<div className="bg-purple-950 md:col-span-4 p-10 text-white rounded-2xl">
						<p className="mt-4 text-sm leading-7 font-regular uppercase">Tabina Fish Port</p>
						<h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
							Regis<span className="text-purple-600">ter</span>
						</h3>
						<p className="mt-4 leading-7 text-gray-200">
							Hello Fisherman, before filing the vessel form kindly register your name first.
						</p>

						<div className="flex items-center mt-5">
							<LocationOnOutlinedIcon className="mr-2" />
							<span className="text-sm">Tabina, Zamboanga del Sur</span>
						</div>
						<div className="flex items-center mt-5">
							<PhoneOutlinedIcon className="mr-2" />
							<span className="text-sm">09123456789</span>
						</div>
						<div className="flex items-center mt-5">
							<AccessTimeOutlinedIcon className="mr-2" />
							<span className="text-sm">24/7</span>
						</div>

						<img
							src={logo}
							className="w-44 mt-12 flex mx-auto"
							alt=""
						/>
					</div>
					<form
						className="md:col-span-8 p-3 sm:p-10"
						onSubmit={handleSubmit}>
						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="fullname">
									Full Name
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="fullname"
									type="text"
									name="full_name"
									value={formData.full_name}
									onChange={handleChange}
									placeholder="Cardo Dalisay"
								/>
							</div>
							<div className="w-full md:w-1/2 px-3">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="mobilenumber">
									Mobile Number
								</label>
								<input
									className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
										errors.mobile_num ? "border-red-500" : "border-gray-200"
									} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
									id="mobilenumber"
									type="number"
									name="mobile_num"
									value={formData.mobile_num}
									onChange={handleChange}
									placeholder="09123456789"
								/>
								{errors.mobile_num && <p className="text-red-500 text-xs italic">{errors.mobile_num}</p>}
							</div>
						</div>
						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="w-full px-3">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="password">
									Password
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="password"
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="*********"
								/>
							</div>
						</div>

						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="w-full px-3">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="password2">
									Repeat Password
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="password2"
									type="password"
									name="password2"
									value={formData.password2}
									onChange={handleChange}
									placeholder="*********"
								/>
							</div>
						</div>

						<div className="flex flex-col justify-between -mx-3 mb-6">
							<div className="flex items-center justify-between w-full mb-4">
								<button
									className={`shadow-2xl hover:scale-110 duration-300 ${
										errors.mobile_num ? "bg-red-600" : "bg-purple-600"
									} hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded`}
									type="submit"
									disabled={loading || errors.mobile_num}>
									Register
								</button>
								{loading && (
									<div className="flex items-center ml-4">
										<CircularProgress
											size={24}
											className="mr-2"
										/>
										<span>Loading...</span>
									</div>
								)}
							</div>

							<div className="">
								Already have an account?{" "}
								<Link
									to={"/"}
									className="text-purple-600 font-bold">
									Login here
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Register;
