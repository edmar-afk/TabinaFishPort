import React from 'react';
import BarChart from '../../charts/BarChart01';
import Bubbles from "../../components/Bubbles";
// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04() {

  const chartData = {
		labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
		datasets: [
			// Light blue bars
			{
				label: "Weekly Profit",
				data: [800, 1600, 900, 1300, 1950, 1700, 100],
				backgroundColor: tailwindConfig().theme.colors.sky[500],
				hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
				barPercentage: 0.7,
				categoryPercentage: 0.7,
				borderRadius: 4,
			},
		],
	};

  return (
		<div className="flex flex-col col-span-full bg-white dark:bg-gray-800 shadow-sm rounded-xl w-full ocean">
			<header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex flex-row justify-between">
				<h2 className="font-semibold text-gray-800 dark:text-gray-100">Fish Caught Report</h2>
				<div className='flex flex-col sm:flex-row'>
					<a href='#' className="font-semibold hover:scale-110 duration-300 text-purple-600 dark:text-gray-100 bg-purple-200 dark:bg-purple-700 mx-2 p-0.5 px-2 my-1 sm:my-0 rounded-xl">Daily</a>
					<a href='#' className="font-semibold hover:scale-110 duration-300 text-purple-600 dark:text-gray-100 bg-purple-200 dark:bg-purple-700 mx-2 p-0.5 px-2 my-1 sm:my-0 rounded-xl">Weekly</a>
					<a href='#' className="font-semibold hover:scale-110 duration-300 text-purple-600 dark:text-gray-100 bg-purple-200 dark:bg-purple-700 mx-2 p-0.5 px-2 my-1 sm:my-0 rounded-xl">Monthly</a>
				</div>
			</header>
			{/* Chart built with Chart.js 3 */}
			{/* Change the height attribute to adjust the chart height */}
			<BarChart
				data={chartData}
				width={595}
				height={248}
			/>
			<Bubbles />
		</div>
	);
}

export default DashboardCard04;
