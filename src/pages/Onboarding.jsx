import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Step 1: Personal Details
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dobError, setDobError] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  
  // Step 2: Preferences
  const [interests, setInterests] = useState([]);
  const [lookingFor, setLookingFor] = useState([]);
  const [ageRange, setAgeRange] = useState([18, 50]);
  
  // Step 3: Username
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  
  // Step 4: Profile Picture
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Focus states for inputs
  const [focusedField, setFocusedField] = useState("");
  
  // Custom dropdown state for location
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const interestOptions = [
    "Travel", "Photography", "Music", "Fitness", "Gaming", "Cooking",
    "Movies", "Reading", "Art", "Dancing", "Sports", "Technology",
    "Fashion", "Nature", "Yoga", "Hiking", "Coffee", "Wine"
  ];

  const lookingForOptions = [
    { id: "dating", label: "Dating", icon: "❤️" },
    { id: "friendship", label: "Friendship", icon: "👋" },
    { id: "travel", label: "Travel Buddy", icon: "✈️" },
    { id: "events", label: "Event Partner", icon: "🎉" },
    { id: "activities", label: "Activities", icon: "🎯" },
    { id: "networking", label: "Networking", icon: "🤝" }
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-binary" },
    { value: "other", label: "Other" }
  ];

  // Indian cities list
  const cityOptions = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Pune"
  ];

  // Calculate max date for 13+ years old
  const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 13);
    return today.toISOString().split('T')[0];
  };

  // Validate date of birth
  const handleDobChange = (value) => {
    setDateOfBirth(value);
    if (value) {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 13) {
        setDobError("You must be at least 13 years old");
      } else {
        setDobError("");
      }
    }
  };

  // Input class helper - shows pink border on focus or when filled
  const getInputClass = (fieldName, value) => {
    const isFocused = focusedField === fieldName;
    const isFilled = value && value.length > 0;
    const baseClass = "w-full px-3 py-2.5 bg-white/15 rounded-lg text-white text-sm placeholder-white/50 transition-all duration-200 outline-none";
    
    if (isFocused || isFilled) {
      return `${baseClass} border-2 border-primary/70 shadow-[0_0_12px_rgba(227,11,92,0.3)]`;
    }
    return `${baseClass} border border-white/25 hover:border-white/40`;
  };

  // Button class helper - pink tint when selected, fixed border for justify
  const getButtonClass = (isSelected) => {
    const baseClass = "transition-all duration-200 box-border";
    if (isSelected) {
      return `${baseClass} bg-primary/50 text-white border-2 border-primary shadow-[0_0_15px_rgba(227,11,92,0.5)]`;
    }
    return `${baseClass} bg-white/15 text-white/80 hover:bg-white/25 border-2 border-transparent hover:border-white/30 active:scale-95`;
  };

  // Slide button animation class
  const slideButtonClass = "absolute inset-0 bg-gradient-to-r from-primary to-pink-500 translate-x-[-100%] group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]";

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const toggleLookingFor = (id) => {
    if (lookingFor.includes(id)) {
      setLookingFor(lookingFor.filter(i => i !== id));
    } else {
      setLookingFor([...lookingFor, id]);
    }
  };

  const checkUsername = async (value) => {
    setUsername(value);
    if (value.length < 3) {
      setUsernameAvailable(null);
      return;
    }
    setCheckingUsername(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUsernameAvailable(!value.toLowerCase().includes('taken'));
    setCheckingUsername(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/home");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/home");
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return fullName && dateOfBirth && !dobError && gender && location;
      case 2:
        return true;
      case 3:
        return username.length >= 3 && usernameAvailable;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const isOptionalStep = () => {
    return currentStep === 2 || currentStep === 4;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/onboarding-bg.png')` }}
      ></div>
      
      {/* Main Container - 55% black opacity */}
      <div className="relative z-10 w-full max-w-xl max-h-[90vh] rounded-2xl overflow-hidden bg-black/55 shadow-2xl shadow-black/40 flex flex-col border border-white/10 p-4 sm:p-6">
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-white/80 text-xs font-medium">Step {currentStep} of {totalSteps}</span>
            <span className="text-white/60 text-xs">
              {currentStep === 1 && "Personal Details"}
              {currentStep === 2 && "Preferences"}
              {currentStep === 3 && "Choose Username"}
              {currentStep === 4 && "Profile Picture"}
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-pink-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-grow overflow-y-auto">
          
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="text-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Tell us about yourself</h2>
                <p className="text-white/70 text-xs">This helps us personalize your experience</p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-white/80 text-xs mb-1">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Enter your full name"
                  className={getInputClass("fullName", fullName)}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-white/80 text-xs mb-1">Date of Birth *</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => handleDobChange(e.target.value)}
                  onFocus={() => setFocusedField("dob")}
                  onBlur={() => setFocusedField("")}
                  max={getMaxDate()}
                  className={`${getInputClass("dob", dateOfBirth)} [color-scheme:dark]`}
                />
                {dobError && (
                  <p className="text-red-400 text-xs mt-1">{dobError}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-white/80 text-xs mb-1">Gender *</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {genderOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setGender(option.value)}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${getButtonClass(gender === option.value)}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location - Custom Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <label className="block text-white/80 text-xs mb-1">City / Location *</label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full px-3 py-2.5 rounded-lg text-left text-sm transition-all duration-200 outline-none flex items-center justify-between ${
                    isDropdownOpen || location
                      ? "bg-white/15 border-2 border-primary/60 shadow-[0_0_10px_rgba(227,11,92,0.2)]"
                      : "bg-white/15 border border-white/25 hover:border-white/40"
                  }`}
                >
                  <span className={location ? "text-white" : "text-white/50"}>
                    {location || "Select your city"}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-primary transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu - Glass Blur with Pink Theme - Opens Upward */}
                {isDropdownOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-1 z-50 rounded-lg overflow-hidden backdrop-blur-xl bg-black/70 border border-primary/30 shadow-[0_-8px_32px_rgba(227,11,92,0.3)] max-h-48 overflow-y-auto">
                    {cityOptions.map((city, index) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setLocation(city);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm transition-all duration-150 flex items-center gap-2 ${
                          location === city
                            ? "bg-primary/40 text-white"
                            : "text-white/80 hover:bg-primary/25 hover:text-white"
                        } ${index !== cityOptions.length - 1 ? "border-b border-primary/15" : ""}`}
                      >
                        <svg className="w-4 h-4 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {city}
                        {location === city && (
                          <svg className="w-4 h-4 text-primary ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">What are you looking for?</h2>
                <p className="text-white/70 text-xs">Select your interests and what you're seeking</p>
              </div>

              {/* Looking For */}
              <div>
                <label className="block text-white/80 text-xs mb-2">What are you looking for?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {lookingForOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleLookingFor(option.id)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-2 ${getButtonClass(lookingFor.includes(option.id))}`}
                    >
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-white/80 text-xs mb-2">Your interests</label>
                <div className="flex flex-wrap gap-1.5">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${getButtonClass(interests.includes(interest))}`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-white/80 text-xs mb-2">
                  Preferred age range: {ageRange[0]} - {ageRange[1]}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="18"
                    max="70"
                    value={ageRange[0]}
                    onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                    className="flex-1 accent-primary h-2"
                  />
                  <input
                    type="range"
                    min="18"
                    max="70"
                    value={ageRange[1]}
                    onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                    className="flex-1 accent-primary h-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Username */}
          {currentStep === 3 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="text-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Choose your username</h2>
                <p className="text-white/70 text-xs">This is how other members will find you</p>
              </div>

              <div>
                <label className="block text-white/80 text-xs mb-1">Username *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => checkUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    onFocus={() => setFocusedField("username")}
                    onBlur={() => setFocusedField("")}
                    placeholder="your_username"
                    className={`${getInputClass("username", username)} pl-8`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {checkingUsername && (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-primary rounded-full animate-spin"></div>
                    )}
                    {!checkingUsername && usernameAvailable === true && (
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {!checkingUsername && usernameAvailable === false && (
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                </div>
                {usernameAvailable === true && (
                  <p className="text-green-400 text-xs mt-1">✓ Username is available!</p>
                )}
                {usernameAvailable === false && (
                  <p className="text-red-400 text-xs mt-1">✗ Username is already taken</p>
                )}
              </div>

              {fullName && (
                <div>
                  <p className="text-white/60 text-xs mb-1.5">Suggestions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      fullName.toLowerCase().replace(/\s+/g, '_'),
                      fullName.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 100),
                      fullName.split(' ')[0]?.toLowerCase() + '_' + new Date().getFullYear().toString().slice(-2)
                    ].map((suggestion, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => checkUsername(suggestion)}
                        className="px-2.5 py-1 bg-white/15 hover:bg-white/25 rounded-full text-xs text-white/70 transition-all border border-white/20"
                      >
                        @{suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white/5 rounded-lg p-3 mt-3">
                <p className="text-white/60 text-xs">
                  <span className="text-white/80 font-medium">Tips:</span> 3-20 characters, letters, numbers, and underscores only.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Profile Picture */}
          {currentStep === 4 && (
            <div className="space-y-3 animate-fadeIn">
              <div className="text-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Add a profile photo</h2>
                <p className="text-white/70 text-xs">Profiles with photos get more connections</p>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative w-36 h-36 mx-auto rounded-full bg-white/15 border-2 border-dashed flex items-center justify-center cursor-pointer transition-all overflow-hidden group ${
                  previewUrl 
                    ? "border-primary/70 shadow-[0_0_15px_rgba(227,11,92,0.3)]" 
                    : "border-white/30 hover:border-primary/50 hover:bg-white/20"
                }`}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <svg className="w-10 h-10 text-white/40 mx-auto mb-1 group-hover:text-primary/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <p className="text-white/50 text-xs">Click to upload</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {previewUrl && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => { setProfileImage(null); setPreviewUrl(null); }}
                    className="text-white/60 hover:text-white text-xs underline"
                  >
                    Remove photo
                  </button>
                </div>
              )}

              <div className="bg-white/5 rounded-lg p-3 mt-3">
                <p className="text-white/60 text-xs text-center">
                  You can skip this step and add a photo later.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-4 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white font-medium rounded-lg transition-all text-xs flex items-center gap-1.5 border border-white/20"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div></div>
          )}

          <div className="flex items-center gap-2">
            {isOptionalStep() && (
              <button
                type="button"
                onClick={handleSkip}
                className="px-4 py-2 text-white/70 hover:text-white font-medium transition-colors text-xs"
              >
                Skip
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="relative px-5 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-xs overflow-hidden group active:scale-[0.98] transition-transform"
            >
              <span className={slideButtonClass}></span>
              <span className="relative z-10 flex items-center gap-1.5">
                {currentStep === totalSteps ? "Complete" : "Continue"}
                {currentStep < totalSteps && (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Date picker styling - glass effect with pink theme */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1) sepia(1) saturate(5) hue-rotate(300deg);
          opacity: 0.8;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
          transform: scale(1.1);
        }
        
        /* Date picker popup - glass blur with pink accent */
        ::-webkit-datetime-edit {
          color: white;
        }
        ::-webkit-datetime-edit-fields-wrapper {
          background: transparent;
        }
        ::-webkit-datetime-edit-text,
        ::-webkit-datetime-edit-month-field,
        ::-webkit-datetime-edit-day-field,
        ::-webkit-datetime-edit-year-field {
          color: white;
        }
        
        /* Select dropdown styling - glass blur with pink theme */
        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23e30b5c'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          padding-right: 2.5rem;
        }
        
        select option {
          background: rgba(30, 10, 25, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          color: white;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(227, 11, 92, 0.2);
        }
        select option:hover,
        select option:focus,
        select option:checked {
          background: rgba(227, 11, 92, 0.4);
          background: linear-gradient(135deg, rgba(227, 11, 92, 0.5), rgba(180, 10, 75, 0.4));
          color: white;
        }
        
        /* Custom scrollbar for dropdowns */
        select::-webkit-scrollbar {
          width: 6px;
        }
        select::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        select::-webkit-scrollbar-thumb {
          background: rgba(227, 11, 92, 0.5);
          border-radius: 3px;
        }
        select::-webkit-scrollbar-thumb:hover {
          background: rgba(227, 11, 92, 0.7);
        }
        
        /* Firefox dropdown styling */
        @-moz-document url-prefix() {
          select option {
            background: rgba(30, 10, 25, 0.95);
            color: white;
          }
        }
        
        /* Button press effect */
        button:active:not(:disabled) {
          transform: scale(0.97);
        }
        
        /* Hide scrollbar but allow scrolling */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar globally for this component */
        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
