import React, { useState } from 'react';
import { User, Phone, ShieldCheck, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import { TrustoraLogo } from '../components/TrustoraLogo';
import { UserRole, UserProfile } from '../types';
import { INITIAL_USER, INITIAL_PROVIDER_USER, SERVICE_CATEGORIES } from '../data/mockData';

interface AuthScreenProps {
  initialRole: UserRole;
  onSuccess: (user: UserProfile) => void;
  onBackToRoles: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialRole,
  onSuccess,
  onBackToRoles
}) => {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Clean empty inputs - no hardcoded dummy data
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('electrician');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Send OTP
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions to proceed.');
      return;
    }
    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
      setOtpCode('1234'); // Auto-filled for convenient verification
    }, 400);
  };

  // Step 2: Verify OTP and Login
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setError('Please enter the 4-digit verification code.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const cleanPhone = phone.trim().replace(/\D/g, '');
      const formattedPhone = `+91 ${cleanPhone.slice(-10)}`;

      if (role === 'provider') {
        const tradeName =
          SERVICE_CATEGORIES.find((c) => c.id === selectedTrade)?.name || 'Electrician';
        onSuccess({
          ...INITIAL_PROVIDER_USER,
          name: name.trim() || 'Ravi',
          email: '',
          phone: formattedPhone || '+91 98480 12345',
          role: 'provider'
        });
      } else if (role === 'admin') {
        onSuccess({
          ...INITIAL_USER,
          name: name.trim() || 'System Admin',
          email: '',
          role: 'admin',
          phone: formattedPhone || '+91 98765 43210'
        });
      } else {
        onSuccess({
          ...INITIAL_USER,
          name: name.trim() || 'Harish',
          email: '',
          phone: formattedPhone || '+91 98765 43210',
          role: 'seeker'
        });
      }
    }, 450);
  };

  // Quick switch role
  const handleSwitchPersona = (targetRole: UserRole) => {
    setRole(targetRole);
    setError('');
    setOtpStep(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between pt-2">
        <TrustoraLogo size="md" />
        <button
          onClick={onBackToRoles}
          className="text-xs font-semibold text-slate-500 hover:text-teal-700 hover:underline"
        >
          Change Role ({role === 'provider' ? 'Provider' : 'Seeker'})
        </button>
      </div>

      {/* Main Auth Container */}
      <div className="max-w-md mx-auto w-full my-auto py-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80">
          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-[#0B1F3A] tracking-tight">
              {role === 'provider' ? 'Provider Login (Ravi)' : 'Seeker Login (Harish)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {role === 'provider'
                ? 'Direct login with mobile number • No password or email'
                : 'Instant phone OTP login • No password or email'}
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="flex rounded-2xl bg-slate-100 p-1 mb-5 border border-slate-200/60">
            <button
              type="button"
              onClick={() => handleSwitchPersona('seeker')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                role === 'seeker'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Seeker (Harish)
            </button>
            <button
              type="button"
              onClick={() => handleSwitchPersona('provider')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                role === 'provider'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Provider (Ravi)
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
              <ShieldCheck className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Phone + Name Form (NO Email or Password) */}
          {!otpStep ? (
            <form onSubmit={handleRequestOtp} className="space-y-3.5">
              {/* Full Name Input (Clean, empty by default) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder={role === 'provider' ? 'e.g. Ravi' : 'e.g. Harish'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition bg-white"
                  />
                </div>
              </div>

              {/* Mobile Number Input (Clean, empty by default) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <div className="relative flex items-center border border-slate-200 rounded-xl focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-100 overflow-hidden transition bg-white">
                  <div className="pl-3.5 pr-2 py-2.5 bg-slate-50 border-r border-slate-200 flex items-center gap-1 text-slate-700 text-xs sm:text-sm font-bold shrink-0">
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm focus:outline-hidden font-medium"
                    autoFocus
                  />
                </div>
              </div>

              {/* For Service Providers: Select Trade Category */}
              {role === 'provider' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Primary Service Trade
                  </label>
                  <select
                    value={selectedTrade}
                    onChange={(e) => setSelectedTrade(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white focus:outline-hidden focus:border-teal-600 font-medium text-slate-800"
                  >
                    {SERVICE_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <label htmlFor="terms" className="text-[11px] sm:text-xs text-slate-600 cursor-pointer">
                  I agree to the{' '}
                  <span className="font-semibold text-teal-700">Terms & Privacy Policy</span>
                </label>
              </div>

              {/* Action Button: Get OTP */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#009688] hover:bg-[#00796B] active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Get Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Step 2: Instant OTP Verification */
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in">
              <div className="text-center p-3 bg-teal-50 rounded-2xl border border-teal-100">
                <CheckCircle2 className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                <span className="text-xs text-slate-600 block">
                  OTP sent to <strong>+91 {phone}</strong>
                </span>
                <span className="text-[10px] text-teal-700 font-mono font-bold block mt-0.5">
                  Demo Auto-fill Code: 1234
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Enter 4-Digit OTP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="1234"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-3 text-center text-lg font-mono font-bold tracking-widest border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Edit Number
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 bg-[#009688] hover:bg-[#00796B] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Verify & Continue</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Social or divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative inline-block bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Instant Exploration
            </div>
          </div>

          {/* 1-Click quick access buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                onSuccess({
                  ...INITIAL_USER,
                  name: name.trim() || 'Harish',
                  phone: phone ? `+91 ${phone}` : '+91 98765 43210',
                  email: '',
                  role: 'seeker'
                });
              }}
              className="py-2.5 px-3 border border-slate-200 hover:border-teal-500 rounded-xl bg-slate-50 hover:bg-teal-50/50 transition text-xs font-bold text-slate-700 text-center"
            >
              Continue as Seeker (Harish)
            </button>

            <button
              type="button"
              onClick={() => {
                onSuccess({
                  ...INITIAL_PROVIDER_USER,
                  name: name.trim() || 'Ravi',
                  phone: phone ? `+91 ${phone}` : '+91 98480 12345',
                  email: '',
                  role: 'provider'
                });
              }}
              className="py-2.5 px-3 border border-slate-200 hover:border-emerald-500 rounded-xl bg-slate-50 hover:bg-emerald-50/50 transition text-xs font-bold text-slate-700 text-center"
            >
              Continue as Provider (Ravi)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full text-center text-[11px] text-slate-400 pb-2">
        Mobile Number & OTP Authentication • No Email or Password Required
      </div>
    </div>
  );
};
