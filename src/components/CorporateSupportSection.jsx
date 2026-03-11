import footerBg from '../assets/footer_bottom.png';
import footerMan from '../assets/footer_man.png';
import { useState } from 'react';
import shape from "../assets/shape.png"
import usFlag from "../assets/us.png"
import PrimaryButton from './PrimaryButton';

export default function CorporateSupportSection() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section className="relative overflow-hidden min-h-[600px] flex justify-center">
      {/* Dark background image */}
      <div className="absolute inset-0">
        <img src={footerBg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Centered Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex justify-end items-center min-h-[600px] py-16">
        
        {/* Left — Man image anchored to the bottom of the container */}
        <div className="absolute bottom-0 left-8 md:left-16 z-10 w-[60%] sm:w-auto overflow-visible pointer-events-none">
          <div className="relative">
            <img
              src={footerMan}
              alt="Corporate Support"
              className="w-80 md:w-[26rem] object-contain object-bottom block"
            />
            <img
              src={shape}
              alt="Arrow"
              className="absolute -right-52 md:-right-72 top-1/3 w-48 md:w-64 opacity-90"
            />
          </div>
        </div>

        {/* Right — Contact Form */}
        <div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-xl relative z-20 pointer-events-auto">
          {/* Title & subtitle */}
          <h2 className="text-[#1a2b5e] font-bold text-2xl mb-2 text-center">
            Need Corporate Support?
          </h2>
          <p className="text-gray-400 text-sm mb-8 text-center">
            Fill out the form and our team will take care of the rest.
          </p>

          <div className="space-y-4">
            {/* Row 1: First Name + Last Name */}
            <div className="flex gap-3">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="flex-1 px-5 py-3.5 rounded-full text-sm bg-gray-100 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="flex-1 px-5 py-3.5 w-10 rounded-full text-sm bg-gray-100 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Row 2: Email + Phone with flag */}
            <div className="flex gap-3">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                className="flex-1 px-5 py-3.5 rounded-full text-sm bg-gray-100 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200"
              />
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-3.5 flex-1">
                {/* US Flag with dropdown chevron */}
                <span className="text-xl leading-none"><img src={usFlag} alt="" /></span>
                <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">+1</span>
              </div>
            </div>

            {/* Row 3: Textarea */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Lorem impsum..."
              rows={6}
              className="w-full px-5 py-4 rounded-2xl text-sm bg-gray-100 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            />

            {/* Submit button */}
            <PrimaryButton fullWidth size="lg" type="submit" className="mt-1">
              Submit
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
