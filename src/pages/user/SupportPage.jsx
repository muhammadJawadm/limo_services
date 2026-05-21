import React from 'react';
import { useState } from 'react';
import Navbar from '../../components/user-homepage/Navbar';
import Footer from '../../components/Footer';
import { createSupportRequest } from '../../services/supportService';

export default function SupportPage() {
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
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar />

      <main className="flex-grow pt-16 pb-24 px-4 md:px-8 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white shadow-sm border border-gray-100 rounded-3xl p-8 md:p-12 mt-8 md:mt-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-center mb-6 text-gray-900">
            Support
          </h1>
          
          <p className="text-center text-gray-500 text-sm md:text-base mb-10 max-w-md mx-auto">
            If you are experiencing any issues, please let us know. We will try to solve them as soon as possible
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                  required
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                Describe the issue
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                value={form.description}
                onChange={handleChange}
                placeholder="Tell us what happened..."
                required
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              />
            </div>

            {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}
            {submitSuccess ? <p className="text-sm text-green-600">{submitSuccess}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1e2a4a] text-white py-4 mt-8 rounded-full font-medium hover:bg-[#16213c] transition-colors shadow-sm disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            You can contract us on this number? <span className="font-semibold text-[#1e2a4a]">12345689</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
