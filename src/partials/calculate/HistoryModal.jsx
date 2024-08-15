import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../assets/api";
import CloseIcon from "@mui/icons-material/Close";
export default function HistoryModal() {
	const [open, setOpen] = React.useState(false);
	const [loading, setLoading] = useState(false);
	const [weighIns, setWeighIns] = useState([]);
	const [error, setError] = useState("");
	const handleOpen = async () => {
		setOpen(true);
		setLoading(true);
		setError("");

		try {
			const response = await api.get("/api/weighins-list/");
			setWeighIns(response.data);
		} catch (error) {
			setError("Failed to fetch weigh-ins.");
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setOpen(false);
		setWeighIns([]);
		setError("");
	};

	return (
		<div>
			<div
				onClick={handleOpen}
				className="text-gray-800 dark:text-white ml-2 cursor-pointer">
				Weigh-In History
			</div>
			<Modal
				open={open}
				onClick={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<div className="fixed inset-0 flex items-center justify-center">
					<div className="bg-white overflow-y-scroll dark:bg-gray-800 p-6 border-2 border-black dark:border-white shadow-xl rounded-lg w-full h-full mx-auto relative min-h-[300px] max-h-[600px] min-w-[360px] max-w-[600px]">
						<div className="text-gray-800 dark:text-white sticky -top-6 py-4 g-white dark:bg-gray-800/20 backdrop-blur-lg">
							Your Transaction History display here
						</div>
						

						{loading ? (
							<div className="flex justify-center items-center">
								<CircularProgress />
							</div>
						) : error ? (
							<div className="text-red-600">{error}</div>
						) : (
							<ul>
								{weighIns.map((weighIn) => (
									<li
										key={weighIn.id}
										className="mb-4 flex flex-row">
										<div className="text-sm text-left">
											<span className="text-purple-400 font-bold">{weighIn.fish.name}</span> with a price of{" "}
											<span className="text-purple-400 font-bold">₱{weighIn.price_per_kilo}/kg</span> and a weight of{" "}
											<span className="text-purple-400 font-bold">{weighIn.kg}kg</span> has been sold for a total of{" "}
											<span className="text-purple-400 font-bold">₱{weighIn.total_price}</span> at{" "}
											<span className="text-purple-400 font-bold">
												{new Date(weighIn.date_weighin).toLocaleString()}
											</span>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</Modal>
		</div>
	);
}
