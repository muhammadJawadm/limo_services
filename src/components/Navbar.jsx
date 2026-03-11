import logoImg from '../assets/navbarlogo.png';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-white shadow-sm border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center gap-2 ml-[4%]">
        <div className="w-full">
          <img src={logoImg} alt="Limo Services" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-8 text-gray-600 text-sm font-medium">
        <li><a href="#" className="hover:text-blue-700 transition-colors">Terms</a></li>
        <li><a href="#" className="hover:text-blue-700 transition-colors">Privacy</a></li>
        <li><a href="#" className="hover:text-blue-700 transition-colors">Support</a></li>
        <li><a href="#" className="hover:text-blue-700 transition-colors">Become a partner</a></li>
      </ul>

      {/* Auth Button */}
      <button className="bg-[#1B2D5D] hover:bg-blue-800 transition-colors text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow">
        Login/Registration
      </button>
    </nav>
  );
}
