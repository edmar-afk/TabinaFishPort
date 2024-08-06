import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ScaleIcon from "@mui/icons-material/Scale";
import PercentIcon from "@mui/icons-material/Percent";
import { useState } from "react";
function WeighIn() {
	const [price, setPrice] = useState("");
	const [kilo, setKilo] = useState("");
	const [discount, setDiscount] = useState("");
	const [total, setTotal] = useState(0);

	const calculateTotal = (price, kilo, discount) => {
		let total = price * kilo;
		if (discount) {
			total -= (total * discount) / 100;
		}
		setTotal(total.toFixed(2)); // Set total with 2 decimal places
	};

	const handlePriceChange = (e) => {
		const newPrice = e.target.value;
		setPrice(newPrice);
		calculateTotal(newPrice, kilo, discount);
	};

	const handleKiloChange = (e) => {
		const newKilo = e.target.value;
		setKilo(newKilo);
		calculateTotal(price, newKilo, discount);
	};

	const handleDiscountChange = (e) => {
		const newDiscount = e.target.value;
		setDiscount(newDiscount);
		calculateTotal(price, kilo, newDiscount);
	};
	return (
		<>
			<section className="bg-transparent antialiased mt-24">
				<form
					action="#"
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
											htmlFor="discount"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Discount (Optional)
										</label>
										<div className="relative">
											<div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
												<PercentIcon />
											</div>
											<input
												type="number"
												id="discount"
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="10"
												value={discount}
												onChange={handleDiscountChange}
											/>
										</div>
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
										<dt className="text-base font-normal text-gray-500 dark:text-gray-400">Discount</dt>
										<dd className="text-base font-medium text-gray-900 dark:text-white">{discount} %</dd>
									</dl>

									<dl className="flex items-center justify-between gap-4 py-3">
										<dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
										<dd className="text-base font-bold text-gray-900 dark:text-white">₱{total}</dd>
									</dl>
								</div>
							</div>

							<div className="space-y-3">
								<button
									type="submit"
									className="flex w-fit items-center justify-center rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
									<SaveOutlinedIcon /> Save
								</button>

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
