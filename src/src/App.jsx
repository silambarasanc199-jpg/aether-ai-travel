import { useEffect, useRef, useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDestination, setActiveDestination] = useState(null);

  const heroRef = useRef(null);
  const layersRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let animationFrame;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      setScrollProgress(Math.min(progress, 100));
    };

    const handleMouseMove = (event) => {
      mouseRef.current.x =
        event.clientX - window.innerWidth / 2;

      mouseRef.current.y =
        event.clientY - window.innerHeight / 2;
    };

    const animate = () => {
      const scrollY = window.scrollY;

      currentMouseRef.current.x +=
        (mouseRef.current.x -
          currentMouseRef.current.x) *
        0.05;

      currentMouseRef.current.y +=
        (mouseRef.current.y -
          currentMouseRef.current.y) *
        0.05;

      layersRef.current.forEach((layer) => {
        if (!layer) return;

        const speed = Number(layer.dataset.speed || 0.2);
        const section = layer.closest("section");

        if (!section) return;

        const rect = section.getBoundingClientRect();

        const sectionTop = rect.top + scrollY;
        const sectionHeight = rect.height;

        const visible =
          scrollY + window.innerHeight > sectionTop &&
          scrollY < sectionTop + sectionHeight;

        if (!visible) return;

        const relativeScroll =
          scrollY - sectionTop;

        const translateY =
          relativeScroll * speed * 0.18;

        const mouseX =
          currentMouseRef.current.x *
          speed *
          0.012;

        const mouseY =
          currentMouseRef.current.y *
          speed *
          0.008;

        layer.style.transform =
          `translate3d(${mouseX}px, ${translateY + mouseY}px, 0)`;
      });

      if (heroRef.current) {
        const heroContent =
          heroRef.current.querySelector(".hero-content");

        if (heroContent) {
          const mouseX =
            currentMouseRef.current.x * 0.008;

          const mouseY =
            currentMouseRef.current.y * 0.006;

          heroContent.style.transform =
            `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }
      }

      animationFrame =
        requestAnimationFrame(animate);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    handleScroll();

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const addLayer = (element) => {
    if (
      element &&
      !layersRef.current.includes(element)
    ) {
      layersRef.current.push(element);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const destinations = [
    {
      id: 1,
      name: "Silent Peaks",
      location: "NORTHERN VALLEY",
      description:
        "Mountain horizons, quiet clouds and landscapes built for slow exploration.",
    },
    {
      id: 2,
      name: "Golden Silence",
      location: "DESERT HORIZON",
      description:
        "Endless dunes where warm light, wind and open space create another world.",
    },
    {
      id: 3,
      name: "Ocean Light",
      location: "COASTAL EDGE",
      description:
        "A cinematic meeting point between the open sky and endless water.",
    },
  ];

  return (
    <div className="app">

      {/* SCROLL PROGRESS */}

      <div
        className="scroll-progress"
        aria-hidden="true"
      >
        <span
          style={{
            width: `${scrollProgress}%`,
          }}
        ></span>
      </div>

      {/* NAVIGATION */}

      <header className="navbar">
        <a
          href="#home"
          className="logo"
          onClick={closeMenu}
        >
          AETHER<span>.</span>
        </a>

        <nav
          className={
            menuOpen
              ? "nav-links open"
              : "nav-links"
          }
        >
          <a
            href="#experience"
            onClick={closeMenu}
          >
            Experience
          </a>

          <a
            href="#journey"
            onClick={closeMenu}
          >
            Journey
          </a>

          <a
            href="#discover"
            onClick={closeMenu}
          >
            Discover
          </a>
        </nav>

        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "×" : "☰"}
        </button>

        <a
          href="#discover"
          className="nav-button"
        >
          Explore
        </a>
      </header>

      <main>

        {/* HERO */}

        <section
          className="hero"
          id="home"
          ref={heroRef}
        >
          <div
            ref={addLayer}
            data-speed="0.12"
            className="hero-layer hero-back"
          ></div>

          <div
            ref={addLayer}
            data-speed="0.28"
            className="hero-layer hero-mid"
          ></div>

          <div
            ref={addLayer}
            data-speed="0.68"
            className="hero-layer hero-front"
          ></div>

          <div className="hero-content">
            <p className="eyebrow">
              AI-POWERED TRAVEL EXPERIENCE
            </p>

            <h1>
              BEYOND
              <span>THE HORIZON</span>
            </h1>

            <p className="hero-description">
              Discover extraordinary destinations through
              intelligent recommendations, immersive visuals,
              and a journey designed around you.
            </p>

            <a
              href="#experience"
              className="primary-button"
            >
              Begin the Journey
              <span>↓</span>
            </a>
          </div>

          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>

          <div className="scroll-hint">
            <span>SCROLL TO EXPLORE</span>
            <i></i>
          </div>
        </section>

        {/* EXPERIENCE */}

        <section
          className="experience section"
          id="experience"
        >
          <div className="reveal">
            <p className="section-label">
              01 / EXPERIENCE
            </p>

            <h2>
              Travel should feel
              <em>extraordinary.</em>
            </h2>

            <p className="section-description">
              AETHER combines immersive parallax interaction
              with intelligent travel discovery to transform
              the way you explore new places.
            </p>
          </div>

          <div className="depth-indicator reveal">
            <span className="depth-dot"></span>
            <span>DEPTH ENGINE ACTIVE</span>
            <span className="depth-line"></span>
          </div>

          <div className="feature-grid">

            <article
              className="feature-card reveal"
              data-depth="background"
            >
              <span>01</span>

              <h3>Depth</h3>

              <p>
                Layered visual elements move at different
                speeds to create a realistic sense of distance.
              </p>

              <small>
                BACKGROUND LAYER
              </small>
            </article>

            <article
              className="feature-card reveal"
              data-depth="midground"
            >
              <span>02</span>

              <h3>Intelligence</h3>

              <p>
                AI-powered recommendations help travellers
                discover destinations based on their interests.
              </p>

              <small>
                MIDGROUND LAYER
              </small>
            </article>

            <article
              className="feature-card reveal"
              data-depth="foreground"
            >
              <span>03</span>

              <h3>Discovery</h3>

              <p>
                Explore destinations through an interactive
                and visually rich travel experience.
              </p>

              <small>
                FOREGROUND LAYER
              </small>
            </article>

          </div>
        </section>

        {/* JOURNEY */}

        <section
          className="journey section"
          id="journey"
        >
          <div
            ref={addLayer}
            data-speed="0.18"
            className="journey-glow"
          ></div>

          <div className="journey-content reveal">
            <p className="section-label">
              02 / THE JOURNEY
            </p>

            <h2>
              Find beauty
              <em>between places.</em>
            </h2>

            <p className="section-description">
              From quiet mountain valleys to golden deserts
              and endless coastlines, every destination tells
              a different story.
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

          <div
            ref={addLayer}
            data-speed="0.58"
            className="planet"
          >
            <div className="planet-ring"></div>
            <div className="planet-surface"></div>
            <div className="planet-glow"></div>
          </div>
        </section>

        {/* DISCOVER */}

        <section
          className="discover section"
          id="discover"
        >
          <div className="reveal">
            <p className="section-label">
              03 / DISCOVER
            </p>

            <h2>
              Three places.
              <em>One adventure.</em>
            </h2>
          </div>

          <div className="destination-grid">

            {destinations.map(
              (destination, index) => (
                <article
                  key={destination.id}
                  className={`destination-card destination-${index + 1} reveal`}
                  onMouseMove={(event) => {
                    if (window.innerWidth < 800) return;

                    const card =
                      event.currentTarget;

                    const rect =
                      card.getBoundingClientRect();

                    const x =
                      event.clientX -
                      rect.left;

                    const y =
                      event.clientY -
                      rect.top;

                    const rotateY =
                      ((x - rect.width / 2) /
                        rect.width) *
                      5;

                    const rotateX =
                      ((y - rect.height / 2) /
                        rect.height) *
                      -5;

                    card.style.transform =
                      `perspective(1000px)
                       rotateX(${rotateX}deg)
                       rotateY(${rotateY}deg)
                       translateY(-10px)`;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform =
                      "";
                  }}
                >
                  <span>
                    0{destination.id} /{" "}
                    {destination.location}
                  </span>

                  <h3>
                    {destination.name
                      .split(" ")
                      .map((word, wordIndex) => (
                        <span
                          key={wordIndex}
                        >
                          {word}
                          {wordIndex === 0 && (
                            <br />
                          )}
                        </span>
                      ))}
                  </h3>

                  <p>
                    {destination.description}
                  </p>

                  <button
                    onClick={() =>
                      setActiveDestination(
                        destination
                      )
                    }
                  >
                    Explore Destination →
                  </button>
                </article>
              )
            )}

          </div>
        </section>

        {/* TECHNICAL DEPTH SECTION */}

        <section className="depth-section">
          <div
            ref={addLayer}
            data-speed="0.15"
            className="depth-bg"
          ></div>

          <div
            ref={addLayer}
            data-speed="0.4"
            className="depth-mid"
          ></div>

          <div
            ref={addLayer}
            data-speed="0.75"
            className="depth-front"
          ></div>

          <div className="depth-content reveal">
            <p className="section-label">
              04 / THE DEPTH ENGINE
            </p>

            <h2>
              Three layers.
              <em>One experience.</em>
            </h2>

            <p>
              AETHER creates depth by moving independent
              visual layers at different speeds as the user
              scrolls through the page.
            </p>

            <div className="layer-demo">
              <span>BACKGROUND</span>
              <span>MIDGROUND</span>
              <span>FOREGROUND</span>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}

        <section className="final-section">
          <div className="final-stars"></div>

          <p className="eyebrow">
            YOUR JOURNEY STARTS HERE
          </p>

          <h2>
            Don't just
            <em>look ahead.</em>
            Go there.
          </h2>

          <a
            href="#home"
            className="primary-button"
          >
            Return to Horizon
            <span>↑</span>
          </a>
        </section>

      </main>

      {/* FOOTER */}

      <footer>
        <strong>
          AETHER<span>.</span>
        </strong>

        <p>
          AI-powered immersive travel experience.
        </p>

        <small>
          © 2026 AETHER
        </small>
      </footer>

      {/* DESTINATION MODAL */}

      {activeDestination && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setActiveDestination(null)
          }
        >
          <div
            className="destination-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setActiveDestination(null)
              }
              aria-label="Close destination"
            >
              ×
            </button>

            <p className="section-label">
              {activeDestination.location}
            </p>

            <h2>
              {activeDestination.name}
            </h2>

            <p>
              {activeDestination.description}
            </p>

            <div className="modal-info">
              <span>AI DISCOVERY</span>
              <span>MAP READY</span>
              <span>EXPLORE MORE</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
