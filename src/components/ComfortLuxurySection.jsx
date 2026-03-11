import mainCar from '../assets/maincar.png';
import businessSedan from '../assets/business_seedan.png';
import premiumSedan from '../assets/Premium_seedan.png';
import luxurySuv from '../assets/luxury_suv.png';
import premiumSuv from '../assets/premium_suv.png';

const vehicles = [
  { img: businessSedan, name: 'Business Sedan', sub: 'Up to 3 passengers' },
  { img: premiumSedan, name: 'Premium Sedan', sub: 'Up to 3 passengers' },
  { img: luxurySuv, name: 'Luxury SUV', sub: 'Up to 6 passengers' },
  { img: premiumSuv, name: 'Premium SUV', sub: 'Up to 6 passengers' },
];

export default function ComfortLuxurySection() {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 px-8 md:px-16">

        {/* Left — Text + left-bleeding car */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          {/* Title & description */}
          <div className="mb-6 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b5e] mb-3">
              Comfort &amp; Luxury
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              Choose from our luxury vehicles offering comfort, style, and
              professional chauffeur service for every trip.
            </p>
          </div>

          {/* Car image container — maintains height in the grid, image breaks left to window edge */}
          <div className="w-full h-[250px] md:h-[320px]">
            <img
              src={mainCar}
              alt="Luxury Car"
              className="absolute left-0 w-[95vw] md:w-[48vw] h-[250px] md:h-[320px] object-contain object-left drop-shadow-xl"
            />
          </div>
        </div>

        {/* Right — 2×2 vehicle grid */}
        <div className="flex-1 w-full grid grid-cols-2 gap-6 lg:max-w-lg xl:max-w-xl">
          {vehicles.map((v, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden ">
              <img
                src={v.img}
                alt={v.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-3">
                <p className="font-semibold text-gray-800 text-sm">{v.name}</p>
                <p className="text-gray-400 text-xs">{v.sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
