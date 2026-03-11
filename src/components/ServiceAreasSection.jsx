import globeImg from '../assets/globe_map.png';

const pins = [
  { label: 'USA',    top: '42%', left: '20%', color: 'text-red-500' },
  { label: 'UK',     top: '30%', left: '45%', color: 'text-blue-600' },
  { label: 'Canada', top: '28%', left: '18%', color: 'text-red-400' },
];

export default function ServiceAreasSection() {
  return (
    <section className="py-20 px-8 md:px-16 bg-gray-50 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Service Areas</h2>
      <p className="text-gray-500 text-sm mb-12 max-w-lg mx-auto">
        Providing premium chauffeur services across major cities and key international destinations, ensuring safe and luxury transportation wherever you travel.
      </p>

      <div className="relative max-w-3xl mx-auto">
        <img src={globeImg} alt="Globe Map" className="w-full object-contain" />

        {/* Location Pins */}
        {pins.map((pin, i) => (
          <div
            key={i}
            className={`absolute flex flex-col items-center ${pin.color}`}
            style={{ top: pin.top, left: pin.left, transform: 'translate(-50%, -100%)' }}
          >
            <span className="text-2xl drop-shadow">📍</span>
            <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-0.5 rounded shadow mt-1">
              {pin.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
