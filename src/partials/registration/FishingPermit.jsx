import logo from "../../images/logo.png";
function FishingPermit() {
	return (
		<>
			<div className="flex flex-col justify-center items-center font-[sans-serif]">
				<div className="flex flex-row flex-wrap sm:flex-nowrap items-center bg-white dark:bg-gray-800 w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
					<form className="sm:p-8 p-4 w-full">
						<div className="mb-12">
							<h3 className="text-purple-500 text-3xl font-extrabold max-md:text-center">Fishing Permit</h3>
						</div>

						<div className="grid lg:grid-cols-2 gap-6">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">
									Name of Owner <span className="text-xs font-bold">(First Name, M.I., Surname)</span>:
								</label>
								<input
									name="ownerName"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder="Enter name"
								/>
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
								/>
							</div>
						</div>

						<div className="grid lg:grid-cols-2 gap-6 mt-8">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Home Port:</label>
								<input
									name="homePort"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder="Enter name"
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Name of Fishing Vessel:</label>
								<input
									name="vesselName"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
						</div>

						<div className="flex flex-row justify-between flex-wrap md:flex-nowrap mt-8 w-full">
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Vessel Type:</label>
								<input
									name="vesselType"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Color:</label>
								<input
									name="color"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Type of Service:</label>
								<input
									name="service"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Vessel Description:</label>
								<input
									name="vesselDescription"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
						</div>

						<div className="flex flex-row justify-between flex-wrap md:flex-nowrap mt-8 w-full">
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Length: (mtrs.):</label>
								<input
									name="lenght"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Breadth: (mtrs.):</label>
								<input
									name="breadth"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Depth: (mtrs.):</label>
								<input
									name="depth"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>

							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Gross Tonnage:</label>
								<input
									name="gross"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Net Tonnage:</label>
								<input
									name="tonnage"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
						</div>

						<div className="flex flex-row justify-between flex-wrap md:flex-nowrap mt-8 w-full">
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Engine Make:</label>
								<input
									name="egineMake"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Serial Number:</label>
								<input
									name="serialNo"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Horse Power:</label>
								<input
									name="horsePower"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">No. of Cylinder:</label>
								<input
									name="cylinderNo"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">No. of Engine:</label>
								<input
									name="engineNo"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
						</div>

						<div className="grid lg:grid-cols-3 gap-6 mt-8">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">No. of Crew:</label>
								<input
									name="crew"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Coast Guard No.:</label>
								<input
									name="coast"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">MFVR No.:</label>
								<input
									name="mfvr"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
						</div>

						<div className="flex flex-row justify-between flex-wrap md:flex-nowrap mt-8 w-full">
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">OR Number:</label>
								<input
									name="orNo"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Date Issued:</label>
								<input
									name="dateIssued"
									type="date"
									className="bg-white dark:bg-gray-800 w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">
									Amount <span className="font-bold text-xs">(PHP)</span>:
								</label>
								<input
									name="Amount"
									type="text"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] sm:max-w-[250px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Fishing Gear Used:</label>
								<input
									name="fishingGear"
									type="number"
									className="bg-white dark:bg-gray-800  w-full text-gray-800 dark:text-white text-sm px-2 rounded-lg"
									placeholder=""
								/>
							</div>
						</div>

						<div className="mt-6">
							<button
								type="button"
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
