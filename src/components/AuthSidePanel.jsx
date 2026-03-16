import blueCarImg from '../assets/bluecar.png';
import mapImg from '../assets/grouplocationicon.png';

export default function AuthSidePanel() {
  return (
    <section className="relative bg-white min-h-[450px] lg:min-h-[760px] flex flex-col ">
      <div className="relative z-10 p-8  md:px-40 lg:p-16 pb-0">
        <h1 className="text-4xl lg:text-[42px] font-bold text-[#1b2d5d] leading-[1.15] max-w-[400px]">
          Book Your Premium<br />Ride Instantly
        </h1>
        <p className="mt-4 text-gray-500 text-[15px] max-w-sm leading-relaxed">
          Experience luxury transportation with professional chauffeurs. Point-to-point or hourly service available.
        </p>
      </div>

      <div className="relative flex-grow w-full mt-10">
        <img
          src={mapImg}
          alt="Map Pattern"
          className="absolute hidden lg:block  inset-x-0 bottom-[10%] -left-20  w-full h-[100%] lg:h-[100%] lg:bottom-[45%] max-h-[400px] object-contain object-bottom opacity-80 pointer-events-none"
        />
        <img
          src={blueCarImg}
          alt="Blue Car"
          className="absolute bottom-0 -left-2 lg:-left-16  w-[90%] sm:w-[60%] lg:w-[100%] lg:bottom-[15%] lg:w-[80%] lg:-left-12 xl:w-[80%]  xl:bottom-[10%] max-w-none object-contain object-left-bottom pointer-events-none"
        />
      </div>
    </section>
  );
}
