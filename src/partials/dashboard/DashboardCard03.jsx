import React, { useState, useEffect } from "react";
import Bubbles from "../../components/Bubbles";
import lguLogo from "../../images/lgu.jpg";
import CountUp from "react-countup";
import api from "../../assets/api";

function DashboardCard03() {
	const [totalAmountFishing, setTotalAmountFishing] = useState(0);
	const [totalAmountVessel, setTotalAmountVessel] = useState(0);

	useEffect(() => {
		// Fetch the total amount for fishing permits
		api
			.get("/api/fishing-permit-income/")
			.then((response) => {
				setTotalAmountFishing(response.data.total_amount_granted);
			})
			.catch((error) => {
				console.error("Error fetching fishing permit income:", error);
				setTotalAmountFishing(0);
			});

		// Fetch the total amount for vessel registrations
		api
			.get("/api/vessel-registration-income/")
			.then((response) => {
				setTotalAmountVessel(response.data.total_amount_active);
			})
			.catch((error) => {
				console.error("Error fetching vessel registration income:", error);
				setTotalAmountVessel(0);
			});
	}, []);

	// Calculate division results
	const fishingPermitDivision = (totalAmountFishing / 760)
	const vesselDivision = (totalAmountVessel / 554)

	return (
		<div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
			<div className="px-5 pt-5">
				<header className="flex justify-between items-start mb-2">
					<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">LGU Income gained</h2>
				</header>
				<div className="flex flex-row justify-between">
					<div>
						<div className="text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase mb-1">
							<p>Fishing Permits</p>
							<p className="text-left">₱760.00 x {fishingPermitDivision} Permits =</p>
						</div>
						<div className="flex items-start">
							<div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
								₱
								<CountUp
									end={totalAmountFishing}
									duration={2.75}
									separator=","
									prefix=""
								/>
							</div>
						</div>
					</div>

					<div>
						<div className="text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase mb-1">
							<p>Vessel Registrations</p>
							<p className="text-right">₱554.00 x {vesselDivision} vessels =</p>
						</div>
						<div className="flex justify-end">
							<div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
								₱
								<CountUp
									end={totalAmountVessel}
									duration={2.75}
									separator=","
									prefix=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grow max-sm:max-h-[128px] xl:max-h-[128px] ocean">
				<img
					src={lguLogo}
					className="w-44 mx-auto rounded-full"
					alt="LGU Logo"
				/>
				<Bubbles />
			</div>
		</div>
	);
}

export default DashboardCard03;
