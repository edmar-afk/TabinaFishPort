import { Link } from "react-router-dom";import logo from "../../images/logo.png";import ProfileModal from "../profile/ProfileModal";function Header({ fishermanName, userId }) {	return (
	<>
		<div className="relative ">
			<div className="flex flex-row bg-blue-600 w-full items-center border-2 border-gray-800 p-4">
				<div className="">
					<img
						src={logo}
						alt=""
						className="w-44 block sm:absolute top-4"
					/>
				</div>
				<div className="flex flex-col">
					<p className="text-2xl sm:text-6xl font-bold text-white ml-0 sm:ml-44">TABINA FISHPORT</p>
					<p className="text-white ml-3 mt-3 text-xs sm:text-sm sm:ml-52">
						ONLINE VESSEL REGISTRATION AND PERMIT APPLICATION
					</p>
				</div>
			</div>
			<div className="text-xs sm:text-sm bg-white px-2 sm:px-52 border-2 border-gray-800 p-4 italic font-bold flex flex-row items-center justify-between">
				<p>Welcome, {fishermanName}</p>{" "}
				<div className="flex items-center">
					<ProfileModal userId={userId} /> | <Link to={"/logout"} className="ml-2 text-red-600">Logout</Link>
				</div>
			</div>
		</div>
	</>
);
}

export default Header;
