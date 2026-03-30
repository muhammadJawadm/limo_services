import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const infoLinks = [
  { label: 'Become a Partner', path: '/driver/register' },
  { label: 'Terms & Condition', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Support', path: '/support' }
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-100 pt-12 pb-6">
      {/* Centered Container */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Left — Brand */}
          <div className="max-w-xs">
            <h3 className="font-bold  text-lg text-white mb-3">Lemo Services</h3>
            <p className=" text-sm leading-relaxed text-white">
              Limo Services offers luxury chauffeur-driven rides through a simple web platform, connecting riders with professional drivers for reliable, premium transportation.
            </p>
          </div>

          {/* Right — Info Links */}
          <div>
            <h3 className="font-bold  text-lg mb-3 text-white">Information</h3>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className=" text-sm hover:text-blue-600 text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white text-xs">
            Copyright © Lemo Services
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[FaInstagram, FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-white text-white transition-colors text-sm"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


