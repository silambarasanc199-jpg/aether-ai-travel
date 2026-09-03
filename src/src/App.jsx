import { useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="logo">
          AETHER<span>.</span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#experience" onClick={() => setMenuOpen(false)}>
            Experience
          </a>
          <a href="#journey" onClick={() => setMenuOpen(false)}>
            Journey
          </a>
          <a href="#discover" onClick={() => setMenuOpen(false)}>
            Discover
          </a>
        </nav>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <a href="#discover" className="nav-button">
          Explore
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-layer hero-back"></div>
          <div className="hero-layer hero-mid"></div>
          <div className="hero-layer hero-front"></div>

          <div className="hero-content">
            <p className="eyebrow">AI-POWERED TRAVEL EXPERIENCE</p>

            <h1>
              BEYOND
              <span>THE HORIZON</span>
            </h1>

            <p className="hero-description">
              Discover extraordinary destinations through intelligent
              recommendations, immersive visuals, and a journey designed
              around you.
            </p>

            <a href="#experience" className="primary-button">
              Begin the Journey <span>↓</span>
            </a>
          </div>

          <div className="scroll-hint">
            <span>SCROLL TO EXPLORE</span>
            <i></i>
          </div>
        </section>

        <section className="experience section" id="experience">
          <p className="section-label">01 / EXPERIENCE</p>

          <h2>
            Travel should feel
            <em>extraordinary.</em>
          </h2>

          <p className="section-description">
            AETHER combines immersive parallax interaction with intelligent
            travel discovery to transform the way you explore new places.
          </p>

          <div className="feature-grid">
            <article className="feature-card">
              <span>01</span>
              <h3>Depth</h3>
              <p>
                Layered visual elements move at different speeds to create
                realistic depth while scrolling.
              </p>
            </article>

            <article className="feature-card">
              <span>02</span>
              <h3>Intelligence</h3>
              <p>
                AI-powered recommendations help travellers discover places
                based on their interests.
              </p>
            </article>

            <article className="feature-card">
              <span>03</span>
              <h3>Discovery</h3>
              <p>
                Explore destinations through an interactive and visually rich
                travel experience.
              </p>
            </article>
          </div>
        </section>

        <section className="journey section" id="journey">
          <div className="journey-content">
            <p className="section-label">02 / THE JOURNEY</p>

            <h2>
              Find beauty
              <em>between places.</em>
            </h2>

            <p className="section-description">
              From quiet mountain valleys to golden deserts and endless
              coastlines, every destination tells a different story.
            </p>

            <div className="stats">
              <div>
                <strong>03</strong>
                <span>Destinations</span>
              </div>

              <div>
                <strong>AI</strong>
                <span>Powered</span>
              </div>

              <div>
                <strong>∞</strong>
                <span>Possibilities</span>
              </div>
            </div>
          </div>

          <div className="planet">
            <div className="planet-ring"></div>
            <div className="planet-surface"></div>
          </div>
        </section>

        <section className="discover section" id="discover">
          <p className="section-label">03 / DISCOVER</p>

          <h2>
            Three places.
            <em>One adventure.</em>
          </h2>

          <div className="destination-grid">
            <article className="destination-card valley">
              <span>01 / NORTHERN VALLEY</span>
              <h3>Silent<br />Peaks</h3>
              <p>Mountains, clouds and quiet horizons.</p>
              <button>Discover →</button>
            </article>

            <article className="destination-card desert">
              <span>02 / DESERT HORIZON</span>
              <h3>Golden<br />Silence</h3>
              <p>Endless dunes shaped by wind and light.</p>
              <button>Discover →</button>
            </article>

            <article className="destination-card ocean">
              <span>03 / COASTAL EDGE</span>
              <h3>Ocean<br />Light</h3>
              <p>Where the open sky meets endless water.</p>
              <button>Discover →</button>
            </article>
          </div>
        </section>

        <section className="final-section">
          <p className="eyebrow">YOUR JOURNEY STARTS HERE</p>

          <h2>
            Don't just
            <em>look ahead.</em>
            Go there.
          </h2>

          <a href="#home" className="primary-button">
            Return to Horizon <span>↑</span>
          </a>
        </section>
      </main>

      <footer>
        <strong>
          AETHER<span>.</span>
        </strong>

        <p>AI-powered immersive travel experience.</p>

        <small>© 2026 AETHER</small>
      </footer>
    </div>
  );
}

export default App;
