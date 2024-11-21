import React, { useState, useEffect } from "react";import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import fishermanPic from "../../images/fishermanPic.jpg";
import bg from "../../images/bg.jpg";
import api from "../../assets/api";

function ProfileModal({ userId }) {
	const [open, setOpen] = useState(false);
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [editing, setEditing] = useState(false); // State for edit mode
	const [updatedData, setUpdatedData] = useState({ first_name: "", username: "" }); // State for edited data

	const handleOpen = () => {
		setOpen(true);
		fetchUserData();
	};

	const handleClose = () => setOpen(false);

	const fetchUserData = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.get(`/api/users/${userId}/`);
			setUserData(response.data);
			setUpdatedData({ first_name: response.data.first_name, username: response.data.username }); // Initialize updatedData
		} catch (err) {
			setError("Failed to fetch user data.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = () => setEditing(true);

	const handleSave = async () => {
		setLoading(true);
		try {
			const response = await api.put(`/api/users/${userId}/edit/`, updatedData);
			setUserData(response.data.user);
			setEditing(false);
		} catch (err) {
			setError("Failed to save updates.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedData({ ...updatedData, [name]: value });
	};

	return (
		<div>
			<button
				className="bg-white px-2 py-2 rounded-full"
				onClick={handleOpen}>
				<AssignmentIndIcon fontSize="large" />
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="profile-modal-title"
				aria-describedby="profile-modal-description">
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 600,
						bgcolor: "background.paper",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
					}}>
					<Typography
						id="profile-modal-title"
						variant="h6"
						component="h2">
						Profile Details
					</Typography>

					{loading ? (
						<Typography sx={{ mt: 2 }}>Loading...</Typography>
					) : error ? (
						<Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>
					) : userData ? (
						<div className="mx-4 mt-4 bg-white shadow-xl rounded-lg text-gray-900">
							<div className="rounded-t-lg h-52 overflow-hidden">
								<img
									className="object-cover object-top w-full"
									src={bg}
									alt="Municipal"
								/>
							</div>
							<div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
								<img
									className="object-cover object-center h-32"
									src={fishermanPic}
									alt="Profile Picture"
								/>
							</div>
							<div className="text-center mt-2">
								{editing ? (
									<>
										<TextField
											label="First Name"
											name="first_name"
											value={updatedData.first_name}
											onChange={handleChange}
											fullWidth
											margin="normal"
										/>
										<TextField
											label="Username"
											name="username"
											value={updatedData.username}
											onChange={handleChange}
											fullWidth
											margin="normal"
										/>
									</>
								) : (
									<>
										<h2 className="font-semibold">{userData.first_name}</h2>
										<p className="text-gray-500">{userData.username}</p>
									</>
								)}
							</div>
							<div className="p-4 border-t mx-8 mt-2">
								{editing ? (
									<button
										className="w-1/2 block mx-auto rounded-full bg-green-600 hover:shadow-lg font-semibold text-white px-6 py-2"
										onClick={handleSave}>
										Save
									</button>
								) : (
									<button
										className="w-1/2 block mx-auto rounded-full bg-blue-900 hover:shadow-lg font-semibold text-white px-6 py-2"
										onClick={handleEdit}>
										Edit
									</button>
								)}
							</div>
						</div>
					) : (
						<Typography sx={{ mt: 2 }}>No user data available.</Typography>
					)}
					<Button
						variant="contained"
						color="primary"
						onClick={handleClose}
						sx={{ mt: 2 }}>
						Close
					</Button>
				</Box>
			</Modal>
		</div>
	);
}

export default ProfileModal;
