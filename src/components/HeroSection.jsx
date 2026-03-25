import heroImg from '../assets/mainhero.jpg';
import BookingForm from './BookingForm';

export default function HeroSection() {
  return (
    <section className="relative h-[100%] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Luxury Limo Interior"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center mt-[2%]  px-1 md:px-8 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between w-[95%] max-w-7xl mx-auto gap-10">
          {/* Left text */}
          <div className="text-white max-w-md ">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Book Your Premium Ride Instantly
            </h1>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
              Experience luxury transportation with professional chauffeurs.
              Point-to-point or hourly service available.
            </p>
          </div>

          {/* Booking Form on the right */}
          <div className="w-full max-w-sm mb-10">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
