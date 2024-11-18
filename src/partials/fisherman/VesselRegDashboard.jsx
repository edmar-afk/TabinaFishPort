import FishingPermit from "../registration/FishingPermit";
import VesselReg from "../registration/VesselReg";

function VesselRegDashboard () {
	return (
		<>
			<div className="p-1 md:p-8 sm:p-24 bg-purple-100">
				<VesselReg />
			</div>
		</>
	);
}

export default VesselRegDashboard ;
