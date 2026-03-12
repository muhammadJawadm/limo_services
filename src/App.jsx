import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/user/HomePage';
import SelectVehiclePage from './pages/user/SelectVehiclePage';
import AdditionalDetailsPage from './pages/user/AdditionalDetailsPage';
import PassengerDetailsPage from './pages/user/PassengerDetailsPage';
import PaymentPage from './pages/user/PaymentPage';
import BookingCompletedPage from './pages/user/BookingCompletedPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select-vehicle" element={<SelectVehiclePage />} />
        <Route path="/additional-details" element={<AdditionalDetailsPage />} />
        <Route path="/passenger-details" element={<PassengerDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/booking-completed" element={<BookingCompletedPage />} />
      </Routes>
    </BrowserRouter>
  );
}