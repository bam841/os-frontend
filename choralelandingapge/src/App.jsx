import React, { useState, useEffect } from 'react';

const galleryItems = [
  {
    id: 1,
    img: "/assets/GALLERY1.jpg",
    title: "Melody & Passion",
    desc: "The voices of the NULP Chorale blending in beautiful resonance during the Concert Gala Night."
  },
  {
    id: 2,
    img: "/assets/GALLERY2.jpg",
    title: "Symphony of Unity",
    desc: "Capturing the artistic excellence, dedication, and teamwork of our vocal ensemble."
  },
  {
    id: 3,
    img: "/assets/NEWLANDINGPAFGECOVER.jpg",
    title: "Stage Lights & Pride",
    desc: "Performing under the theatrical lights, carrying the flag of National University."
  },
  {
    id: 4,
    img: "/assets/GALLERY 2.jpg",
    title: "Choral Harmonies",
    desc: "Expressing heartfelt emotions through every lyric and note."
  },
  {
    id: 5,
    img: "/assets/gall3.jpg",
    title: "Chamber Devotion",
    desc: "Bringing passion and focus to our musical repertoire."
  },
  {
    id: 6,
    img: "/assets/gall4.jpg",
    title: "Shared Voices",
    desc: "Building bonds of friendship and unity through song."
  },
  {
    id: 7,
    img: "/assets/gall5.jpg",
    title: "Vocal Brilliance",
    desc: "Rehearsing diligently to deliver stellar choral performances."
  },
  {
    id: 8,
    img: "/assets/gall7.jpg",
    title: "Ensemble Spirit",
    desc: "A family of singers united by a love for music and performance."
  },
  {
    id: 9,
    img: "/assets/gall8.jpg",
    title: "Musical Journey",
    desc: "Creating lasting memories both on and off the stage."
  },
  {
    id: 10,
    img: "/assets/gall9.jpg",
    title: "Artistic Elegance",
    desc: "Blending individual talents into a unified artistic expression."
  },
  {
    id: 11,
    img: "/assets/gall11.jpg",
    title: "Nationalian Pride",
    desc: "Representing National University with pride and musical excellence."
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'officers'
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Scroll logic for navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection animations trigger on state changes (page swaps)
  useEffect(() => {
    const animatedSections = document.querySelectorAll('.fade-in-section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    animatedSections.forEach(section => {
      sectionObserver.observe(section);
    });

    return () => sectionObserver.disconnect();
  }, [currentPage]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowJoinModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Page switcher and smooth scrolling
  const navigateToSection = (sectionId) => {
    setIsMenuOpen(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <header className={isScrolled ? 'scrolled' : ''}>
        <div className="container nav-wrapper">
          <a href="#" onClick={(e) => { e.preventDefault(); navigateToSection('hero'); setCurrentPage('home'); }} className="logo" aria-label="NULP Chorale Home">
            <span className="logo-text">NULP CHORALE</span>
          </a>
          
          <button 
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
            aria-label="Toggle Menu" 
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#" className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('home'); navigateToSection('hero'); }}>Home</a></li>
            <li><a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('about'); }}>About Us</a></li>
            <li><a href="#conductor" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('conductor'); }}>Conductor</a></li>
            <li><a href="#gallery" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('gallery'); }}>Gallery</a></li>
            <li><a href="#officers" className={`nav-link ${currentPage === 'officers' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setCurrentPage('officers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Officers</a></li>
            <li><a href="#connect" className="nav-link" onClick={(e) => { e.preventDefault(); navigateToSection('connect'); }}>Connect</a></li>
            <li><button className="nav-btn" onClick={() => { setIsMenuOpen(false); setShowJoinModal(true); }}>Join Us</button></li>
          </ul>
        </div>
      </header>

      {/* Render Pages */}
      {currentPage === 'home' ? (
        <HomePage 
          navigateToSection={navigateToSection} 
          setCurrentPage={setCurrentPage} 
          onJoinClick={() => setShowJoinModal(true)} 
        />
      ) : (
        <OfficersPage />
      )}

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-logo">NULP CHORALE</div>
          <div className="footer-socials">
            <a href="https://www.facebook.com/search/top?q=nu%20chorale" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a1 1 0 0 0-1-1h-2v6.3H13v-6.3h-1.5v-2H13V9.5c0-1.8 1.2-3 3-3h2v2h-1.5c-.5 0-.5.2-.5.5v1.5h2v2h-2v5.5h3z"/>
              </svg>
            </a>
            <a href="#" className="social-icon-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
              </svg>
            </a>
            <a href="#" className="social-icon-btn" aria-label="YouTube">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 12a10.012 10.012 0 0 1-6.958 9.538C15.02 21.848 13.524 22 12 22s-3.02-.152-4.042-.462A10.012 10.012 0 0 1 1 12a10.012 10.012 0 0 1 6.958-9.538C8.98 2.152 10.476 2 12 2s3.02.152 4.042.462A10.012 10.012 0 0 1 23 12M9.75 8.25v7.5L16.25 12z"/>
              </svg>
            </a>
          </div>
          <div className="footer-copy">
            &copy; 2026 NULP Chorale. All Rights Reserved. <br />
            "One Voice. One Harmony. Proudly Nationalian."
          </div>
        </div>
      </footer>

      {/* Premium Glassmorphic Join Us Modal */}
      <div 
        className={`modal-overlay ${showJoinModal ? 'active' : ''}`} 
        onClick={() => setShowJoinModal(false)}
        aria-modal="true"
        role="dialog"
      >
        <div 
          className="modal-container" 
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="modal-close-btn" 
            onClick={() => setShowJoinModal(false)}
            aria-label="Close modal"
          >
            &times;
          </button>
          <h2 className="modal-title">Join NULP Chorale</h2>
          <div className="modal-subtitle">Auditions & Registration</div>
          <div className="modal-qr-container">
            <img className="modal-qr-img" src="/assets/qrcode.jpg" alt="Scan to join NULP Chorale" />
          </div>
          <p className="modal-instructions">
            Scan this QR code with your phone camera or QR reader to open the membership application and audition form. We look forward to hearing your voice!
          </p>
        </div>
      </div>
    </>
  );
}

/* ==========================================================================
   HOMEPAGE COMPONENT
   ========================================================================== */
function HomePage({ navigateToSection, setCurrentPage, onJoinClick }) {
  return (
    <main>
      {/* Full-Bleed Theatrical Hero Section */}
      <section id="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content-full">
          <span className="hero-welcome">National University Lipa</span>
          <h1 className="hero-title">
            National University <br />
            <span className="serif-italic">Chorale</span>
          </h1>
          <p className="hero-motto">"One Voice. One Harmony. Proudly Nationalian."</p>
          <p className="hero-desc">
            Step into the musical soul of National University. Under the artistic guidance of Conductor Gene Roy P. Hernandez, we turn passion, purpose, and pride into a single, breathtaking harmony.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onJoinClick}>Join Us</button>
            <a href="#about" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); navigateToSection('about'); }}>Our Story</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding fade-in-section">
        <div className="container">
          <span className="section-tracker">Established 2022</span>
          <h2>Our Story</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                Established in 2022, NULP Chorale serves as a home for talented and passionate Nationalians who share one collective love—music. More than just a choir, we are a close-knit family that believes every voice has the unique power to inspire, connect, and leave a lasting impact on society.
              </p>
              <div className="about-quote">
                "We believe every voice has the power to inspire, connect, and leave a lasting impact."
              </div>
              <p>
                From heartfelt performances on the grand stage to unforgettable, candid moments shared behind the scenes during rehearsals, this is where our musical journey comes to life. We carry the flag of National University with immense pride and devotion.
              </p>
            </div>
            <div className="about-img-container">
              <img className="about-img" src="/assets/GALLERY1.jpg" alt="NULP Chorale stage performance under golden spotlighting" />
            </div>
          </div>
        </div>
      </section>

      {/* Conductor Section */}
      <section id="conductor" className="section-padding bg-accent-section fade-in-section">
        <div className="container">
          <span className="section-tracker">Artistic Leadership</span>
          <h2>Under the Baton</h2>
          <div className="conductor-card">
            <div className="conductor-img-side">
              <img className="conductor-img" src="/assets/conductor.jpg" alt="Conductor Gene Roy P. Hernandez portrait" />
            </div>
            <div className="conductor-details">
              <span className="conductor-role">Choir Director & Conductor</span>
              <h3 className="conductor-name">Gene Roy P. Hernandez</h3>
              <p className="conductor-bio">
                Proudly led by our conductor, Gene Roy P. Hernandez, the NULP Chorale has flourished. Under his inspiring leadership and artistic vision, our members learn to sing with purpose, passion, and pride, transforming individual voices into a single, breathtaking harmony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Officers Teaser */}
      <section className="officers-teaser fade-in-section">
        <div className="container teaser-content">
          <span className="teaser-subtitle">Leadership</span>
          <h2 className="teaser-title">Meet the Officers</h2>
          <p className="teaser-desc">
            Behind every heartfelt performance and unforgettable moment is a team of dedicated student leaders. Discover the Executive Board and Section Leaders guiding the NULP Chorale.
          </p>
          <a href="#officers" className="btn btn-primary" onClick={(e) => { e.preventDefault(); setCurrentPage('officers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>View Officers Board</a>
        </div>
      </section>

      {/* Dynamic Gallery Swiper Carousel */}
      <GallerySection />

      {/* Facebook Connect Section */}
      <ConnectSection onJoinClick={onJoinClick} />
    </main>
  );
}

/* ==========================================================================
   DYNAMIC GALLERY SWIPER CAROUSEL COMPONENT
   ========================================================================== */
function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  // Autoplay slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section id="gallery" className="section-padding bg-accent-section fade-in-section">
      <div className="container">
        <span className="section-tracker">Gallery Carousel</span>
        <h2>Moments in Song</h2>
        
        <div 
          className="gallery-carousel-wrapper"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Navigation Controls */}
          <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous Slide">
            &#8249;
          </button>
          
          <button className="carousel-btn next" onClick={nextSlide} aria-label="Next Slide">
            &#8250;
          </button>

          {/* Slider Window */}
          <div className="carousel-window">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {galleryItems.map((item) => (
                <div key={item.id} className="carousel-slide">
                  <div className="slide-image-container">
                    <img className="slide-image" src={item.img} alt={item.title} />
                  </div>
                  <div className="slide-info-overlay">
                    <h4 className="slide-title">{item.title}</h4>
                    <p className="slide-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="carousel-indicators">
            {galleryItems.map((_, idx) => (
              <button 
                key={idx} 
                className={`indicator-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   FACEBOOK CONNECT SECTION
   ========================================================================== */
function ConnectSection({ onJoinClick }) {
  return (
    <section id="connect" className="section-padding fade-in-section">
      <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
        <span className="section-tracker">Auditions & Socials</span>
        <h2 className="connect-heading" style={{ textAlign: 'center' }}>Connect with Us</h2>
        <p style={{ marginBottom: '3.5rem', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto' }}>
          We are always thrilled to welcome new listeners, supporters, and fellow musicians into our family circle. Follow us online or scan to join our vocal ensemble.
        </p>
        
        <div className="connect-grid">
          {/* Card 1: Auditions / Join Us */}
          <div className="connect-card">
            <span className="facebook-badge">
              <svg style={{ width: '16px', height: '16px', fill: 'var(--accent-gold)' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              Auditions 2026
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#ffffff', marginBottom: '1rem', fontWeight: '400' }}>Be Part of the Harmony</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: '1.65', marginBottom: '2.5rem' }}>
              Are you ready to share your passion for singing? Auditions are now open for new members. Scan our QR code or click below to join the NULP Chorale family.
            </p>
            <button onClick={onJoinClick} className="btn btn-primary" style={{ width: 'auto', marginTop: 'auto' }}>
              Join the Chorale
            </button>
          </div>

          {/* Card 2: Facebook Page */}
          <div className="connect-card">
            <span className="facebook-badge">
              <svg style={{ width: '16px', height: '16px', fill: 'var(--accent-gold)' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 3.127 8.18 7.235 9.03v-6.387h-2.3v-2.64h2.3V9.513c0-2.292 1.34-3.56 3.42-3.56.998 0 2.04.18 2.04.18v2.26H13.6c-1.127 0-1.478.704-1.478 1.43v1.72h2.518l-.403 2.64h-2.115v6.39C18.873 20.198 22 16.442 22 12.017 22 6.484 17.522 2 12 2z"/>
              </svg>
              Official Page
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#ffffff', marginBottom: '1rem', fontWeight: '400' }}>Stay Connected</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: '1.65', marginBottom: '2.5rem' }}>
              From heartfelt performances to unforgettable moments behind the scenes, follow our official Facebook page to stay updated on our latest news and events.
            </p>
            <a href="https://www.facebook.com/search/top?q=nu%20chorale" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: 'auto', marginTop: 'auto' }}>
              Visit Facebook Page
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   OFFICERS BOARD PAGE COMPONENT
   ========================================================================== */
function OfficersPage() {
  return (
    <main style={{ minHeight: '80vh' }}>
      {/* Officers Hero */}
      <section className="officers-hero">
        <div className="container">
          <span className="hero-welcome">Behind the Harmony</span>
          <h1 className="hero-title">The Officers Board</h1>
          <p className="hero-desc">
            The dedicated student leaders who work behind the scenes to manage rehearsals, organize performances, coordinate auditions, and foster a family spirit.
          </p>
        </div>
      </section>

      {/* Officers Grid */}
      <section className="section-padding" style={{ paddingTop: '4rem' }}>
        <div className="container">
          
          {/* Tier 1: Executive Board */}
          <div className="officers-tier fade-in-section">
            <h2 className="tier-title">Executive Board</h2>
            <div className="officers-tier-flex">
              
              {/* President */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/president.jpg" alt="President Derwyn Mico Candelarua Diaz" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">President</div>
                  <div className="officer-name">Derwyn Mico Candelarua Diaz</div>
                </div>
              </div>
              
              {/* Vice President */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/vicepresident.jpg" alt="Vice President Adnyani Ace Budhaya" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">Vice President</div>
                  <div className="officer-name">Adnyani Ace Budhaya</div>
                </div>
              </div>
              
            </div>
          </div>
          
          {/* Tier 2: Secretariat & Finance */}
          <div className="officers-tier fade-in-section">
            <h2 className="tier-title">Secretariat & Finance</h2>
            <div className="officers-tier-flex">
              
              {/* Secretary */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/secretary.jpg" alt="Secretary John Abrahm" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">Secretary</div>
                  <div className="officer-name">John Abrahm</div>
                </div>
              </div>
              
              {/* Assistant Secretary */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/assistant_secretary.jpg" alt="Assistant Secretary Kristine Faye R. Reyes" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">Assistant Secretary</div>
                  <div className="officer-name">Kristine Faye R. Reyes</div>
                </div>
              </div>
              
              {/* Treasurer */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/treasurer.jpg" alt="Treasurer Kate Hayley Balani" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">Treasurer</div>
                  <div className="officer-name">Kate Hayley Balani</div>
                </div>
              </div>
              
              {/* Auditor */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/auditor.jpg" alt="Auditor Ghendy Wayne Valmoria Balhag" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">Auditor</div>
                  <div className="officer-name">Ghendy Wayne Valmoria Balhag</div>
                </div>
              </div>
              
            </div>
          </div>
          
          {/* Tier 3: Public Relations Board */}
          <div className="officers-tier fade-in-section">
            <h2 className="tier-title">Public Relations Board</h2>
            <div className="officers-tier-flex">
              
              {/* Main PIO */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/main_pio.jpg" alt="Main PIO Zyrel Nacario" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">PIO 1</div>
                  <div className="officer-name">Zyrel Nacario</div>
                </div>
              </div>
              
              {/* PIO 2 */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/pio2.jpg" alt="PIO 2 Shekinah G. Lapitan" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">PIO 2</div>
                  <div className="officer-name">Shekinah G. Lapitan</div>
                </div>
              </div>
              
            </div>
          </div>
          
          {/* Tier 4: Section Leaders */}
          <div className="officers-tier fade-in-section" style={{ marginBottom: 0 }}>
            <h2 className="tier-title">Section Leaders</h2>
            <div className="officers-tier-flex">
              
              {/* Soprano Head */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/sopranohead.jpg" alt="Soprano Head Einna Roshaine de Ocampo" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">Soprano Head</div>
                  <div className="officer-name">Einna Roshaine de Ocampo</div>
                </div>
              </div>

              {/* Alto Head */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/altohead.jpg" alt="Alto Head Lady Faye Espiritu Alo" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">Alto Head</div>
                  <div className="officer-name">Lady Faye Espiritu Alo</div>
                </div>
              </div>

              {/* Tenor Head */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/tenorhead.jpg" alt="Tenor Head Don Nicolo M. Padilla" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">Tenor Head</div>
                  <div className="officer-name">Don Nicolo M. Padilla</div>
                </div>
              </div>

              {/* Bass Head */}
              <div className="officer-card">
                <div className="officer-img-container">
                  <img className="officer-img" src="/assets/officers/basshead.jpg" alt="Bass Head John Lemuel Aguila Elare" />
                </div>
                <div className="officer-info">
                  <div className="officer-role">Bass Head</div>
                  <div className="officer-name">John Lemuel Aguila Elare</div>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
}
