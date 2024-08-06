import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import FisherManList from "./pages/FisherManList";
import Registration from "./pages/Registration";
import FishingPermit from "./partials/registration/FishingPermit";
import FishingPermitReg from './pages/FishingPermitReg';
function App() {
	const location = useLocation();

	useEffect(() => {
		document.querySelector("html").style.scrollBehavior = "auto";
		window.scroll({ top: 0 });
		document.querySelector("html").style.scrollBehavior = "";
	}, [location.pathname]); // triggered on route change

	return (
		<>
			<Routes>
				<Route
					exact
					path="/"
					element={<Dashboard />}
				/>
				<Route
					exact
					path="/fisherman-lists"
					element={<FisherManList />}
				/>
				<Route
					exact
					path="/registration"
					element={<Registration />}
				/>

				<Route
					exact
					path="/fishing-permit"
					element={<FishingPermitReg />}
				/>
			</Routes>
		</>
	);
}

export default App;
