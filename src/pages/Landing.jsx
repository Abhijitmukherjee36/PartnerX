import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

export default function Landing() {
  // Animated counter state
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  // Counter animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Animate from 0 to 1000
            let start = 0;
            const end = 1000;
            const duration = 1500; // 1.5 seconds
            const increment = end / (duration / 16); // ~60fps
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Format count to display as "1k+"
  const formatCount = (num) => {
    if (num >= 1000) return '1k+';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-black font-body text-white relative overflow-x-hidden">
      {/* Custom styles */}
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, #E30B5C 0%, #FF4081 50%, #E30B5C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glow-pink {
          box-shadow: 0 0 60px rgba(255, 20, 147, 0.3), 0 0 120px rgba(255, 20, 147, 0.1);
        }
        .orbit-ring {
          border: 1px solid rgba(255, 20, 147, 0.2);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-animation {
          animation: float 4s ease-in-out infinite;
        }
        .float-animation-delayed {
          animation: float 4s ease-in-out 1s infinite;
        }
        .float-animation-slow {
          animation: float 5s ease-in-out 0.5s infinite;
        }
        .tag-rotate-1 { transform: rotate(-15deg); }
        .tag-rotate-2 { transform: rotate(10deg); }
        .tag-rotate-3 { transform: rotate(-8deg); }
        .member-badge {
          background: linear-gradient(135deg, #E30B5C 0%, #B8094A 100%);
          box-shadow: 0 0 30px rgba(227, 11, 92, 0.5);
        }
      `}</style>

      {/* Background Gradients - Hero Section - Corner Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none overflow-hidden">
        {/* Main corner glow - pink/purple hue from top-left */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[80%]"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(227, 11, 92, 0.35) 0%, rgba(180, 20, 100, 0.2) 25%, rgba(120, 20, 80, 0.1) 45%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        ></div>
        
        {/* Secondary glow layer for depth */}
        <div 
          className="absolute -top-[10%] -left-[5%] w-[50%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(255, 64, 129, 0.25) 0%, rgba(227, 11, 92, 0.15) 30%, transparent 60%)',
            filter: 'blur(80px)'
          }}
        ></div>
        
        {/* Subtle bottom-right accent */}
        <div 
          className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[50%]"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(227, 11, 92, 0.12) 0%, transparent 50%)',
            filter: 'blur(60px)'
          }}
        ></div>
      </div>

      {/* Header / Navbar - Transparent */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
        <h1 className="font-display text-lg sm:text-xl lg:text-2xl font-bold gradient-text">
          PartnerX
        </h1>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/login"
            className="px-4 sm:px-5 py-2 text-gray-300 hover:text-white transition-colors text-xs sm:text-sm font-medium"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-primary via-primary-light to-primary hover:from-primary-light hover:to-primary text-white font-semibold rounded-full text-xs sm:text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,20,147,0.5),0_0_40px_rgba(255,20,147,0.3)] hover:shadow-[0_0_30px_rgba(255,20,147,0.7),0_0_60px_rgba(255,20,147,0.4)]"
          >
            Join Now
          </Link>
        </div>
      </header>

      {/* ==================== SECTION 1: Hero ==================== */}
      <section className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-12 pt-20 pb-8 overflow-visible">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          
          {/* Left Side - Headline */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-3 sm:mb-4">
              Find Your Perfect
              <br />
              <span className="gradient-text">Partner</span> For
              <br />
              Every Moment —
              <br />
              <span className="text-gray-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl">Just One Click Away!</span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-md mx-auto lg:mx-0">
              Connect with verified partners for travel, events, adventures, and more. No more solo suffering.
            </p>

            {/* CTA Button */}
            <Link
              to="/discover"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 group text-sm sm:text-base shadow-[0_0_20px_rgba(255,20,147,0.5)] hover:shadow-[0_0_30px_rgba(255,20,147,0.7)]"
            >
              Get Started
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right Side - Premium Interactive Orbital Network */}
          <div className="relative h-[320px] sm:h-[380px] md:h-[440px] lg:h-[500px] flex items-center justify-center order-1 lg:order-2">
            
            {/* Orbital animations CSS */}
            <style>{`
              /* Orbit wrapper rotates, child counter-rotates to keep image upright */
              @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              @keyframes orbitSpinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
              @keyframes counterSpin { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
              @keyframes counterSpinReverse { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              
              @keyframes centerGlow {
                0%, 100% { box-shadow: 0 0 40px rgba(227, 11, 92, 0.45), 0 0 80px rgba(227, 11, 92, 0.2); }
                50% { box-shadow: 0 0 60px rgba(227, 11, 92, 0.65), 0 0 100px rgba(227, 11, 92, 0.35); }
              }
              
              .orbit-glow-ring {
                border: 1px solid rgba(227, 11, 92, 0.3);
                box-shadow: 0 0 20px rgba(227, 11, 92, 0.08), inset 0 0 20px rgba(227, 11, 92, 0.04);
              }
              
              .orbit-node-img {
                transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
              }
              .orbit-node-img:hover {
                transform: scale(1.2);
                box-shadow: 0 0 30px rgba(227, 11, 92, 0.7);
                border-color: rgba(227, 11, 92, 0.8);
              }
            `}</style>
            
            {/* Three glowing orbit rings */}
            <div className="absolute w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] rounded-full orbit-glow-ring"></div>
            <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full orbit-glow-ring"></div>
            <div className="absolute w-[290px] h-[290px] sm:w-[370px] sm:h-[370px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px] rounded-full orbit-glow-ring opacity-60"></div>
            
            {/* Center PartnerX Logo with pulsing glow */}
            <div 
              className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center z-30"
              style={{
                background: 'radial-gradient(circle, #181818 0%, #0c0c0c 50%, #000000 100%)',
                animation: 'centerGlow 4s ease-in-out infinite'
              }}
            >
              <span className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                <span className="text-white">Partner</span>
                <span className="text-[#E30B5C]">X</span>
              </span>
            </div>

            {/* ===== ORBIT 1 (Inner) - 2 nodes, 28s ===== */}
            <div 
              className="absolute w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] z-10"
              style={{ animation: 'orbitSpin 28s linear infinite' }}
            >
              {/* Node 1 - top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'counterSpin 28s linear infinite' }}>
                <div className="orbit-node-img w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/30 cursor-pointer">
                  <img src="/images/travel-adventure.png" alt="Travel" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Node 2 - bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" style={{ animation: 'counterSpin 28s linear infinite' }}>
                <div className="orbit-node-img w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-white/40 shadow-lg shadow-white/20 cursor-pointer">
                  <img src="/images/friends-cafe.png" alt="Cafe" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* ===== ORBIT 2 (Middle) - 3 nodes, 40s reverse ===== */}
            <div 
              className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] z-10"
              style={{ animation: 'orbitSpinReverse 40s linear infinite' }}
            >
              {/* Node 1 - top right */}
              <div className="absolute top-[15%] right-[5%]" style={{ animation: 'counterSpinReverse 40s linear infinite' }}>
                <div className="orbit-node-img w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-primary/60 shadow-lg shadow-primary/35 cursor-pointer">
                  <img src="/images/event-concert.png" alt="Events" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Node 2 - bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" style={{ animation: 'counterSpinReverse 40s linear infinite' }}>
                <div className="orbit-node-img w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white/50 shadow-lg shadow-white/25 cursor-pointer">
                  <img src="/images/travel-adventure.png" alt="Adventure" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Node 3 - left */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'counterSpinReverse 40s linear infinite' }}>
                <div className="orbit-node-img w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/30 cursor-pointer">
                  <img src="/images/friends-cafe.png" alt="Friends" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* ===== ORBIT 3 (Outer) - 3 nodes, 55s ===== */}
            <div 
              className="absolute w-[290px] h-[290px] sm:w-[370px] sm:h-[370px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px] z-10"
              style={{ animation: 'orbitSpin 55s linear infinite' }}
            >
              {/* Node 1 - top left */}
              <div className="absolute top-[10%] left-[10%]" style={{ animation: 'counterSpin 55s linear infinite' }}>
                <div className="orbit-node-img w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-primary/60 shadow-lg shadow-primary/40 cursor-pointer">
                  <img src="/images/event-concert.png" alt="Concert" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Node 2 - right */}
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2" style={{ animation: 'counterSpin 55s linear infinite' }}>
                <div className="orbit-node-img w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white/50 shadow-lg shadow-white/25 cursor-pointer">
                  <img src="/images/travel-adventure.png" alt="Travel" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Node 3 - bottom left */}
              <div className="absolute bottom-[10%] left-[15%]" style={{ animation: 'counterSpin 55s linear infinite' }}>
                <div className="orbit-node-img w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/35 cursor-pointer">
                  <img src="/images/friends-cafe.png" alt="Social" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Subtle floating category labels */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
              <span className="px-3 py-1 bg-black/70 backdrop-blur text-white/70 text-[10px] sm:text-xs font-medium rounded-full border border-primary/20">Travel</span>
            </div>
            <div className="absolute top-1/3 -right-1 sm:right-1 z-20">
              <span className="px-3 py-1 bg-black/70 backdrop-blur text-white/70 text-[10px] sm:text-xs font-medium rounded-full border border-primary/20">Events</span>
            </div>
            <div className="absolute bottom-1/3 -right-1 sm:right-1 z-20">
              <span className="px-3 py-1 bg-black/70 backdrop-blur text-white/70 text-[10px] sm:text-xs font-medium rounded-full border border-primary/20">Dating</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20">
              <span className="px-3 py-1 bg-black/70 backdrop-blur text-white/70 text-[10px] sm:text-xs font-medium rounded-full border border-primary/20">Social</span>
            </div>
            <div className="absolute bottom-1/3 -left-1 sm:left-1 z-20">
              <span className="px-3 py-1 bg-black/70 backdrop-blur text-white/70 text-[10px] sm:text-xs font-medium rounded-full border border-primary/20">Co-living</span>
            </div>
            <div className="absolute top-1/3 -left-1 sm:left-1 z-20">
              <span className="px-3 py-1 bg-black/70 backdrop-blur text-white/70 text-[10px] sm:text-xs font-medium rounded-full border border-primary/20">Activities</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: Premium Community Showcase ==================== */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-black overflow-hidden">
        {/* Background glows - responsive sizes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-primary/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] bg-primary/8 rounded-full blur-3xl"></div>
        </div>

        {/* Custom Swiper Styles */}
        <style>{`
          .community-swiper {
            padding: 20px 0 40px;
          }
          @media (min-width: 640px) {
            .community-swiper {
              padding: 30px 0 50px;
            }
          }
          @media (min-width: 1024px) {
            .community-swiper {
              padding: 40px 0 60px;
            }
          }
          .community-swiper .swiper-slide {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0.35;
          }
          .community-swiper .swiper-slide-active {
            opacity: 1;
          }
          .community-swiper .swiper-slide-active .testimonial-card {
            box-shadow: 0 0 40px rgba(227, 11, 92, 0.5), 0 0 70px rgba(227, 11, 92, 0.3);
          }
          @media (min-width: 768px) {
            .community-swiper .swiper-slide-active .testimonial-card {
              box-shadow: 0 0 50px rgba(227, 11, 92, 0.6), 0 0 90px rgba(227, 11, 92, 0.4);
            }
          }
          .testimonial-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .testimonial-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 0 50px rgba(227, 11, 92, 0.6), 0 0 80px rgba(227, 11, 92, 0.4) !important;
          }
          @media (min-width: 768px) {
            .testimonial-card:hover {
              transform: translateY(-12px) scale(1.03);
              box-shadow: 0 0 60px rgba(227, 11, 92, 0.7), 0 0 100px rgba(227, 11, 92, 0.5) !important;
            }
          }
        `}</style>

        <div className="w-full max-w-7xl mx-auto text-center relative z-10">
          
          {/* Heading - Responsive Typography */}
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-3 sm:mb-4 px-2">
            Join a Thriving Community
            <br className="hidden xs:block" />
            <span className="xs:hidden"> </span>of Explorers. <span className="gradient-text">Trust PartnerX.</span>
          </h2>

          {/* Subtext - Responsive */}
          <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-2">
            Connect with verified partners for travel, events, co-living, adventures, and more. No more solo suffering.
          </p>

          {/* Testimonial Cards Swiper */}
          <div className="community-swiper relative -mx-4 sm:mx-0">
            <Swiper
              modules={[Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              slidesPerView={1.8}
              spaceBetween={12}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              coverflowEffect={{
                rotate: 8,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              breakpoints={{
                400: { 
                  slidesPerView: 2.2, 
                  spaceBetween: 16,
                  coverflowEffect: { rotate: 10, depth: 120, modifier: 1.1 }
                },
                480: { 
                  slidesPerView: 2.4, 
                  spaceBetween: 20,
                  coverflowEffect: { rotate: 12, depth: 140, modifier: 1.2 }
                },
                640: { 
                  slidesPerView: 2.6, 
                  spaceBetween: 24,
                  coverflowEffect: { rotate: 14, depth: 160, modifier: 1.3 }
                },
                768: { 
                  slidesPerView: 2.8, 
                  spaceBetween: 28,
                  coverflowEffect: { rotate: 15, depth: 180, modifier: 1.4 }
                },
                1024: { 
                  slidesPerView: 3.2, 
                  spaceBetween: 32,
                  coverflowEffect: { rotate: 15, depth: 200, modifier: 1.5 }
                },
                1280: { 
                  slidesPerView: 3.6, 
                  spaceBetween: 36,
                  coverflowEffect: { rotate: 15, depth: 220, modifier: 1.6 }
                },
              }}
              className="!overflow-visible"
            >
              {/* Card 1 - Samika */}
              <SwiperSlide>
                <div className="testimonial-card rounded-xl sm:rounded-2xl p-[2px] sm:p-[3px] bg-gradient-to-br from-primary via-primary/60 to-primary/30 shadow-[0_0_20px_rgba(227,11,92,0.25)] sm:shadow-[0_0_30px_rgba(227,11,92,0.3)] mx-auto w-[140px] xs:w-[160px] sm:w-[190px] md:w-[210px]">
                  <div className="bg-black rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 aspect-[3/4] flex flex-col items-center text-center">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-primary/50 mb-2 sm:mb-3 flex-shrink-0">
                      <img src="/images/travel-adventure.png" alt="Samika" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-300 text-[10px] xs:text-xs sm:text-xs leading-relaxed mb-2 sm:mb-3 flex-grow line-clamp-5">
                      "As someone introverted, walking into groups and parties was daunting. PartnerX helped me find adventure buddies who respect my pace."
                    </p>
                    <p className="text-primary font-semibold text-xs sm:text-sm flex-shrink-0">Samika</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Card 2 - Sameen */}
              <SwiperSlide>
                <div className="testimonial-card rounded-xl sm:rounded-2xl p-[2px] sm:p-[3px] bg-gradient-to-br from-primary via-primary/60 to-primary/30 shadow-[0_0_20px_rgba(227,11,92,0.25)] sm:shadow-[0_0_30px_rgba(227,11,92,0.3)] mx-auto w-[140px] xs:w-[160px] sm:w-[190px] md:w-[210px]">
                  <div className="bg-black rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 aspect-[3/4] flex flex-col items-center text-center">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-primary/50 mb-2 sm:mb-3 flex-shrink-0">
                      <img src="/images/event-concert.png" alt="Sameen" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-300 text-[10px] xs:text-xs sm:text-xs leading-relaxed mb-2 sm:mb-3 flex-grow line-clamp-5">
                      "There was this three-day music festival and I desperately wanted to go. Through PartnerX, I met Sarah and we had the time of our lives!"
                    </p>
                    <p className="text-primary font-semibold text-xs sm:text-sm flex-shrink-0">Sameen</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Card 3 - Simon */}
              <SwiperSlide>
                <div className="testimonial-card rounded-xl sm:rounded-2xl p-[2px] sm:p-[3px] bg-gradient-to-br from-primary via-primary/60 to-primary/30 shadow-[0_0_20px_rgba(227,11,92,0.25)] sm:shadow-[0_0_30px_rgba(227,11,92,0.3)] mx-auto w-[140px] xs:w-[160px] sm:w-[190px] md:w-[210px]">
                  <div className="bg-black rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 aspect-[3/4] flex flex-col items-center text-center">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-primary/50 mb-2 sm:mb-3 flex-shrink-0">
                      <img src="/images/friends-cafe.png" alt="Simon" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-300 text-[10px] xs:text-xs sm:text-xs leading-relaxed mb-2 sm:mb-3 flex-grow line-clamp-5">
                      "New city, no connections. PartnerX helped me find incredible people to explore with. Every experience has been memorable and safe."
                    </p>
                    <p className="text-primary font-semibold text-xs sm:text-sm flex-shrink-0">Simon</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Card 4 - Alex */}
              <SwiperSlide>
                <div className="testimonial-card rounded-xl sm:rounded-2xl p-[2px] sm:p-[3px] bg-gradient-to-br from-primary via-primary/60 to-primary/30 shadow-[0_0_20px_rgba(227,11,92,0.25)] sm:shadow-[0_0_30px_rgba(227,11,92,0.3)] mx-auto w-[140px] xs:w-[160px] sm:w-[190px] md:w-[210px]">
                  <div className="bg-black rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 aspect-[3/4] flex flex-col items-center text-center">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-primary/50 mb-2 sm:mb-3 flex-shrink-0">
                      <img src="/images/travel-adventure.png" alt="Alex" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-300 text-[10px] xs:text-xs sm:text-xs leading-relaxed mb-2 sm:mb-3 flex-grow line-clamp-5">
                      "Solo travel was getting lonely. PartnerX introduced me to verified companions who share my passion for adventure."
                    </p>
                    <p className="text-primary font-semibold text-xs sm:text-sm flex-shrink-0">Alex</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Card 5 - Maya */}
              <SwiperSlide>
                <div className="testimonial-card rounded-xl sm:rounded-2xl p-[2px] sm:p-[3px] bg-gradient-to-br from-primary via-primary/60 to-primary/30 shadow-[0_0_20px_rgba(227,11,92,0.25)] sm:shadow-[0_0_30px_rgba(227,11,92,0.3)] mx-auto w-[140px] xs:w-[160px] sm:w-[190px] md:w-[210px]">
                  <div className="bg-black rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 aspect-[3/4] flex flex-col items-center text-center">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-primary/50 mb-2 sm:mb-3 flex-shrink-0">
                      <img src="/images/event-concert.png" alt="Maya" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-300 text-[10px] xs:text-xs sm:text-xs leading-relaxed mb-2 sm:mb-3 flex-grow line-clamp-5">
                      "From spontaneous concerts to planned road trips, the connections here are real and lasting. Best community platform!"
                    </p>
                    <p className="text-primary font-semibold text-xs sm:text-sm flex-shrink-0">Maya</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Card 6 - Jordan */}
              <SwiperSlide>
                <div className="testimonial-card rounded-xl sm:rounded-2xl p-[2px] sm:p-[3px] bg-gradient-to-br from-primary via-primary/60 to-primary/30 shadow-[0_0_20px_rgba(227,11,92,0.25)] sm:shadow-[0_0_30px_rgba(227,11,92,0.3)] mx-auto w-[140px] xs:w-[160px] sm:w-[190px] md:w-[210px]">
                  <div className="bg-black rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 aspect-[3/4] flex flex-col items-center text-center">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-primary/50 mb-2 sm:mb-3 flex-shrink-0">
                      <img src="/images/friends-cafe.png" alt="Jordan" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-300 text-[10px] xs:text-xs sm:text-xs leading-relaxed mb-2 sm:mb-3 flex-grow line-clamp-5">
                      "Found hiking partners who became lifelong friends. We've conquered 10 trails together and counting!"
                    </p>
                    <p className="text-primary font-semibold text-xs sm:text-sm flex-shrink-0">Jordan</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Card 7 - Chris */}
              <SwiperSlide>
                <div className="testimonial-card rounded-xl sm:rounded-2xl p-[2px] sm:p-[3px] bg-gradient-to-br from-primary via-primary/60 to-primary/30 shadow-[0_0_20px_rgba(227,11,92,0.25)] sm:shadow-[0_0_30px_rgba(227,11,92,0.3)] mx-auto w-[140px] xs:w-[160px] sm:w-[190px] md:w-[210px]">
                  <div className="bg-black rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 aspect-[3/4] flex flex-col items-center text-center">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-primary/50 mb-2 sm:mb-3 flex-shrink-0">
                      <img src="/images/travel-adventure.png" alt="Chris" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-300 text-[10px] xs:text-xs sm:text-xs leading-relaxed mb-2 sm:mb-3 flex-grow line-clamp-5">
                      "Never imagined festival season could be this amazing. PartnerX connected me with my music tribe!"
                    </p>
                    <p className="text-primary font-semibold text-xs sm:text-sm flex-shrink-0">Chris</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* Card 8 - Taylor */}
              <SwiperSlide>
                <div className="testimonial-card rounded-xl sm:rounded-2xl p-[2px] sm:p-[3px] bg-gradient-to-br from-primary via-primary/60 to-primary/30 shadow-[0_0_20px_rgba(227,11,92,0.25)] sm:shadow-[0_0_30px_rgba(227,11,92,0.3)] mx-auto w-[140px] xs:w-[160px] sm:w-[190px] md:w-[210px]">
                  <div className="bg-black rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 aspect-[3/4] flex flex-col items-center text-center">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-primary/50 mb-2 sm:mb-3 flex-shrink-0">
                      <img src="/images/event-concert.png" alt="Taylor" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-gray-300 text-[10px] xs:text-xs sm:text-xs leading-relaxed mb-2 sm:mb-3 flex-grow line-clamp-5">
                      "Co-living through PartnerX has been transformative. It's like finding your tribe in a new city within weeks!"
                    </p>
                    <p className="text-primary font-semibold text-xs sm:text-sm flex-shrink-0">Taylor</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Stats/Metric - Animated Counter */}
          <div ref={counterRef} className="mb-6 sm:mb-8 mt-6 sm:mt-8">
            <p className="font-display text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold gradient-text mb-1 sm:mb-2">
              {formatCount(count)}
            </p>
            <p className="text-white text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold">Verified Partners Ready</p>
          </div>

          {/* CTA Button - Responsive */}
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-primary hover:bg-primary-dark text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(227,11,92,0.4)] sm:shadow-[0_0_25px_rgba(227,11,92,0.5)] hover:shadow-[0_0_35px_rgba(227,11,92,0.6)] sm:hover:shadow-[0_0_40px_rgba(227,11,92,0.7)] hover:scale-105"
          >
            Join the Community
          </Link>
        </div>
      </section>

      {/* ==================== SECTION 3: Community ==================== */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-black overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Side - Video */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            {/* Video Container */}
            <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] max-w-[500px] lg:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
              <video 
                src="/share-idea-landing.mp4" 
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* Member Circle Badge */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                <div className="member-badge w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/40">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 mb-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Member</span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Circle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
              Share your <span className="gradient-text">ideas</span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-4">
              Help shape the future of PartnerX by joining our Member Circle. This select community of Members shares ideas directly with our team through chats, discussions, and product tests.
            </p>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
              Participants get early access to new features, sneak peeks at upcoming campaigns, and the chance to help make PartnerX even better for everyone.
            </p>

            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-primary hover:bg-primary-dark text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(227,11,92,0.5)] hover:shadow-[0_0_30px_rgba(227,11,92,0.6)] hover:scale-105"
            >
              Sign up
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: Features ==================== */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-black">
        <div className="w-full max-w-7xl mx-auto">
          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Card 1: Find Partners */}
            <div className="rounded-3xl p-3 sm:p-4 overflow-visible cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_rgba(227,11,92,0.6)] hover:scale-[1.02] group" style={{ background: 'linear-gradient(135deg, #E30B5C 0%, #B8094A 100%)' }}>
              {/* Black Inner Container - Single Showcase Image */}
              <div className="relative bg-black rounded-2xl overflow-hidden border border-gray-800">
                <img 
                  src="/images/partners-showcase.png" 
                  alt="Find Partners Showcase" 
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Card Content */}
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Find Partners
              </h3>
              <p className="text-white/80 mb-4">
                Whether you're new to a city or looking for adventure buddies, PartnerX helps you find verified partners for travel, events, and everyday moments.
              </p>
              <Link to="/discover" className="inline-flex items-center text-white font-medium hover:underline group/link">
                Find your partner
                <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Card 2: Events & Activities */}
            <div className="rounded-3xl p-3 sm:p-4 overflow-visible cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_rgba(227,11,92,0.6)] hover:scale-[1.02] group" style={{ background: 'linear-gradient(135deg, #E30B5C 0%, #B8094A 100%)' }}>
              {/* Black Inner Container - Single Showcase Image */}
              <div className="relative bg-black rounded-2xl overflow-hidden border border-gray-800">
                <img 
                  src="/images/events-showcase.png" 
                  alt="Events & Activities Showcase" 
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Card Content */}
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                Events & Activities
              </h3>
              <p className="text-white/80 mb-4">
                Whether you've moved to a new city or just want to expand your circle, discover local events and find like-minded people who match your vibe.
              </p>
              <Link to="/events" className="inline-flex items-center text-white font-medium hover:underline group/link">
                Find your events
                <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: Success Stories ==================== */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-black">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Testimonial */}
            <div className="order-2 lg:order-1">
              {/* Quote Mark */}
              <div className="text-primary text-6xl font-display leading-none mb-4">"</div>
              
              {/* Quote Text */}
              <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                We are both naturally positive, happy-go-getters, but when you put us together, it feels like there is nothing we can't accomplish.
              </blockquote>
              
              {/* Attribution */}
              <p className="text-gray-400 text-lg mb-8">
                <span className="text-primary font-medium">Leslie & Thomas</span>, partners since 2024
              </p>
              
              {/* CTA Button */}
              <Link
                to="/stories"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(227,11,92,0.5)] hover:shadow-[0_0_30px_rgba(227,11,92,0.7)]"
              >
                Read more stories
              </Link>
            </div>

            {/* Right Side - Video */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[400px] sm:min-h-[500px]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover min-h-[400px] sm:min-h-[500px]"
                >
                  <source src="/couple-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 6: Meet In Person ==================== */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-black">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Video */}
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[400px] sm:min-h-[500px]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover min-h-[400px] sm:min-h-[500px]"
                >
                  <source src="/landing-tennis.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              {/* Heading */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Start the chat in person
              </h2>
              
              {/* Description */}
              <p className="text-gray-400 text-lg sm:text-xl mb-8 max-w-lg">
                PartnerX IRL events mean you can stop typing and start talking. Come solo or bring a friend—and leave with a new connection.
              </p>
              
              {/* CTA Button */}
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(227,11,92,0.5)] hover:shadow-[0_0_30px_rgba(227,11,92,0.7)]"
              >
                Meet in person
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 7: Banner ==================== */}
      <section className="relative z-10 bg-black">
        {/* Mobile: Raspberry background with text + image */}
        <div className="lg:hidden" style={{ background: 'linear-gradient(135deg, #E30B5C 0%, #B8094A 100%)' }}>
          <div className="px-4 pt-10 pb-0">
            {/* Text Content */}
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Get the app
            </h2>
            <p className="text-white/80 text-lg mb-6">
              Find your next partner
            </p>
            
            {/* Download Button */}
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full mb-8">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download now
            </a>
          </div>
          
          {/* Mobile Banner Image */}
          <div className="w-full">
            <img 
              src="/images/landing-banner.png" 
              alt="PartnerX App Preview" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Desktop: Black background with image + buttons */}
        <div className="hidden lg:block py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
          <div className="w-full max-w-7xl mx-auto">
            {/* Banner Image */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <img 
                src="/images/landing-banner.png" 
                alt="PartnerX App Preview" 
                className="w-full h-auto"
              />
            </div>
            
            {/* App Store Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="inline-flex items-center gap-3 px-5 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-70">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="inline-flex items-center gap-3 px-5 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-70">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-12" style={{ background: 'linear-gradient(135deg, #E30B5C 0%, #B8094A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            
            {/* Logo & QR Code */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-6">
                <span className="font-display text-3xl font-bold text-white">Partner<span className="text-white">X</span></span>
              </Link>
              
              {/* QR Code */}
              <div className="flex items-center gap-4 p-4 bg-black rounded-xl max-w-xs">
                <div className="bg-white rounded-lg p-2 w-20 h-20 flex items-center justify-center">
                  <svg className="w-14 h-14 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h1v1h-1v-1zm-3 0h1v3h-1v-3zm0 4h1v1h-1v-1zm3 0h1v1h-1v-1zm-1-3h1v1h-1v-1zm1 1h1v1h-1v-1zm-1 1h1v1h-1v-1zm1 1h1v1h-1v-1zm-2 0h1v1h-1v-1z"/>
                  </svg>
                </div>
                <div className="text-white text-sm font-medium">
                  Scan the QR code to get the PartnerX app
                </div>
              </div>
            </div>

            {/* Our Apps */}
            <div>
              <h4 className="text-white/70 text-sm font-medium mb-4">Our apps</h4>
              <ul className="space-y-3">
                <li><Link to="/discover" className="text-white hover:text-white/80 font-medium">PartnerX Date</Link></li>
                <li><Link to="/friends" className="text-white hover:text-white/80 font-medium">BFF</Link></li>
                <li><a href="#" className="text-white hover:text-white/80 font-medium">Bizz</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white/70 text-sm font-medium mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-white hover:text-white/80 font-medium">About</Link></li>
                <li><Link to="/contact" className="text-white hover:text-white/80 font-medium">Contact us</Link></li>
                <li><Link to="/careers" className="text-white hover:text-white/80 font-medium">Careers</Link></li>
                <li><Link to="/investors" className="text-white hover:text-white/80 font-medium">Investors</Link></li>
                <li><Link to="/support" className="text-white hover:text-white/80 font-medium">Support</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white/70 text-sm font-medium mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/guidelines" className="text-white hover:text-white/80 font-medium">Guidelines</Link></li>
                <li><Link to="/privacy" className="text-white hover:text-white/80 font-medium">Privacy policy</Link></li>
                <li><Link to="/terms" className="text-white hover:text-white/80 font-medium">Terms and conditions</Link></li>
                <li><Link to="/cookies" className="text-white hover:text-white/80 font-medium">Manage cookies</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 pt-8 border-t border-white/20">
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
