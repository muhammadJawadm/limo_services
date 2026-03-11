import { FiUser } from 'react-icons/fi';
import { MdDirectionsCar } from 'react-icons/md';
import { BsStar } from 'react-icons/bs';
import { FaArrowRight } from "react-icons/fa6";
import PrimaryButton from './PrimaryButton';
const cards = [
  {
    icon: <FiUser size={30} />,
    iconBg: 'bg-[#1a2b5e]',
    title: 'Customer-First Approach',
    desc: 'Every journey is interactive and we exceed your expectations by delivering exceptional ownership.',
  },
  {
    icon: <MdDirectionsCar size={30} />,
    iconBg: 'bg-red-400',
    title: 'Reliability and Punctuality',
    desc: 'Our timeliness and reliability are proven. See what previous customers say about us as your trust empowers us.',
  },
  {
    icon: <BsStar size={26} />,
    iconBg: 'bg-yellow-400',
    title: 'Service Excellence',
    desc: 'Perfection in serving you — your desired level of comfort is our promise. We maintain high standards in the luxury car service industry.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 px-8 md:px-16 bg-gray-200 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b5e] mb-2">Why Choose Us?</h2>
      <p className="text-gray-400 text-sm mb-16">
        Experience the difference with our premium service.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((c, i) => (
          <div
            key={i}
            className="relative bg-white rounded-3xl p-8 pt-14 flex flex-col items-center text-center"
          >
            {/* Icon circle — top right, overlapping card top edge */}
            <div className='bg-gray-50 p-3'>
              <div
                className={`absolute -top-4 right-0 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg ${c.iconBg}`}
              >
                {c.icon}
              </div>
            </div>
            {/* Title */}
            <h3 className="font-bold text-gray-900 text-xl mb-4 leading-snug">
              {c.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-xs">
              {c.desc}
            </p>

            {/* Book Now button — wide, pill-shaped, left-aligned */}
            <div className="w-full flex justify-start mt-auto">
              <PrimaryButton size="lg">
                Book Now <FaArrowRight className="text-lg" />
              </PrimaryButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
