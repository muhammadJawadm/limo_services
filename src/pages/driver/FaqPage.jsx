import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    question: 'How do I book a ride?',
    answer:
      'You can book a ride by selecting your pickup location, drop-off location, date, time, vehicle type, and completing the payment process.',
  },
  {
    question: 'Can I book a ride without creating an account?',
    answer:
      'Yes, you can book as a guest. Creating an account helps you manage bookings, view trip history, and save your details for future rides.',
  },
  {
    question: 'When will my driver be assigned?',
    answer:
      'After your booking and payment are completed, our admin team assigns a professional driver. Driver details will appear once assigned.',
  },
  {
    question: 'Can I cancel my booking?',
    answer:
      'Yes, you can cancel an upcoming booking from your ride details page. Cancellation depends on the ride status and company policy.',
  },
  {
    question: 'Do you provide airport pickup service?',
    answer:
      'Yes, we provide airport pickup and drop-off service. You can add your flight number during booking.',
  },
  {
    question: 'Can I add stops during my trip?',
    answer:
      'Yes, you can add stop locations while creating your reservation. Extra stops may affect the trip price.',
  },
  {
    question: 'Are child seats available?',
    answer:
      'Yes, you can request infant, toddler, or booster child seats during the booking process.',
  },
  {
    question: 'How do I contact my driver?',
    answer:
      'Once a driver is assigned, the message option becomes available so you can chat with your assigned driver.',
  },
];

function FAQItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
      >
        <span className="text-[15px] sm:text-[16px] font-semibold text-[#111]">
          {item.question}
        </span>

        <FiChevronDown
          size={20}
          className={`shrink-0 text-[#1b2d5d] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-5">
          <p className="text-[14px] sm:text-[15px] leading-7 text-gray-500">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#1b2d5d]">
          Help Center
        </p>

        <h1 className="mt-3 text-[30px] sm:text-[42px] font-bold text-[#1b2d5d]">
          Frequently Asked Questions
        </h1>

        <p className="mt-4 text-[15px] sm:text-[16px] leading-7 text-gray-500">
          Find answers to common questions about bookings, payments, drivers,
          cancellations, and chauffeur services.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-4">
        {faqs.map((item, index) => (
          <FAQItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}