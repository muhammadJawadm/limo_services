import React from 'react';
import Navbar from '../../components/user-homepage/Navbar';
import Footer from '../../components/Footer';
import { LOREM_IPSUM_1, LOREM_IPSUM_2 } from '../../components/loremIpsum';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar />

      <main className="flex-grow pt-16 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-center mb-16 text-gray-900">
            Terms & Conditions
          </h1>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Introduction</h2>
              <div className="text-sm md:text-base text-gray-600 space-y-4">
                {LOREM_IPSUM_1.split('\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-justify">{paragraph}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Information we collect</h2>
              <div className="text-sm md:text-base text-gray-600 space-y-4">
                {LOREM_IPSUM_2.split('\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-justify">{paragraph}</p>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-16 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
            <button className="w-full bg-[#1e2a4a] text-white py-4 rounded-full font-medium hover:bg-[#16213c] transition-colors shadow-sm">
              Accepted
            </button>
            <button className="w-full bg-white text-gray-600 py-4 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
              Decline
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
