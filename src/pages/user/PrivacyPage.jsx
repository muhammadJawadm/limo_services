import React from 'react';
import Navbar from '../../components/user-homepage/Navbar';
import Footer from '../../components/Footer';

const privacySections = [
  {
    title: '1. Scope',
    body: [
      'We, Prvyn, take the protection of your personal data seriously and protect your privacy when processing it in accordance with applicable data protection regulations.',
      'This Privacy Policy informs visitors of the Prvyn websites, users or customers of the online platform, Prvyn apps, and other Prvyn services which personal data is processed by Prvyn and for which purposes.',
      'The Prvyn services are not aimed at minors. Information on the processing of personal data of chauffeurs can be requested through prvyn.com.',
    ],
  },
  {
    title: '2. Name and Contact Information of the Controller',
    body: [
      'The controller for the processing of data within the meaning of the General Data Protection Regulation (GDPR) is Prvyn.',
      'Email: fhashmani@prvyn.com',
      'Further information on Prvyn can be found in the Legal Notice.',
    ],
  },
  {
    title: '3. Contact Information for the Data Protection Officer',
    body: [
      'For privacy or data protection related inquiries, you may contact us through the email address provided above.',
    ],
  },
  {
    title: '4. Data Security',
    body: [
      'Prvyn uses appropriate technical and organizational security measures to ensure a level of protection for personal data appropriate to the risk.',
      'The transfer of personal data between your device and Prvyn is generally carried out in encrypted form using TLS encryption. You can identify an encrypted connection by the lock symbol in your browser address bar.',
      'If you communicate with us by email, access by third parties cannot be completely ruled out. For confidential information, Prvyn recommends using postal mail or fully encrypted email communication.',
    ],
  },
  {
    title: '5. Provision of the Websites',
    body: [
      'When visiting Prvyn websites for information purposes, data is automatically collected through your browser. This may include your IP address, status code, websites visited, date and time of request, browser type and version, referrer, files transferred, and data volume.',
      'This data is stored in log files and is used to establish and maintain the technical connection, analyze use of the websites, improve services, detect technical problems, and prevent illegal use such as fraudulent bookings or cyberattacks.',
      'Stored log files are erased or anonymized when they are no longer required, unless legal retention obligations apply.',
    ],
  },
  {
    title: '6. Cookies, Pixels and Similar Technologies',
    body: [
      'When using Prvyn services, cookies, pixels, or similar technologies may be used. Cookies are small text files and pixels are small graphic files stored on your device.',
      'Prvyn uses necessary cookies to provide requested features such as language preferences, login status, and cookie consent.',
      'Where you have consented, Prvyn may also use its own and third-party cookies to analyze and improve services, personalize functionality, detect technical problems, prevent unlawful use, and support marketing purposes.',
      'You can revoke consent or change cookie settings at any time. You can also prevent cookie storage and delete existing cookies through your browser settings, although some functions may be limited.',
    ],
  },
  {
    title: '7. Special Features for the Prvyn Apps',
    body: [
      'Prvyn apps provide another access point to Prvyn services. Similar personal data processing may occur through the apps as through the websites.',
      'When using the apps, Prvyn may access additional data related to the app or device, such as device name, manufacturer, model, operating system, app version, or SDK version.',
      'Push notifications are only sent if you have given consent on your device.',
    ],
  },
  {
    title: '8. Social Media / Social Networks',
    body: [
      'Prvyn maintains pages on social networks such as Twitter, LinkedIn, and Facebook. The respective social network providers provide detailed information about their personal data processing.',
      'Prvyn may use Facebook Messenger, Facebook Connect, Facebook Custom Audiences, and Google Customer Match where applicable and where consent has been provided.',
      'These services may process data for login, communication, advertising, audience matching, or similar purposes.',
    ],
  },
  {
    title: '9. Data Processing During Registered Use and Booking Rides',
    body: [
      'Prvyn processes personal data provided by you when you register, use Prvyn services, or book rides.',
      'This may include personal master data, contact data, contract data, ride-related data, customer history, invoice data, payment data, pickup and destination information, ride times, flight numbers, and special requests.',
      'Customer data is used to create, store, manage, and support your account, arrange booked rides, fulfill transportation contracts, process payments, and communicate necessary booking information to limousine service providers.',
      'Where required to perform a ride, personal data may be transferred to limousine service providers outside the European Union or European Economic Area.',
      'Customers may be able to rate rides. Ratings may be stored in the customer profile and communicated to service providers or chauffeurs in anonymized form.',
    ],
  },
  {
    title: '10. Payment & Fraud Prevention',
    body: [
      'Bookings may be paid by credit or debit card. Card information is processed through certified payment providers that meet applicable security standards, such as PCI DSS.',
      'Prvyn itself does not store full credit card data, except where abbreviated data may be used for analysis or fraud prevention.',
      'Card payments are provided by Stripe. Stripe’s privacy information is available through Stripe’s legal and privacy resources.',
      'For fraud prevention, IP addresses, email addresses, payment data, card information, and additional personal data may be transmitted to external fraud prevention providers.',
      'Prvyn may require additional identification documents in individual cases to authenticate a cardholder or prevent fraud.',
    ],
  },
  {
    title: '11. Communication with Prvyn',
    body: [
      'If you contact Prvyn by phone, contact form, feedback form, chat, messenger, email, or social media, the data you provide will be processed to handle your request and answer your inquiry.',
      'Contact data may also be used in pseudonymized or anonymized form to improve services, detect technical problems, and prevent illegal use.',
      'Prvyn may use external services and tools, including messenger services, chat support tools, and Intercom, to communicate with customers.',
    ],
  },
  {
    title: '12. E-mail Advertising and Newsletter',
    body: [
      'If you have agreed to receive advertising, or where Prvyn otherwise has the right, customer data may be used to send personalized advertising or general newsletters.',
      'Newsletter emails may contain pixels that allow statistical evaluation, such as whether emails were opened or links were clicked.',
      'You may unsubscribe from advertising emails at any time using the unsubscribe link or by contacting Prvyn.',
    ],
  },
  {
    title: '13. Involvement of Data Processors by Prvyn',
    body: [
      'Prvyn may involve third-party processors such as technical service providers or subsidiaries. These processors act on behalf of Prvyn and must provide sufficient guarantees for appropriate technical and organizational measures.',
      'Where processors are located in third countries, Prvyn complies with applicable data transfer requirements under GDPR.',
    ],
  },
  {
    title: '14. Rights of Data Subjects',
    body: [
      'If your personal data is processed by Prvyn, you are a data subject under GDPR and may have rights including access, rectification, erasure, restriction of processing, objection, data portability, complaint to a supervisory authority, and withdrawal of consent.',
      'If processing is based on your consent, you may revoke that consent at any time. You can contact us at fhashmani@prvyn.com or the applicable data protection contact address.',
    ],
  },
  {
    title: '15. Automated Decisions',
    body: [
      'You are only subject to automated decision-making in exceptional cases, such as when a payment method has previously failed or where indications suggest a fraudulent booking.',
      'In such cases, your request to book a ride may be refused. You may contact Prvyn to request an explanation, human intervention, or to express your point of view.',
    ],
  },
  {
    title: '16. Data Erasure and Storage Duration',
    body: [
      'Prvyn erases personal data as soon as the legal basis for processing no longer applies, unless another legal basis or retention obligation exists, such as commercial or tax law requirements.',
    ],
  },
  {
    title: '17. Amendment or Update of this Privacy Policy',
    body: [
      'Prvyn reserves the right to update or amend this Privacy Policy at any time where necessary due to legal, regulatory, technical, or service-related developments.',
      'Issued: March 23, 2022.',
      'Last review: August, 2025.',
    ],
  },
];

