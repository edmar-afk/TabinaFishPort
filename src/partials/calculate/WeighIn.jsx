import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ScaleIcon from "@mui/icons-material/Scale";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import { useState } from "react";
import api from "../../assets/api";
import Swal from "sweetalert2"; // Assuming you're using SweetAlert2 for notifications
import HistoryModal from "./HistoryModal";

function WeighIn({ fishTypes }) {
	const [price, setPrice] = useState("");
	const [kilo, setKilo] = useState("");
	const [total, setTotal] = useState(0);
	const [selectedFishType, setSelectedFishType] = useState("");

	const calculateTotal = (price, kilo) => {
		let total = price * kilo;
		setTotal(total.toFixed(2)); // Set total with 2 decimal places
	};

	const handlePriceChange = (e) => {
		const newPrice = e.target.value;
		setPrice(newPrice);
		calculateTotal(newPrice, kilo);
	};

	const handleKiloChange = (e) => {
		const newKilo = e.target.value;
		setKilo(newKilo);
		calculateTotal(price, newKilo);
	};

	const handleFishTypeChange = (e) => {
		setSelectedFishType(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newWeighIn = {
			fish: selectedFishType,
			price_per_kilo: price,
			kg: kilo,
			total_price: total,
		};

		try {
			const response = await api.post("/api/weighin/", newWeighIn);
			Swal.fire("Success!", "Weigh-in recorded successfully.", "success");
			// Clear form inputs after successful submission
			setPrice("");
			setKilo("");
			setTotal(0);
			setSelectedFishType("");
		} catch (error) {
			Swal.fire("Error!", "There was a problem recording the weigh-in.", "error");
		}
	};

	// Ensure id comparison is consistent
	const selectedFishName = fishTypes.find((fish) => fish.id === parseInt(selectedFishType))?.name || "None selected";

	return (
		<>
			<section className="bg-transparent antialiased mt-24">
				<form
					onSubmit={handleSubmit}
					className="mx-auto max-w-screen-xl px-4 2xl:px-0">
					<div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
						<div className="min-w-0 flex-1 space-y-8">
							<div className="space-y-4">
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div>
										<label
											htmlFor="price"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Price per Kilo
										</label>
										<div className="relative">
											<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
												<p>₱</p>
											</div>
											<input
												type="number"
												id="price"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="100"
												value={price}
												onChange={handlePriceChange}
											/>
										</div>
									</div>

									<div>
										<label
											htmlFor="kilo"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Kilo (kg)
										</label>
										<div className="relative">
											<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
												<ScaleIcon />
											</div>
											<input
												type="number"
												id="kilo"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="100"
												value={kilo}
												onChange={handleKiloChange}
											/>
										</div>
									</div>

									<div>
										<label
											htmlFor="fishTypes"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Fishes
										</label>
										<select
											id="fishTypes"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											value={selectedFishType}
											onChange={handleFishTypeChange}>
											<option value="">Select a fish</option>
											{fishTypes.map((fishType) => (
												<option
													key={fishType.id}
													value={fishType.id}>
													{fishType.name}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 max-w-2xl">
							<div className="flow-root">
								<div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
									<dl className="flex items-center justify-between gap-4 py-3">
										<dt className="text-base font-normal text-gray-500 dark:text-gray-400">Price per Kilo</dt>
										<dd className="text-base font-medium text-green-500">₱{price}</dd>
									</dl>

									<dl className="flex items-center justify-between gap-4 py-3">
										<dt className="text-base font-normal text-gray-500 dark:text-gray-400">Kilo</dt>
										<dd className="text-base font-medium text-gray-900 dark:text-white">{kilo} kg</dd>
									</dl>

									<dl className="flex items-center justify-between gap-4 py-3">
										<dt className="text-base font-normal text-gray-500 dark:text-gray-400">Selected Fish</dt>
										<dd className="text-base font-medium text-gray-900 dark:text-white">{selectedFishName}</dd>
									</dl>

									<dl className="flex items-center justify-between gap-4 py-3">
										<dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
										<dd className="text-base font-bold text-gray-900 dark:text-white">₱{total}</dd>
									</dl>
								</div>
							</div>

							<div className="space-y-3">
								<div className="flex flex-row justify-between">
									<button
										type="submit"
										className="flex w-fit items-center justify-center rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
										<SaveOutlinedIcon /> Save
									</button>
									<div className="flex w-fit items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium hover:text-purple-800 text-gray-800 dark:text-white  hover:scale-110 duration-300 focus:outline-none focus:ring-4">
										<RestoreOutlinedIcon /> <HistoryModal />
									</div>
								</div>
								<p className="text-sm font-normal text-gray-800 dark:text-gray-200">
									Don't forget to save after weighing to create a record of it.
								</p>
							</div>
						</div>
					</div>
				</form>
			</section>
		</>
	);
}

export default WeighIn;
