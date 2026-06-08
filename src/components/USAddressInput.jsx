import { useCallback, useEffect, useRef, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { FiSearch, FiX } from 'react-icons/fi';
import { LuMapPin } from 'react-icons/lu';
import { GOOGLE_MAPS_LIBRARIES } from '../config/googleMaps';

export default function USAddressInput({
  value,
  onChange,
  onSelect,
  placeholder = 'Search Address...',
  label,
  error,
  types = ['address'],
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

  const fetchPredictions = useCallback(
    (input) => {
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
          types,
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
    },
    [types],
  );

  const handleChange = (e) => {
    onChange(e);
    fetchPredictions(e.target.value);
  };

  const handleSelect = (prediction) => {
    if (window.google) {
      sessionTokenRef.current =
        new window.google.maps.places.AutocompleteSessionToken();
    }
    setShowDropdown(false);
    setPredictions([]);
    onSelect(prediction);
  };

  const handleClear = () => {
    onChange({ target: { value: '' } });
    setPredictions([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-[14px] text-gray-600 mb-2 ml-1">{label}</label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" size={18} />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder={isLoaded ? placeholder : 'Loading maps...'}
          disabled={!isLoaded}
          className={`w-full rounded-full border bg-white py-3.5 pl-11 pr-10 text-[15px] text-gray-700 outline-none focus:border-[#1b2d5d] disabled:opacity-50 transition-colors ${
            error ? 'border-red-300' : 'border-gray-200/80'
          }`}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-red-500 hover:text-red-700"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {showDropdown && predictions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-y-auto max-h-[260px]">
          {predictions.map((prediction, index) => (
            <div
              key={prediction.place_id}
              onMouseDown={() => handleSelect(prediction)}
              className={`flex items-start gap-4 px-5 py-3.5 cursor-pointer hover:bg-gray-50 ${
                index !== predictions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="mt-0.5 text-gray-400">
                <LuMapPin size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-medium text-gray-900">
                  {prediction.structured_formatting?.main_text || prediction.description}
                </span>
                <span className="text-[12.5px] text-gray-400 mt-0.5">
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
