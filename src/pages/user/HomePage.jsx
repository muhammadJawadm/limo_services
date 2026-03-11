import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import PremiumRideSection from '../../components/PremiumRideSection';
import ComfortLuxurySection from '../../components/ComfortLuxurySection';
import WhyChooseUsSection from '../../components/WhyChooseUsSection';
import ServiceAreasSection from '../../components/ServiceAreasSection';
import CorporateSupportSection from '../../components/CorporateSupportSection';
import Footer from '../../components/Footer';

export default function HomePage() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <HeroSection />
      <PremiumRideSection />
      <ComfortLuxurySection />
      <WhyChooseUsSection />
      <ServiceAreasSection />
      <CorporateSupportSection />
      <Footer />
    </div>
  );
}
