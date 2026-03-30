import React from 'react';
import Navbar from '../../components/user-homepage/Navbar';
import Footer from '../../components/Footer';

export default function SupportPage() {
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

          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Lorem Ipsum..."
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="problem" className="block text-sm font-medium text-gray-900 mb-2">
                Explain the Problem
              </label>
              <textarea
                id="problem"
                name="problem"
                rows={6}
                placeholder="Lorem Ipsum..."
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e2a4a] text-white py-4 mt-8 rounded-full font-medium hover:bg-[#16213c] transition-colors shadow-sm"
            >
              Submit
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
