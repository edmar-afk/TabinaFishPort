import React, { useState } from "react";import logo from "../images/logo.png";import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Link, useNavigate } from "react-router-dom";
import api from "../assets/api";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

function Login() {
	const [formData, setFormData] = useState({
		mobile_num: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate(); 

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await api.post("/api/token/", {
				username: formData.mobile_num,
				password: formData.password,
			});

			const { access, refresh } = response.data;

			localStorage.setItem("access_token", access);
			localStorage.setItem("refresh_token", refresh);

			// Fetch the user's profile data
			const userProfileResponse = await api.get("/api/user/", {
				headers: {
					Authorization: `Bearer ${access}`,
				},
			});

			const userData = userProfileResponse.data;
			const { is_superuser } = userData;

			// Save userData in localStorage
			localStorage.setItem("userData", JSON.stringify(userData));

			// Navigate based on user type
			if (is_superuser) {
				Swal.fire({
					title: "Login successful!",
					text: "Welcome, Admin!",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					navigate("/dashboard");
				});
			} else {
				Swal.fire({
					title: "Login successful!",
					text: "Redirecting to Fishermen Registration.",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					navigate("/fishermen-registration");
				});
			}
		} catch (error) {
			console.error(error);
			Swal.fire({
				title: "Login failed!",
				text: "Invalid credentials or server error.",
				icon: "error",
				confirmButtonText: "Try Again",
			});
		} finally {
			setLoading(false);
		}
	};


	return (
		<>
			<div className="max-w-5xl mx-auto p-2 sm:p-5 mt-4 sm:mt-24 shadow-2xl rounded-2xl">
				<div className="grid grid-cols-1 md:grid-cols-12 border dark:border-gray-700">
					<div className="bg-purple-950 md:col-span-4 p-10 text-white rounded-2xl">
						<p className="mt-4 text-sm leading-7 font-regular uppercase">Tabina Fish Port</p>
						<h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
							Log<span className="text-purple-600">in</span>
						</h3>

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
							<div className="w-full px-3">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs dark:text-white font-bold mb-2"
									htmlFor="number">
									Mobile Number
								</label>
								<input
									className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="number"
									type="text"
									name="mobile_num"
									value={formData.mobile_num}
									onChange={handleChange}
									placeholder="09123456789"
								/>
							</div>
						</div>

						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="w-full px-3">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs dark:text-white font-bold mb-2"
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

						<div className="flex flex-col justify-between -mx-3 mb-6">
							<div className="flex items-center justify-between w-full mb-4">
								<button
									className="shadow-2xl hover:scale-110 duration-300 bg-purple-600 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
									type="submit"
									disabled={loading}>
									{loading ? (
										<div className="flex items-center">
											<CircularProgress
												size={24}
												className="mr-2"
											/>
											<span>Logging in...</span>
										</div>
									) : (
										"Login"
									)}
								</button>
							</div>

							<div className="">
								Don't have an account?{" "}
								<Link
									to={"/register"}
									className="text-purple-600 font-bold">
									Register here
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
