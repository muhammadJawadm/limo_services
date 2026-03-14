import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/user/HomePage';
import SelectVehiclePage from './pages/user/SelectVehiclePage';
import AdditionalDetailsPage from './pages/user/AdditionalDetailsPage';
import PassengerDetailsPage from './pages/user/PassengerDetailsPage';
import PaymentPage from './pages/user/PaymentPage';
import BookingCompletedPage from './pages/user/BookingCompletedPage';
import CreateAccountPage from './pages/user/CreateAccountPage';
import LoginPage from './pages/user/LoginPage';
import OTPVerificationPage from './pages/user/OTPVerificationPage';
import ResetPasswordPage from './pages/user/ResetPasswordPage';
import ForgetPasswordPage from './pages/user/ForgetPasswordPage';
import UserDashboardPage from './pages/user/UserDashboardPage';

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
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}