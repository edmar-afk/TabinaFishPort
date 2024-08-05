import React from "react";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import me from "../../images/me.jpg";
function DashboardCard07() {
	return (
		<div className="col-span-full bg-white dark:bg-gray-800 shadow-sm rounded-xl">
			<header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
				<h2 className="font-semibold text-gray-800 dark:text-gray-100">Registered Fishermen</h2>
			</header>
			<div className="p-3">
				{/* Table */}
				<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-gray-300">
						{/* Table header */}
						<thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
							<tr>
								<th className="p-2">
									<div className="font-semibold text-left">Name</div>
								</th>
								<th className="p-2">
									<div className="font-semibold text-center">Boat Status</div>
								</th>
								<th className="p-2">
									<div className="font-semibold text-center">Registration Expiry Date</div>
								</th>
								<th className="p-2">
									<div className="font-semibold text-center">Action</div>
								</th>
							</tr>
						</thead>
						{/* Table body */}
						<tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
							{/* Row */}
							<tr>
								<td className="p-2">
									<div className="flex items-center">
										<img
											src={me}
											className="w-10 rounded-full mr-2"
											alt=""
										/>
										<div className="text-gray-800 dark:text-gray-100">Zoren Garcia Sano</div>
									</div>
								</td>
								<td className="p-2">
									<div className="text-center text-green-400">
										<SentimentSatisfiedAltOutlinedIcon /> Good
									</div>
								</td>
								<td className="p-2">
									<div className="text-center text-orange-500">Oct. 22 2026</div>
								</td>
								<td className="p-2">
									<a
										href="#"
										className="text-center text-blue-400">
										View
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default DashboardCard07;
