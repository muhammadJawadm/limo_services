import usericon from "../../assets/profileuser.png";
import briefcase from "../../assets/briefcase.png";
import usericonblack from "../../assets/profile2userblack.png";
import briefcaseblack from "../../assets/briefcaseblack.png";
import seat from "../../assets/seat.png";
import wifi from "../../assets/wifi.png";
import drink from "../../assets/drink.png";
import plane from "../../assets/plane.png";
import seatblack from "../../assets/seatblack.png";
import wifiblack from "../../assets/wifiblack.png";
import drinkblack from "../../assets/drinkblack.png";
import planeblack from "../../assets/planeblack.png";

export default function FeatureIcons({ passengers, luggage, Selected }) {
  if (Selected) {
    return (
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center gap-3 bg-white/10 rounded-full px-3 py-1.5">
          <span className="flex items-center gap-1 text-xs text-white">
            <img src={usericon} alt="User" className="w-5 h-5" /> {passengers}
          </span>
          <span className="flex items-center gap-1 text-xs text-white">
            <img src={briefcase} alt="Luggage" className="w-5 h-5" /> {luggage}
          </span>
        </div>
        <img src={seat} alt="Features" className="w-6 h-6" />
        <img src={wifi} alt="Features" className="w-6 h-6" />
        <img src={drink} alt="Features" className="w-6 h-6" />
        <img src={plane} alt="Features" className="w-6 h-6" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex items-center gap-3  border rounded-full px-3 py-1.5">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <img src={usericonblack} alt="User" className="w-4 h-4" /> {passengers}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <img src={briefcaseblack} alt="Luggage" className="w-4 h-4" /> {luggage}
        </span>
      </div>
      <img src={seatblack} alt="Features" className="w-6 h-6" />
      <img src={wifiblack} alt="Features" className="w-6 h-6" />
      <img src={drinkblack} alt="Features" className="w-6 h-6" />
      <img src={planeblack} alt="Features" className="w-6 h-6" />
    </div>
  );
}
