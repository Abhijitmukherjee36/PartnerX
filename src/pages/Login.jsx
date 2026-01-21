import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mobile OTP States
  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleSendOtp = async () => {
    if (mobileNumber.length < 10) return;
    setOtpLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOtpSent(true);
    setOtpLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) return;
    setOtpLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await login(mobileNumber, "otp-verified");
      navigate("/home");
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setShowMobileLogin(false);
    setMobileNumber("");
    setOtp("");
    setOtpSent(false);
  };

  // Smoother slide button animation class
  const slideButtonClass = "absolute inset-0 bg-gradient-to-r from-primary to-pink-500 translate-x-[-100%] group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]";

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/login-bg.png')` }}
      ></div>
      
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl h-[88vh] max-h-[680px] rounded-3xl overflow-hidden bg-black/25 shadow-2xl shadow-black/40 flex flex-col lg:flex-row border border-white/10">
        
        {/* LEFT PANEL - Login Form */}
        <div className="w-full lg:w-1/2 p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mb-6 lg:mb-8">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white">PartnerX</span>
            </Link>

            {/* Heading */}
            <div className="mb-4 lg:mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 tracking-tight">
                {showMobileLogin ? (otpSent ? "Enter OTP" : "Mobile Login") : "Welcome Back !"}
              </h1>
              <p className="text-white/80 text-xs sm:text-sm">
                {showMobileLogin 
                  ? (otpSent ? `OTP sent to +91 ${mobileNumber}` : "Enter your mobile number")
                  : "Enter your credentials to login"
                }
              </p>
            </div>

            {/* Mobile Login Form */}
            {showMobileLogin ? (
              <div className="space-y-3 flex-grow flex flex-col">
                {!otpSent ? (
                  <>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-sm">+91</span>
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full px-3 py-2.5 pl-12 bg-white/40 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 text-sm"
                        maxLength={10}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={mobileNumber.length < 10 || otpLoading}
                      className="relative w-full py-2.5 bg-gray-900 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm overflow-hidden group active:scale-[0.98] transition-transform"
                    >
                      <span className={slideButtonClass}></span>
                      <span className="relative z-10">{otpLoading ? "Sending OTP..." : "Send OTP"}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2 justify-center">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={otp[index] || ""}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            const newOtp = otp.split('');
                            newOtp[index] = value;
                            setOtp(newOtp.join(''));
                            if (value && index < 5) {
                              const nextInput = e.target.nextElementSibling;
                              if (nextInput) nextInput.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                              const prevInput = e.target.previousElementSibling;
                              if (prevInput) prevInput.focus();
                            }
                          }}
                          className="w-10 h-12 bg-white/40 border border-white/30 rounded-lg text-white text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => { setOtpSent(false); setOtp(""); }}
                      className="text-xs text-white/70 hover:text-white transition-colors text-center"
                    >
                      Didn't receive OTP? Resend
                    </button>
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={otp.length < 6 || otpLoading}
                      className="relative w-full py-2.5 bg-gray-900 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm overflow-hidden group active:scale-[0.98] transition-transform"
                    >
                      <span className={slideButtonClass}></span>
                      <span className="relative z-10">{otpLoading ? "Verifying..." : "Verify & Login"}</span>
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors text-sm mt-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Email Login
                </button>

                <div className="flex-grow"></div>

                <p className="text-center text-white/80 text-xs mt-3">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-semibold text-white hover:underline transition-colors">
                    Sign Up
                  </Link>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 flex-grow flex flex-col">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/40 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 text-sm"
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/40 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 pr-10 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="text-right">
                  <Link to="/forgot-password" className="text-xs text-white/80 hover:text-white transition-colors">
                    Forget password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full py-2.5 bg-gray-900 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm overflow-hidden group active:scale-[0.98] transition-transform"
                >
                  <span className={slideButtonClass}></span>
                  <span className="relative z-10">{isLoading ? "Signing in..." : "Sign in"}</span>
                </button>

                <div className="flex items-center gap-2 my-1">
                  <div className="flex-1 h-px bg-white/30"></div>
                  <span className="text-xs text-white/70">or continue</span>
                  <div className="flex-1 h-px bg-white/30"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-all duration-300 shadow-lg text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Log in with Google
                </button>

                <button
                  type="button"
                  onClick={() => setShowMobileLogin(true)}
                  className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-all duration-300 shadow-lg text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Continue with Mobile Number
                </button>

                <p className="text-center text-white/80 text-xs mt-3">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-semibold text-white hover:underline transition-colors">
                    Sign Up
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - Visual Section */}
        <div className="hidden lg:block w-1/2 p-3">
          <div className="w-full h-full rounded-2xl bg-gray-900/90 relative overflow-hidden border border-gray-700/50">
            <div className="absolute inset-0">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E30B5C' fill-opacity='0.06'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3Ccircle cx='5' cy='5' r='2'/%3E%3Ccircle cx='35' cy='35' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
              <div className="absolute top-20 left-10 w-32 h-32 bg-gray-800/80 rounded-full blur-2xl"></div>
              <div className="absolute bottom-32 right-16 w-40 h-40 bg-gray-800/60 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gray-800/50 rounded-full blur-xl"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full p-8 xl:p-10">
              <div className="flex items-center gap-3 mb-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center shadow-lg shadow-primary/30">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white">PartnerX</span>
              </div>

              <div className="flex-1 flex items-center justify-center py-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl scale-150"></div>
                  <div className="relative w-56 h-56 xl:w-64 xl:h-64 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-16 h-20 opacity-90">
                        <svg viewBox="0 0 64 80" fill="none" className="w-full h-full">
                          <path d="M60 40C60 40 50 20 30 15C10 10 0 30 5 45C10 60 30 65 40 60C50 55 60 40 60 40Z" fill="white" fillOpacity="0.95"/>
                          <path d="M55 35C55 35 48 22 32 18C16 14 8 28 12 40C16 52 32 56 40 52C48 48 55 35 55 35Z" fill="white" fillOpacity="0.7"/>
                        </svg>
                      </div>
                      <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-16 h-20 opacity-90 scale-x-[-1]">
                        <svg viewBox="0 0 64 80" fill="none" className="w-full h-full">
                          <path d="M60 40C60 40 50 20 30 15C10 10 0 30 5 45C10 60 30 65 40 60C50 55 60 40 60 40Z" fill="white" fillOpacity="0.95"/>
                          <path d="M55 35C55 35 48 22 32 18C16 14 8 28 12 40C16 52 32 56 40 52C48 48 55 35 55 35Z" fill="white" fillOpacity="0.7"/>
                        </svg>
                      </div>
                      <div className="w-28 h-28 xl:w-32 xl:h-32 rounded-2xl bg-gradient-to-br from-primary to-pink-600 shadow-2xl shadow-primary/50 flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
                        <svg className="w-14 h-14 xl:w-16 xl:h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl xl:text-3xl font-bold text-white mb-4">Find Your Perfect Match</h2>
                <p className="text-gray-400 text-sm xl:text-base leading-relaxed max-w-xs mx-auto">
                  Connect with verified partners who share your interests and values.
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                <div className="w-2 h-2 rounded-full bg-white/30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