const cookieServices = [
  'Braze',
  'Google Syndication',
  'Google Tag Manager',
  'gstatic.com',
  'Intercom',
  'Usercentrics Consent Management Platform',
  'Amazon Web Services',
  'AppsFlyer',
  'Cloudflare',
  'Contentful',
  'Conversion Linker',
  'Datadog',
  'DoubleClick Ad',
  'Facebook Pixel',
  'Facebook Social Plugins',
  'Fontawesome',
  'Google Ads',
  'Google Ads Conversion Tracking',
  'Google Ads Remarketing',
  'Google Analytics',
  'LaunchDarkly',
  'LinkedIn Insight Tag',
  'LinkedIn Plugin',
  'Microsoft Advertising Remarketing',
  'reCAPTCHA',
  'RudderStack',
  'Taggrs.io',
  'TikTok',
  'TikTok Advertising',
  'Trustpilot',
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar />

      <main className="flex-grow pt-16 pb-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Privacy Policy
            </h1>

            <p className="mt-4 text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              This Privacy Policy explains how Prvyn collects, uses, stores, and protects
              personal data when you use our websites, apps, platform, and related services.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10">
            <div className="space-y-12">
              {privacySections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-semibold mb-5 text-gray-900">
                    {section.title}
                  </h2>

                  <div className="text-sm md:text-base text-gray-600 space-y-4">
                    {section.body.map((paragraph, index) => (
                      <p key={index} className="leading-relaxed text-justify">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section>
                <h2 className="text-2xl font-semibold mb-5 text-gray-900">
                  Prvyn Cookie Policy
                </h2>

                <div className="text-sm md:text-base text-gray-600 space-y-4">
                  <p className="leading-relaxed text-justify">
                    Prvyn uses cookies, pixels, and similar technologies such as tags,
                    web beacons, or gifs. These are small files stored on your device so
                    that we can recognize you or collect information when you use Prvyn
                    websites or apps.
                  </p>

                  <p className="leading-relaxed text-justify">
                    Cookies may be session cookies, which are deleted after ending the
                    browser session, or persistent cookies, which remain stored beyond an
                    individual session. Cookies may be Prvyn’s own cookies or third-party
                    cookies.
                  </p>

                  <p className="leading-relaxed text-justify">
                    You may prevent cookie storage or delete existing cookies through your
                    browser settings. However, some Prvyn service functions may become
                    unavailable or limited.
                  </p>

                  <p className="leading-relaxed text-justify">
                    Prvyn uses required cookies for identification, authentication, user
                    preferences, language settings, security, multimedia players, and to
                    avoid repeated input of information. Prvyn may also use cookies and
                    similar technologies for analytics, functionality, marketing, fraud
                    prevention, and service improvement.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Cookies, Pixels and Similar Technologies May Include
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cookieServices.map((service) => (
                      <div
                        key={service}
                        className="rounded-2xl border border-gray-100 bg-[#FAFAFA] px-4 py-3 text-sm text-gray-600"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}