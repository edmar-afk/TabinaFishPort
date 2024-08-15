import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../assets/api";

export default function AddFishModal({ onSubmit }) {
	const [open, setOpen] = React.useState(false);
	const [loading, setLoading] = useState(false);
	const [fishType, setFishType] = useState("");
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setFishType("");
		setError("");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError("");

		try {
			await api.post("/api/fishtypes/", { name: fishType });
			onSubmit(true, "Fish type added successfully!");
			handleClose();
		} catch (error) {
			onSubmit(false, "Failed to add fish type.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<button
				onClick={handleOpen}
				className="bg-blue-600 p-2 text-white rounded-lg px-4">
				Add Fish Type
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<div className="fixed inset-0 flex items-center justify-center">
					<div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white shadow-xl rounded-lg w-full max-w-sm mx-auto">
						<form
							className="max-w-sm mx-auto"
							onSubmit={handleSubmit}>
							<div className="mb-5">
								<label
									htmlFor="fishType"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Add Fish Type
								</label>
								<input
									type="text"
									id="fishType"
									value={fishType}
									onChange={(e) => setFishType(e.target.value)}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Bangus"
									required
								/>
							</div>

							<button
								type="submit"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
								{loading ? <CircularProgress size={24} /> : "Add"}
							</button>
							<button
								type="button"
								onClick={handleClose}
								className="text-white ml-2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
								Close
							</button>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
}
