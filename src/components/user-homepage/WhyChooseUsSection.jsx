import { FiUser } from 'react-icons/fi';
import { MdDirectionsCar } from 'react-icons/md';
import { BsStar } from 'react-icons/bs';
import { FaArrowRight } from "react-icons/fa6";
import PrimaryButton from '../PrimaryButton';
import iconbg1 from '../../assets/whychooseicon1.png';
import iconbg2 from '../../assets/whychooseicon2.png';
import iconbg3 from '../../assets/whychooseicon3.png';

const cards = [
  {
    icon: <FiUser size={30} />,
    iconBg: iconbg1,
    title: 'Customer-First Approach',
    desc: 'Every journey is interactive and we exceed your expectations by delivering exceptional ownership.',
  },
  {
    icon: <MdDirectionsCar size={30} />,
    iconBg: iconbg2,
    title: 'Reliability and Punctuality',
    desc: 'Our timeliness and reliability are proven. See what previous customers say about us as your trust empowers us.',
  },
  {
    icon: <BsStar size={26} />,
    iconBg: iconbg3,
    title: 'Service Excellence',
    desc: 'Perfection in serving you — your desired level of comfort is our promise. We maintain high standards in the luxury car service industry.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 px-8 md:px-16 bg-gray-100 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1a2b5e] mb-2">Why Choose Us?</h2>
      <p className="text-gray-400 text-sm mb-16">
        Experience the difference with our premium service.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 pb-14">
        {cards.map((c, i) => (
          <div
            key={i}
            className="relative bg-white rounded-3xl p-8 pt-14 flex flex-col items-center text-center shadow-md overflow-visible"
          >
            {/* Gray circle at top-right — creates concave corner illusion */}
            <div className="absolute -top-6 -right-8 w-[90px] h-[80px] rounded-full bg-gray-100 z-[1]" />

            {/* Icon circle — sits on top of the concave */}
            <img
              src={c.iconBg}
              className={`absolute -top-7 -right-7 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg z-[2]`}
              alt={c.title}
            />

            {/* Gray circle at bottom-left — creates concave corner illusion */}
            <div className="absolute -bottom-5 -left-5 w-[200px] h-[80px] rounded-full bg-gray-100 z-[1]" />

            {/* Title */}
            <h3 className="relative z-[2] font-bold text-gray-900 text-xl mb-4 leading-snug">
              {c.title}
            </h3>

            {/* Description */}
            <p className="relative z-[2] text-gray-400 text-sm leading-relaxed mb-16 max-w-xs">
              {c.desc}
            </p>

            {/* Book Now button — overflows bottom-left corner */}
            <div className="absolute -bottom-1 left-1 z-[2]">
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
