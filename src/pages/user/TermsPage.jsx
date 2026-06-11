const termsSections = [
  {
    title: '1. General Provisions',
    body: `The Prvyn - Sunrise Correlation LLC Platform provides an intermediary service for premium professional driver services provided by independent local service providers. We do not provide, own, or control transportation services. Instead, we provide Guests with a marketplace to access services provided by Local Service Providers.

Through the platform, Guests can book transportation based on location, timing, and preferences. Your use of the Services is also governed by applicable policies including our Privacy Notice, Luggage Policy, Cancellation Policy, and other standards available through our help center.`,
  },
  {
    title: '2. Eligibility',
    body: `The Platform may only be used by individuals who have legal authority to agree to these Terms and can comply with the stated obligations. To book a ride, you must register for and maintain an active account.

You must be at least 18 years old to create an account. A parent or legal guardian may create an account for a minor aged 16 or 17 and assumes responsibility for that minor’s use of the platform.`,
  },
  {
    title: '3. Modification of these Guest Terms',
    body: `Prvyn - Sunrise Correlation LLC reserves the right to modify these Guest Terms or related policies at any time. Updated terms may be posted through the Platform or communicated by other available methods.

Your continued use of the Platform after changes are made constitutes your agreement to the updated Terms.`,
  },
  {
    title: '4. Arbitration Agreement',
    body: `You and Prvyn - Sunrise Correlation LLC agree that disputes or claims relating to these Terms, your use of the Platform, or incidents connected with the Platform shall be resolved through final and binding arbitration, except where prohibited by law.

The parties waive their rights to a jury trial and agree that claims must be brought individually, not as part of a class action, collective action, or representative proceeding.

Certain claims may not be covered by arbitration where prohibited by applicable law.`,
  },
  {
    title: '5. Payment',
    body: `When you request a ride, Prvyn - Sunrise Correlation LLC may provide a fare quote. The quote may change until the ride is confirmed. Charges may include fees, tolls, surcharges, taxes, booking fees, airport surcharges, and other applicable costs.

Payments are final and non-refundable unless otherwise determined by Prvyn - Sunrise Correlation LLC. You are responsible for any cancellation fees, damage fees, cleaning fees, or other charges connected to your booking.`,
  },
  {
    title: '6. Intellectual Property',
    body: `All intellectual property rights in the Prvyn - Sunrise Correlation LLC Platform are owned by Prvyn - Sunrise Correlation LLC. This includes copyrights, trademarks, design rights, database rights, inventions, and other similar rights.

Any feedback, ideas, suggestions, or submissions provided by you may be used by Prvyn - Sunrise Correlation LLC without restriction or compensation.`,
  },
  {
    title: '7. Disclaimers',
    body: `The Platform and Services are provided on an “as-is” and “as-available” basis without warranties of any kind. Prvyn - Sunrise Correlation LLC does not guarantee specific results, availability of services, uninterrupted access, accuracy of routing, or error-free operation.

Prvyn - Sunrise Correlation LLC is not liable for issues caused by third-party providers, Local Service Providers, third-party websites, viruses, unauthorized access, mapping errors, service interruptions, or matters outside its reasonable control.`,
  },
  {
    title: '8. Limitation of Liability',
    body: `Prvyn - Sunrise Correlation LLC and its affiliates shall not be liable for indirect, incidental, special, exemplary, punitive, or consequential damages, including lost profits, lost data, personal injury, death, or property damage related to use of the Services.

To the maximum extent permitted by law, total liability shall not exceed the greater of fees paid by you in the previous twelve months or $1,000 USD.`,
  },
  {
    title: '9. Indemnity',
    body: `You agree to indemnify and hold Prvyn - Sunrise Correlation LLC, its affiliates, officers, directors, employees, and agents harmless from claims, losses, liabilities, damages, costs, and expenses arising from your use of the Services, your breach of these Terms, your violation of law, or harmful acts by you or your passengers.`,
  },
  {
    title: '10. Force Majeure',
    body: `Prvyn - Sunrise Correlation LLC shall not be liable for failure or delay caused by events beyond its reasonable control, including natural disasters, war, government action, labor disputes, pandemics, terrorism, emergencies, or similar events.`,
  },
  {
    title: '11. Term and Termination',
    body: `These Terms become effective when you agree to them and remain in effect while you use the Services. Prvyn - Sunrise Correlation LLC may terminate these Terms or deactivate your account if eligibility requirements are no longer met, safety concerns arise, or another reasonable basis exists.`,
  },
  {
    title: '12. Choice of Law',
    body: `These Terms shall be governed by the laws of the state in which the dispute arises, except where otherwise provided in the arbitration agreement.`,
  },
  {
    title: '13. Choice of Forum',
    body: `If claims do not proceed in arbitration, they shall be brought exclusively in the state or federal courts of the state in which the dispute, incident, or accident occurred, to the extent permitted by law.`,
  },
  {
    title: '14. Final Provisions',
    body: `These Terms and any additional policies incorporated by reference constitute the entire agreement between Prvyn - Sunrise Correlation LLC and the Guest. If any part of these Terms is found unenforceable, the remaining provisions shall continue in effect.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[28px] bg-white border border-gray-100 shadow-sm p-6 sm:p-10 lg:p-12">
          <div className="text-center border-b border-gray-100 pb-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#1b2d5d]">
              Legal
            </p>

            <h1 className="mt-3 text-[30px] sm:text-[42px] font-bold text-[#1b2d5d]">
              U.S. Terms of Use
            </h1>

            <p className="mt-2 text-[15px] text-gray-500">
              Guests
            </p>

            <p className="mt-4 text-[14px] text-gray-400">
              Last revised: May 30, 2026
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-[14px] leading-7 text-amber-800">
              Section 4 of these Guest Terms contains an arbitration agreement and
              class action waiver that apply to claims brought against us in the
              United States. Please read these Terms carefully before using the
              Prvyn - Sunrise Correlation LLC Platform.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <section>
              <p className="text-[15px] leading-8 text-gray-600">
                These Guest Terms constitute a legally binding agreement between
                the individual accessing or using the Prvyn - Sunrise Correlation
                LLC Platform and Prvyn - Sunrise Correlation LLC, governing your
                use of the applications, offerings, websites, technology,
                platform, and Services.
              </p>

              <p className="mt-4 text-[15px] leading-8 font-semibold text-[#111]">
                If you do not agree to be bound by these Terms, you may not use
                or access the Platform or any Services provided through the
                Platform.
              </p>
            </section>

            {termsSections.map((section) => (
              <section key={section.title} className="border-t border-gray-100 pt-7">
                <h2 className="text-[20px] sm:text-[22px] font-bold text-[#111]">
                  {section.title}
                </h2>

                <div className="mt-3 whitespace-pre-line text-[15px] leading-8 text-gray-600">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-[#1b2d5d] px-6 py-6 text-white">
            <h3 className="text-[18px] font-semibold">
              Questions about these Terms?
            </h3>

            <p className="mt-2 text-[14px] leading-6 text-white/80">
              Contact our support team if you need help understanding our terms,
              policies, or booking conditions.
            </p>

            <a
              href="/Support"
              className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#1b2d5d] hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}