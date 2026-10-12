import { useState, useEffect, useRef } from 'react';
import './index.scss';

const featuresData = [
  { title: 'Bookmark in one click', desc: 'Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.', image: '/illustration-features-tab-1.svg' },
  { title: 'Intelligent search', desc: 'Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.', image: '/illustration-features-tab-2.svg' },
  { title: 'Share your bookmarks', desc: 'Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.', image: '/illustration-features-tab-3.svg' }
];

const faqData = [
  { q: 'What is Bookmark?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies imperdiet.' },
  { q: 'How can I request a new browser?', a: 'Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.' },
  { q: 'Is there a mobile app?', a: 'Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum urna vulputate eget.' },
  { q: 'What about other Chromium browsers?', a: 'Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui.' }
];

function App() {
  const [joinedCount, setJoinedCount] = useState(35000);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const modalShown = useRef(false);

  const openModal = () => {
    if (!modalShown.current) {
      modalShown.current = true;
      setShowModal(true);
    }
  };

  useEffect(() => {
    const start = performance.now();
    const interval = window.setInterval(() => {
      const elapsed = Math.min(performance.now() - start, 20000);
      setJoinedCount(Math.max(0, Math.ceil(35000 * (1 - elapsed / 20000))));
      if (elapsed >= 20000) window.clearInterval(interval);
    }, 50);
    const timer = window.setTimeout(() => {
      if (!modalShown.current) {
        modalShown.current = true;
        setShowModal(true);
      }
    }, 30000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

useEffect(() => {
  const handleMouseLeave = (event) => {
    if (!event.relatedTarget && event.clientY <= 0) {
      openModal();
    }
  };

  document.addEventListener('mouseout', handleMouseLeave);

  return () => {
    document.removeEventListener('mouseout', handleMouseLeave);
  };
}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(true);
    } else {
      setError(false);
      window.alert('Sukces! Zapisano do newslettera.');
      setEmail('');
    }
  };

  return (
    <div className="app">
      <header className={`header${menuOpen ? ' menu-is-open' : ''}`} id="top">
        <a href="#top" className="logo-container" aria-label="Bookmark home">
  {menuOpen ? (
    <span className="mobile-menu-brand">
      <span className="mobile-menu-brand-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M7 5h10v14l-5-3.5L7 19V5Z" fill="#30364f" />
        </svg>
      </span>
      <span>BOOKMARK</span>
    </span>
  ) : (
    <img src="/logo-bookmark.svg" alt="Bookmark Logo" />
  )}
</a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '×' : '☰'}
        </button>
        <nav id="mobile-navigation" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          <a href="#features" onClick={() => setMenuOpen(false)}>FEATURES</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>PRICING</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
          <button className="login-btn" type="button">LOGIN</button>
          <div className="mobile-social-icons">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/icon-facebook.svg" alt="" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src="/icon-twitter.svg" alt="" />
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>A Simple Bookmark Manager</h1>
              <p>A clean and simple interface to organize your favourite websites. Open a new browser tab and see your sites load instantly. Try it for free.</p>
              <div className="hero-buttons">
                <button className="btn-blue" type="button">Get it on Chrome</button>
                <button className="btn-gray" type="button">Get it on Firefox</button>
              </div>
            </div>
            <div className="hero-image-container">
              <img src="/illustration-hero.svg" alt="Hero Illustration" className="hero-img" />
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2>Features</h2>
          <p className="section-desc">Our aim is to make it quick and easy for you to access your favourite websites. Your bookmarks sync between your devices so you can access them on the go.</p>
          <div className="tabs">
            <button type="button" className={activeTab === 0 ? 'active' : ''} onClick={() => setActiveTab(0)}>Simple Bookmarking</button>
            <button type="button" className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>Speedy Searching</button>
            <button type="button" className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>Easy Sharing</button>
          </div>
          <div className="tab-content">
            <div className="tab-img-container">
              <img src={featuresData[activeTab].image} alt="Feature Illustration" className="feature-img" />
            </div>
            <div className="tab-text">
              <h3>{featuresData[activeTab].title}</h3>
              <p>{featuresData[activeTab].desc}</p>
              <button className="btn-blue" type="button" onClick={openModal}>More Info</button>
            </div>
          </div>
        </section>

        <section id="pricing" className="download-section">
          <h2>Download the extension</h2>
          <p className="section-desc">We’ve got more browsers in the pipeline. Please do let us know if you’ve got a favourite you’d like us to prioritize.</p>
          <div className="cards-grid">
            <div className="card">
              <img src="/logo-chrome.svg" alt="Chrome" className="browser-logo" />
              <h3>Add to Chrome</h3>
              <p>Minimum version 62</p>
              <img src="/bg-dots.svg" alt="" className="dots" />
              <button className="btn-blue" type="button">Add &amp; Install Extension</button>
            </div>
            <div className="card firefox">
              <img src="/logo-firefox.svg" alt="Firefox" className="browser-logo" />
              <h3>Add to Firefox</h3>
              <p>Minimum version 55</p>
              <img src="/bg-dots.svg" alt="" className="dots" />
              <button className="btn-blue" type="button">Add &amp; Install Extension</button>
            </div>
            <div className="card opera">
              <img src="/logo-opera.svg" alt="Opera" className="browser-logo" />
              <h3>Add to Opera</h3>
              <p>Minimum version 46</p>
              <img src="/bg-dots.svg" alt="" className="dots" />
              <button className="btn-blue" type="button">Add &amp; Install Extension</button>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <p className="section-desc">Here are some of our FAQs. If you have any other questions you’d like answered please feel free to email us.</p>
          <div className="faq-accordion">
            {faqData.map((item, idx) => (
              <div key={item.q} className="faq-item">
                <button type="button" className="faq-question" aria-expanded={openFaq === idx} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <span>{item.q}</span>
                  <img src="/icon-arrow.svg" alt="" className={openFaq === idx ? 'arrow-icon rotate' : 'arrow-icon'} />
                </button>
                {openFaq === idx && <div className="faq-answer">{item.a}</div>}
              </div>
            ))}
          </div>
          <button className="btn-blue faq-btn" type="button" onClick={openModal}>More Info</button>
        </section>
      </main>

      <footer id="contact" className={error ? 'footer error-form' : 'footer'}>
        <p className="joined-counter">{joinedCount.toLocaleString('en-US')}+ ALREADY JOINED</p>
        <h2>Stay up-to-date with what we’re doing</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <input type="email" placeholder="Enter your email address" value={email} onChange={(event) => { setEmail(event.target.value); if (error) setError(false); }} aria-label="Email address" aria-invalid={error} />
            {error && <img src="/icon-error.svg" alt="" className="error-icon" />}
            {error && <span className="error-msg">Whoops, make sure it's an email</span>}
          </div>
          <button type="submit" className="btn-red">Contact Us</button>
        </form>
      </footer>

      <div className="bottom-bar">
        <div className="bottom-bar-content">
        <a href="#top" className="bottom-brand" aria-label="Bookmark home">
  <span className="bottom-brand-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M7 5h10v14l-5-3.5L7 19V5Z" fill="white" />
    </svg>
  </span>
  <span>BOOKMARK</span>
</a>
          <nav className="bottom-nav" aria-label="Footer navigation">
            <a href="#features">FEATURES</a>
            <a href="#pricing">PRICING</a>
            <a href="#contact">CONTACT</a>
          </nav>
          <div className="social-icons">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="/icon-facebook.svg" alt="" width="23" height="23" /></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><img src="/icon-twitter.svg" alt="" width="23" height="23" /></a>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowModal(false); }}>
          <div className="modal-content" role="dialog" aria-modal="true" aria-label="Bookmark feature preview">
            <button className="modal-close" type="button" aria-label="Close preview" onClick={() => setShowModal(false)}>×</button>
            <img src={featuresData[1].image} alt="Speedy Searching preview" />
            <h3>{featuresData[1].title}</h3>
            <p>{featuresData[1].desc}</p>
            <button className="btn-blue" type="button" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
