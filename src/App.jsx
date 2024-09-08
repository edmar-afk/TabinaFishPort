import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";


import Dashboard from "./pages/Dashboard";
import FisherManList from "./pages/FisherManList";
import Registration from "./pages/Registration";
import FishingPermit from "./partials/registration/FishingPermit";
import FishingPermitReg from './pages/FishingPermitReg';
import WeightCalculate from "./pages/WeightCalculate";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FishTypes from "./pages/FishTypes";
import FishermenRegistration from "./pages/FishermenRegistration";
function App() {
	const location = useLocation();

	useEffect(() => {
		document.querySelector("html").style.scrollBehavior = "auto";
		window.scroll({ top: 0 });
		document.querySelector("html").style.scrollBehavior = "";
	}, [location.pathname]); 

	function Logout() {
		localStorage.clear();
		return <Navigate to="/" />;
	}

	function RegisterAndLogout() {
		localStorage.clear();
		return <Register />;
	}


	return (
		<>
			<Routes>
				<Route
					exact
					path="/dashboard"
					element={<Dashboard />}
				/>
				<Route
					exact
					path="/register"
					element={<Register />}
				/>
				<Route
					exact
					path="/"
					element={<Login />}
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
					path="/registration"
					element={<Registration />}
				/>

				<Route
					exact
					path="/fishermen-registration"
					element={<FishermenRegistration />}
				/>

				<Route
					exact
					path="/fishing-permit"
					element={<FishingPermitReg />}
				/>
				<Route
					exact
					path="/fish-types"
					element={<FishTypes />}
				/>
				<Route
					exact
					path="/weigh-in"
					element={<WeightCalculate />}
				/>

				<Route
					path="/logout"
					element={<Logout />}
				/>
			</Routes>
		</>
	);
}

export default App;
