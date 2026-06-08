import { useCallback, useEffect, useRef, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { MdOutlineLocationOn } from 'react-icons/md';
import { LuMapPin } from 'react-icons/lu';
import { GOOGLE_MAPS_LIBRARIES } from '../../config/googleMaps';

export default function BookingAddressRow({
  value,
  onChange,
  placeholder,
  iconColor = 'text-gray-400',
  actions,
  className = '',
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const [predictions, setPredictions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const serviceRef = useRef(null);
  const sessionTokenRef = useRef(null);

  useEffect(() => {
    if (isLoaded && window.google) {
      serviceRef.current = new window.google.maps.places.AutocompleteService();
      sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
    }
  }, [isLoaded]);

  const fetchPredictions = useCallback((input) => {
    if (!serviceRef.current || input.length < 2) {
      setPredictions([]);
      setShowDropdown(false);
      return;
    }

    serviceRef.current.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: 'us' },
        sessionToken: sessionTokenRef.current,
        types: ['geocode'],
      },
      (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results?.length
        ) {
          setPredictions(results);
          setShowDropdown(true);
        } else {
          setPredictions([]);
          setShowDropdown(false);
        }
      },
    );
  }, []);

  const handleChange = (e) => {
    onChange(e.target.value);
    fetchPredictions(e.target.value);
  };

  const handleSelect = (prediction) => {
    if (window.google) {
      sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
    }
    setShowDropdown(false);
    setPredictions([]);
    onChange(prediction.description);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-sm gap-0 md:gap-3">
        <MdOutlineLocationOn className={`${iconColor} flex-shrink-0`} size={20} />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-700"
        />
        {actions}
      </div>

      {showDropdown && predictions.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-y-auto max-h-[220px]">
          {predictions.map((prediction, index) => (
            <div
              key={prediction.place_id}
              onMouseDown={() => handleSelect(prediction)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                index !== predictions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="mt-0.5 text-gray-400 flex-shrink-0">
                <LuMapPin size={15} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-medium text-gray-900 truncate">
                  {prediction.structured_formatting?.main_text || prediction.description}
                </span>
                <span className="text-[11.5px] text-gray-400 truncate">
                  {prediction.structured_formatting?.secondary_text || ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
