import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import TermsPage from './pages/user/TermsPage';
import PrivacyPage from './pages/user/PrivacyPage';
import SupportPage from './pages/user/SupportPage';
import DriverRegisterPage from './pages/driver/DriverRegisterPage';
import DriverRegisterDetailsPage from './pages/driver/DriverRegisterDetailsPage';
import DriverLoginPage from './pages/driver/DriverLoginPage';
import DriverForgetPasswordPage from './pages/driver/DriverForgetPasswordPage';
import DriverOTPVerificationPage from './pages/driver/DriverOTPVerificationPage';
import DriverResetPasswordPage from './pages/driver/DriverResetPasswordPage';
import DriverOnboardingPage from './pages/driver/DriverOnboardingPage';
import DriverProfilePage from './pages/driver/DriverProfilePage';
import DriverDashboardPage from './pages/driver/DriverDashboardPage';
import { useSocket } from './hooks/useSocket';

function SocketBootstrap() {
  useSocket();
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SocketBootstrap />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#1a1a1a',
            color: '#fff',
          },
        }}
      />
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
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/driver/register" element={<DriverRegisterPage />} />
        <Route path="/driver/register/details" element={<DriverRegisterDetailsPage />} />
        <Route path="/driver/onboarding" element={<DriverOnboardingPage />} />
        <Route path="/driver/profile" element={<DriverProfilePage />} />
        <Route path="/driver/login" element={<DriverLoginPage />} />
        <Route path="/driver/forget-password" element={<DriverForgetPasswordPage />} />
        <Route path="/driver/otp-verification" element={<DriverOTPVerificationPage />} />
        <Route path="/driver/reset-password" element={<DriverResetPasswordPage />} />
        <Route path="/driver/dashboard" element={<DriverDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}