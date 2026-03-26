import businessSedanImg from '../../assets/business-class-car.png';
import premiumSedanImg from '../../assets/premium-class-car.png';
import luxurySuvImg from '../../assets/Luxury-SUV.png';
import premiumSuvImg from '../../assets/rangerower-premium.png';

export const vehicles = [
  {
    id: 'business',
    name: 'Business Sedan',
    subtitle: 'Cadillac CT6, Lyric or similar',
    image: businessSedanImg,
    price: 95.0,
    passengers: 3,
    luggage: 3,
  },
  {
    id: 'premium-sedan',
    name: 'Premium Sedan',
    subtitle: 'Cadillac Escalade ESV, Lincoln Navigator or similar',
    image: premiumSedanImg,
    price: 95.0,
    passengers: 3,
    luggage: 3,
  },
  {
    id: 'luxury-suv',
    name: 'Luxury SUV',
    subtitle: 'Cadillac Escalade ESV, Lincoln Navigator or similar',
    image: luxurySuvImg,
    price: 95.0,
    passengers: 6,
    luggage: 4,
  },
  {
    id: 'premium-suv',
    name: 'Premium SUV',
    subtitle: 'Ultimate luxury and comfort.',
    image: premiumSuvImg,
    price: 95.0,
    passengers: 6,
    luggage: 4,
  },
];

export const stops = [
  { label: 'USA Hockey Arena', address: 'Beck Road, Plymouth, MI, USA', type: 'pickup' },
  { label: 'USA Vein Clinics', address: 'Telegraph Road, Southfield, MI, USA', type: 'stop' },
  { label: 'USA Paper & Ribbon', address: 'Eight Mile West, Southfield, MI, USA', type: 'dropoff' },
];
