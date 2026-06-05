import footerBg from '../../assets/footer_bottom.png';
import footerMan from '../../assets/footer_man.png';
import { useState } from 'react';
import shape from "../../assets/shape.png"
import SharedPhoneInput from '../SharedPhoneInput';
import PrimaryButton from '../PrimaryButton';
import { createSupportRequest } from '../../services/supportService';

export default function CorporateSupportSection() {
  const initialForm = { firstName: '', lastName: '', email: '', phone: '', description: '' };
  const [form, setForm] = useState(initialForm);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');
    setIsSubmitting(true);

    const result = await createSupportRequest(form);

    if (!result.success) {
      setSubmitError(result.message || 'Unable to send support request.');
      setIsSubmitting(false);
      return;
    }

    setSubmitSuccess('Your support request has been sent successfully.');
    setForm(initialForm);
    setTimeout(() => {
  setSubmitSuccess('');
}, 2500);

    setIsSubmitting(false);
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] flex justify-center">
      {/* Dark background image */}
      <div className="absolute inset-0">
        <img src={footerBg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Centered Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-16 flex justify-end items-center min-h-[600px] py-10 md:py-16">

        {/* Left — Man image anchored to the bottom of the container */}
        <div className="absolute bottom-0 left-8 md:left-16 z-10 w-[60%] sm:w-auto overflow-visible pointer-events-none hidden lg:block">
          <div className="relative">
            <img
              src={footerMan}
              alt="Corporate Support"
              className="w-80 md:w-[26rem] object-contain object-bottom block"
            />
            <img
              src={shape}
              alt="Arrow"
              className="absolute -right-50 md:-right-56 top-1/4 w-48 md:w-64 opacity-90"
            />
          </div>
        </div>

        {/* Right — Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-2 md:p-10 w-full max-w-lg shadow-xl relative z-20 pointer-events-auto">
          {/* Title & subtitle */}
          <h2 className="text-[#1a2b5e] font-bold text-2xl mb-2 text-center">
            Need Corporate Support?
          </h2>
          <p className="text-gray-400 text-sm mb-8 text-center">
            Fill out the form and our team will take care of the rest.
          </p>

          <div className="space-y-4">
            {/* Row 1: First Name + Last Name */}
            <div className="flex flex-col md:flex-row gap-3">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="flex-1 px-5 py-3.5 rounded-full text-sm bg-gray-100 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="flex-1 px-5 py-3.5 w-full md:w-10 rounded-full text-sm bg-gray-100 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Row 2: Email + Phone with flag */}
            <div className="flex flex-col md:flex-row gap-3">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                required
                className="flex-1 px-5 py-3.5 rounded-full text-sm bg-gray-100 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200"
              />
              <div className="flex-1">
                <SharedPhoneInput
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 3: Textarea */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your issue"
              rows={6}
              required
              className="w-full px-5 py-4 rounded-2xl text-sm bg-gray-100 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            />

            {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}
            {submitSuccess ? <p className="text-sm text-green-600">{submitSuccess}</p> : null}

            {/* Submit button */}
            <PrimaryButton fullWidth size="lg" type="submit" className="mt-1" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}
