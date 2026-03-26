import { BsCheck2 } from 'react-icons/bs';
import { FiChevronRight } from 'react-icons/fi';
import FeatureIcons from './FeatureIcons';
import usericon from "../../assets/profileuser.png";
import briefcase from "../../assets/briefcase.png";

export default function VehicleCard({
  vehicle,
  isSelected,
  onSelect,
  passengerCount,
  setPassengerCount,
  luggageCount,
  setLuggageCount,
  onContinue
}) {
  return (
    <div
      onClick={() => onSelect(vehicle.id)}
      className={`relative rounded-2xl border cursor-pointer transition-all overflow-hidden
        ${isSelected ? 'bg-[#1a2b5e] border-[#1a2b5e] shadow-lg' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}
      `}
    >
      {/* Check / radio icon — top right corner */}
      <div className="absolute top-3 right-3 z-10">
        {isSelected ? (
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <BsCheck2 size={12} className="text-[#1a2b5e]" />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
        )}
      </div>
      {/* Main card row */}
      <div className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-4">
        {/* Car image */}
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-20 h-12 md:w-28 md:h-16 object-contain flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <p className={`text-sm md:text-md font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>{vehicle.name}</p>
          <p className={`text-xs md:text-sm mt-0.5 leading-snug line-clamp-1 ${isSelected ? 'text-blue-200' : 'text-gray-400'}`}>{vehicle.subtitle}</p>
          <div className="flex items-center justify-between flex-wrap gap-1">
            <FeatureIcons passengers={vehicle.passengers} luggage={vehicle.luggage} Selected={isSelected} />
            <p className={`pr-2 md:pr-5 text-base md:text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
              ${vehicle.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="px-3 pb-3 md:px-4 md:pb-4 flex flex-col gap-3">
          <div className="border-t ml-4 w-[92%] border-dashed border-white/50" />
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            {/* Passengers counter */}
            <div className="flex items-center gap-1.5 md:gap-2 bg-white/10 rounded-full px-2 md:px-3 py-1.5">
              <img src={usericon} className="w-4 h-4" />
              <span className="text-xs text-blue-200 whitespace-nowrap">Passengers (S)</span>
              <button
                onClick={(e) => { e.stopPropagation(); setPassengerCount(c => Math.max(1, c - 1)); }}
                className="w-5 h-5 rounded-full bg-white/20 text-white text-sm flex items-center justify-center hover:bg-white/30"
              >−</button>
              <span className="text-white text-xs font-semibold w-4 text-center">{passengerCount}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setPassengerCount(c => c + 1); }}
                className="w-5 h-5 rounded-full bg-white/20 text-white text-sm flex items-center justify-center hover:bg-white/30"
              >+</button>
            </div>

            {/* Luggage counter */}
            <div className="flex items-center gap-1.5 md:gap-2 bg-white/10 rounded-full px-2 md:px-3 py-1.5">
              <img src={briefcase} className="w-4 h-4" />
              <span className="text-xs text-blue-200 whitespace-nowrap">Luggage (S)</span>
              <button
                onClick={(e) => { e.stopPropagation(); setLuggageCount(c => Math.max(0, c - 1)); }}
                className="w-5 h-5 rounded-full bg-white/20 text-white text-sm flex items-center justify-center hover:bg-white/30"
              >−</button>
              <span className="text-white text-xs font-semibold w-4 text-center">{luggageCount}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setLuggageCount(c => c + 1); }}
                className="w-5 h-5 rounded-full bg-white/20 text-white text-sm flex items-center justify-center hover:bg-white/30"
              >+</button>
            </div>

            {/* Continue button */}
            <button
              onClick={(e) => { e.stopPropagation(); onContinue(); }}
              className="ml-auto flex items-center gap-2 bg-white text-[#1a2b5e] text-xs font-bold px-4 md:px-5 py-2 rounded-full hover:bg-blue-50 transition-colors"
            >
              Continue <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
