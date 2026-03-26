import Navbar from '../../components/user-homepage/Navbar';
import HeroSection from '../../components/user-homepage/HeroSection';
import PremiumRideSection from '../../components/user-homepage/PremiumRideSection';
import ComfortLuxurySection from '../../components/user-homepage/ComfortLuxurySection';
import WhyChooseUsSection from '../../components/user-homepage/WhyChooseUsSection';
import ServiceAreasSection from '../../components/user-homepage/ServiceAreasSection';
import CorporateSupportSection from '../../components/user-homepage/CorporateSupportSection';
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
