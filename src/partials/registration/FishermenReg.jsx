import logo from "../../images/logo.png";
import Warnings from "./Warnings";
function FishermenReg() {
	return (
		<>
			<div className="flex flex-col justify-center items-center font-[sans-serif] p-0 -mt-4">
				<div className="flex flex-row flex-wrap sm:flex-nowrap items-center bg-white dark:bg-gray-800 w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
					<form className="sm:p-8 p-4 w-full">
						<div className="mb-12">
							<h3 className="text-purple-500 text-3xl font-extrabold max-md:text-center">Fisherman Registration</h3>
						</div>

						<div className="grid lg:grid-cols-3 gap-6">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Name:</label>
								<input
									name="name"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder="Enter name"
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Address:</label>
								<input
									name="lname"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Vessel Built:</label>
								<input
									name="lname"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
						</div>

						<div className="flex flex-row justify-between flex-wrap md:flex-nowrap mt-8 w-full">
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Length: (mtrs.):</label>
								<input
									name="name"
									type="number"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Breadth: (mtrs.):</label>
								<input
									name="lname"
									type="number"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Depth: (mtrs.):</label>
								<input
									name="lname"
									type="number"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Draught:</label>
								<input
									name="lname"
									type="number"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Gross Tonnage:</label>
								<input
									name="lname"
									type="number"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div className="w-full max-w-[150px] mt-4">
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Net Tonnage:</label>
								<input
									name="lname"
									type="number"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
						</div>

						<div className="grid lg:grid-cols-3 gap-6 mt-8">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Hull Material:</label>
								<input
									name="name"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Number of Decks:</label>
								<input
									name="lname"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Number of Mast:</label>
								<input
									name="lname"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
						</div>

						<div className="grid lg:grid-cols-3 gap-6 mt-8">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Color:</label>
								<input
									name="name"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Type Stern:</label>
								<input
									name="lname"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Number of Crew:</label>
								<input
									name="lname"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
						</div>

						<div className="grid lg:grid-cols-4 gap-6 mt-8">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Engine Make/Serial No.:</label>
								<input
									name="name"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Cycle:</label>
								<input
									name="lname"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Number of Cylinder:</label>
								<input
									name="lname"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Number of Engine:</label>
								<input
									name="lname"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
						</div>

						<div className="grid lg:grid-cols-2 gap-6 mt-8">
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Former Owner:</label>
								<input
									name="name"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
							<div>
								<label className="text-gray-800 dark:text-white text-sm mb-0 block">Address:</label>
								<input
									name="lname"
									type="text"
									className="bg-white dark:bg-gray-800 rounded-lg w-full text-gray-800 text-sm px-2"
									placeholder=""
								/>
							</div>
						</div>

						<div className="mt-6">
							<button
								type="button"
								className="py-3 px-8 text-sm tracking-wide font-semibold rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none transition-all">
								Register Fisherman
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default FishermenReg;
