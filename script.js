/**
 * ===================================================================
 * PORTFOLIO JAVASCRIPT ENGINE
 * Handles preloader, ambient particles, custom cursor, 3D card tilt,
 * active scroll spying, interactive form, and profile hydration.
 * ===================================================================
 */

// User Configuration Object for Dheeraj
const PORTFOLIO_CONFIG = {
  name: "DHEERAJ",
  fullName: "Dheeraj",
  monogram: "DR",
  title: "Cybersecurity Specialist & Software Developer",
  tagline: "Bridging rapid AI-assisted development with robust cybersecurity practices.",
  roleBio: "Pursuing B.Tech in CSE (Cybersecurity Specialization) at VIT Vellore. Building resilient, efficient solutions at the intersection of security and modern software development using prompt-driven workflows and AI tools.",
  badgeText: "CYBERSECURITY & AI-DRIVEN DEVELOPMENT",
  email: "dheeraj.deepaksing2026@vitstudent.ac.in",
  location: "Vellore, Tamil Nadu, India",
  socials: {
    github: "https://github.com/DheerajRajput24",
    linkedin: "https://www.linkedin.com/in/dhiraj-rajput-90011a423/",
    twitter: "#"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initProfileData();
  initTextPressure();
  initPhilosophyScrollExpand();
  initPreloader();
  initAmbientParticles();
  initCustomCursor();
  initCardTilt();
  initNavigation();
  initContactForm();
  initBackToTop();
});

/**
 * Hydrates profile configuration into the DOM
 */
function initProfileData() {
  const nameEl = document.getElementById("heroName");
  const brandMonogram = document.querySelector(".brand-monogram");
  const heroTagline = document.getElementById("heroTagline");
  const heroBio = document.getElementById("heroBio");
  const heroBadge = document.getElementById("heroBadgeText");
  const contactEmail = document.getElementById("contactEmail");
  const contactLocation = document.getElementById("contactLocation");
  const footerBrand = document.getElementById("footerBrand");
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Update name if changed in config
  if (nameEl && PORTFOLIO_CONFIG.name !== "PORTFOLIO") {
    nameEl.innerHTML = "";
    nameEl.setAttribute("data-text", PORTFOLIO_CONFIG.name);
    PORTFOLIO_CONFIG.name.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.setAttribute("data-char", char);
      nameEl.appendChild(span);
    });
  }

  if (brandMonogram) brandMonogram.textContent = PORTFOLIO_CONFIG.monogram;
  if (heroTagline) heroTagline.textContent = PORTFOLIO_CONFIG.tagline;
  if (heroBio) heroBio.textContent = PORTFOLIO_CONFIG.roleBio;
  if (heroBadge) heroBadge.textContent = PORTFOLIO_CONFIG.badgeText;
  if (contactEmail) {
    contactEmail.textContent = PORTFOLIO_CONFIG.email;
    contactEmail.href = `mailto:${PORTFOLIO_CONFIG.email}`;
  }
  if (contactLocation) contactLocation.textContent = PORTFOLIO_CONFIG.location;
  if (footerBrand) footerBrand.textContent = PORTFOLIO_CONFIG.fullName || PORTFOLIO_CONFIG.name;

  const githubLink = document.getElementById("githubLink");
  const linkedinLink = document.getElementById("linkedinLink");
  if (githubLink && PORTFOLIO_CONFIG.socials.github && PORTFOLIO_CONFIG.socials.github !== "#") {
    githubLink.href = PORTFOLIO_CONFIG.socials.github;
  }
  if (linkedinLink && PORTFOLIO_CONFIG.socials.linkedin && PORTFOLIO_CONFIG.socials.linkedin !== "#") {
    linkedinLink.href = PORTFOLIO_CONFIG.socials.linkedin;
  }

  // Hydrate every GitHub icon and link across the page
  if (PORTFOLIO_CONFIG.socials.github && PORTFOLIO_CONFIG.socials.github !== "#") {
    document.querySelectorAll(".github-link, .badge-action, a[aria-label*='GitHub' i], a[title*='GitHub' i]").forEach((el) => {
      el.href = PORTFOLIO_CONFIG.socials.github;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
  }

  // Hydrate every LinkedIn icon and link across the page
  if (PORTFOLIO_CONFIG.socials.linkedin && PORTFOLIO_CONFIG.socials.linkedin !== "#") {
    document.querySelectorAll(".linkedin-link, a[aria-label*='LinkedIn' i], a[title*='LinkedIn' i]").forEach((el) => {
      el.href = PORTFOLIO_CONFIG.socials.linkedin;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
  }
}

/**
 * TextPressure Engine (Matching jishnumondal.vercel.app / ReactBits)
 * Dynamically modulates Roboto Flex variable font axes (wght, wdth, ital)
 * based on pointer distance and pressure zones.
 */
function initTextPressure() {
  const containerEl = document.getElementById("tpContainer");
  const titleEl = document.getElementById("heroName");
  if (!containerEl || !titleEl) return;

  const spans = titleEl.querySelectorAll("span");
  if (!spans.length) return;

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let isMouseActive = false;

  const dist = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getAttr = (distance, maxDist, minVal, maxVal) => {
    const val = maxVal - Math.abs((maxVal * distance) / maxDist);
    return Math.max(minVal, val + minVal);
  };

  const setSize = () => {
    if (!containerEl || !titleEl) return;
    const { width: containerW, height: containerH } = containerEl.getBoundingClientRect();
    const charsCount = spans.length || 7;

    let newFontSize = containerW / (charsCount / 2.3);
    newFontSize = Math.max(newFontSize, 42);

    titleEl.style.fontSize = `${newFontSize}px`;
    titleEl.style.lineHeight = "1";

    requestAnimationFrame(() => {
      const textRect = titleEl.getBoundingClientRect();
      if (textRect.height > 0 && containerH > 0) {
        const yRatio = containerH / textRect.height;
        const clampedY = Math.min(Math.max(yRatio, 0.9), 1.45);
        titleEl.style.transform = `scale(1, ${clampedY})`;
      }
    });
  };

  setSize();
  window.addEventListener("resize", setSize);

  const handlePointerMove = (e) => {
    cursor.x = e.clientX || (e.touches && e.touches[0].clientX) || cursor.x;
    cursor.y = e.clientY || (e.touches && e.touches[0].clientY) || cursor.y;
    isMouseActive = true;
  };

  window.addEventListener("mousemove", handlePointerMove);
  window.addEventListener("touchmove", handlePointerMove, { passive: true });

  document.addEventListener("mouseleave", () => {
    isMouseActive = false;
  });

  const animate = () => {
    if (isMouseActive) {
      mouse.x += (cursor.x - mouse.x) / 12; // inertia interpolation matching ReactBits
      mouse.y += (cursor.y - mouse.y) / 12;
    }

    if (titleEl) {
      const titleRect = titleEl.getBoundingClientRect();
      const maxDist = titleRect.width * 0.45;

      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const charCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };

        if (isMouseActive) {
          const d = dist(mouse, charCenter);

          // Variable font parameters from jishnumondal.vercel.app:
          // width: min 25, max 151
          // weight: min 100, max 900
          // italic: min 0, max 1
          const wdth = Math.floor(getAttr(d, maxDist, 25, 151));
          const wght = Math.floor(getAttr(d, maxDist, 100, 900));
          const italVal = getAttr(d, maxDist, 0, 1).toFixed(2);

          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

          // Dimmed when cursor is away, highlighted & ember glow when cursor is near
          const proximity = Math.max(0, 1 - d / maxDist);
          if (proximity > 0.52) {
            span.classList.add("tp-highlighted");
          } else {
            span.classList.remove("tp-highlighted");
          }
        } else {
          // Default resting state: slightly dimmed, thin, narrow
          span.style.fontVariationSettings = `'wght' 100, 'wdth' 35, 'ital' 0`;
          span.classList.remove("tp-highlighted");
        }
      });
    }

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}

/**
 * Philosophy Scroll Expand & Blur Interaction (Controlled Pinned Scroll)
 * Pinned at the Philosophy section: wheel scrolls drive the blur-off and statement reveal.
 * Once the photo is completely blurred off and the philosophy statement is clearly visible,
 * the next scroll allows the page to move up into the next section.
 */
function initPhilosophyScrollExpand() {
  const section = document.getElementById("about");
  const frame = document.getElementById("philosophyFrame");
  const media = document.getElementById("philosophyMedia");
  const scrim = document.getElementById("philosophyScrim");
  const title = document.getElementById("philosophyTitle");
  const hint = document.getElementById("philosophyHint");
  const overlay = document.getElementById("philosophyOverlay");

  if (!section || !frame || !media) return;

  const clamp = (val, min, max) => Math.max(min, Math.min(val, max));
  const smoothstep = (min, max, val) => {
    const x = clamp((val - min) / (max - min || 1e-6), 0, 1);
    return x * x * (3 - 2 * x);
  };

  let currentProgress = 0;
  let targetProgress = 0;
  let isAnimating = false;

  const render = (progress) => {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    const startW = isMobile ? 88 : isTablet ? 72 : 50;
    const startH = isMobile ? 56 : isTablet ? 60 : 62;
    const startR = isMobile ? 18 : isTablet ? 22 : 28;
    const endR = 0;

    // Phase 1: Expansion (0.0 -> 0.6)
    const expandP = clamp(progress / 0.6, 0, 1);
    const smoothExpand = smoothstep(0, 1, expandP);

    const w = startW + (100 - startW) * smoothExpand;
    const h = startH + (100 - startH) * smoothExpand;
    const insetX = Math.max(0, (100 - w) / 2);
    const insetY = Math.max(0, (100 - h) / 2);
    const r = startR + (endR - startR) * smoothExpand;

    frame.style.clipPath = `inset(${insetY.toFixed(3)}% ${insetX.toFixed(3)}% ${insetY.toFixed(3)}% ${insetX.toFixed(3)}% round ${r.toFixed(1)}px)`;

    // Media: zooms gently & blurs off completely into the background
    const scale = 1.3 - 0.22 * smoothExpand;
    const blurPx = (2 + progress * 22).toFixed(1);
    media.style.transform = `scale(${scale.toFixed(4)})`;
    media.style.filter = `blur(${blurPx}px)`;

    // Scrim: darkens and warms with vintage tone
    if (scrim) {
      const scrimVal = 0.3 + 0.5 * smoothExpand;
      scrim.style.opacity = scrimVal.toFixed(3);
    }

    // Title ("The Philosophy"): dissolves as user begins scrolling
    if (title) {
      const titleFade = smoothstep(0.04, 0.42, progress);
      title.style.opacity = (1 - titleFade).toFixed(3);
      title.style.transform = `translate3d(0, ${(-30 * titleFade).toFixed(1)}px, 0) scale(${(1 + 0.05 * titleFade).toFixed(3)})`;
    }

    // Hint ("Scroll to expand"): dissolves quickly
    if (hint) {
      const hintFade = smoothstep(0, 0.25, progress);
      hint.style.opacity = (1 - hintFade).toFixed(3);
      hint.style.transform = `translate3d(0, ${(14 * hintFade).toFixed(1)}px, 0)`;
    }

    // Philosophy Statement Overlay: reveals smoothly from 0.4 to 1.0, and stays 100% clearly visible!
    if (overlay) {
      const revealIn = smoothstep(0.4, 0.95, progress);
      const transY = (28 * (1 - revealIn)).toFixed(1);
      const blurIn = (6 * (1 - revealIn)).toFixed(1);

      overlay.style.opacity = revealIn.toFixed(3);
      overlay.style.transform = `translate3d(0, ${transY}px, 0)`;
      overlay.style.filter = `blur(${blurIn}px)`;
      overlay.style.pointerEvents = revealIn > 0.75 ? "auto" : "none";
    }
  };

  function stepAnimation() {
    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) > 0.001) {
      currentProgress += diff * 0.16;
      render(currentProgress);
      requestAnimationFrame(stepAnimation);
    } else {
      currentProgress = targetProgress;
      render(currentProgress);
      isAnimating = false;
    }
  }

  function requestAnimation() {
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(stepAnimation);
    }
  }

  // Initial render at progress = 0
  render(0);

  // Wheel listener: intercepts scrolling while inside the philosophy section
  window.addEventListener(
    "wheel",
    (e) => {
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;

      // In the zone when the section occupies the viewport
      const inZone = rect.top <= 12 && rect.bottom >= winH - 12;

      if (inZone) {
        if (e.deltaY > 0) {
          // Scrolling down: drive blur-off and reveal animation
          if (targetProgress < 1) {
            e.preventDefault();
            // Each scroll tick adds smooth increment (~5 ticks to full reveal)
            targetProgress = Math.min(1, targetProgress + Math.max(0.18, Math.abs(e.deltaY) * 0.0016));
            requestAnimation();
            return;
          }
          // When targetProgress is 1: photo is completely blurred off & statement is clearly visible.
          // Allow natural scroll to move the page up!
        } else if (e.deltaY < 0) {
          // Scrolling up: reverse back towards initial card before scrolling up to Hero
          if (targetProgress > 0) {
            e.preventDefault();
            targetProgress = Math.max(0, targetProgress - Math.max(0.18, Math.abs(e.deltaY) * 0.0016));
            requestAnimation();
            return;
          }
          // When targetProgress is 0: allow natural scroll back up into Hero!
        }
      }
    },
    { passive: false }
  );

  // Touch listener for mobile devices
  let touchStartY = 0;
  window.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;
      const inZone = rect.top <= 12 && rect.bottom >= winH - 12;

      if (inZone) {
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY;

        if (deltaY > 0 && targetProgress < 1) {
          e.preventDefault();
          targetProgress = Math.min(1, targetProgress + deltaY * 0.0035);
          touchStartY = currentY;
          requestAnimation();
        } else if (deltaY < 0 && targetProgress > 0) {
          e.preventDefault();
          targetProgress = Math.max(0, targetProgress + deltaY * 0.0035);
          touchStartY = currentY;
          requestAnimation();
        }
      }
    },
    { passive: false }
  );

  // Re-render on window resize
  window.addEventListener("resize", () => {
    render(currentProgress);
  });
}

/**
 * High-performance 0 -> 100% Preloader (2.5 seconds total)
 */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const countEl = document.getElementById("preloaderCount");
  const barEl = document.getElementById("preloaderBar");
  if (!preloader || !countEl || !barEl) return;

  const totalDuration = 2500; // Exactly 2.5 seconds overall
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / totalDuration, 1);
    
    // Smooth non-linear feel that accelerates slightly towards 100
    const currentCount = Math.floor(progress * 100);
    countEl.textContent = currentCount;
    barEl.style.width = `${progress * 100}%`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      countEl.textContent = "100";
      barEl.style.width = "100%";
      setTimeout(() => {
        preloader.classList.add("fade-out");
      }, 250);
    }
  }

  requestAnimationFrame(updateCounter);
}

/**
 * Atmospheric Floating Dust & Glow Particles on Canvas
 */
function initAmbientParticles() {
  const canvas = document.getElementById("ambientCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      isEmber: Math.random() > 0.65,
      alpha: Math.random() * 0.6 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

      if (p.isEmber) {
        ctx.fillStyle = `rgba(217, 93, 57, ${p.alpha * 0.75})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#D95D39";
      } else {
        ctx.fillStyle = `rgba(74, 48, 24, ${p.alpha * 0.35})`;
        ctx.shadowBlur = 0;
      }

      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/**
 * Custom Fluid Cursor
 */
function initCustomCursor() {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  renderRing();

  // Expand cursor on hoverable elements
  const hoverables = document.querySelectorAll(
    "a, button, input, textarea, [data-tilt], [data-magnetic]"
  );

  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

/**
 * 3D Perspective Card Tilt on Mouse Move
 */
function initCardTilt() {
  const cards = document.querySelectorAll("[data-tilt]");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}

/**
 * Navigation, Scroll Spying & Mobile Drawer
 */
function initNavigation() {
  const toggle = document.getElementById("mobileToggle");
  const drawer = document.getElementById("mobileDrawer");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      const isOpen = drawer.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        drawer.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active navigation link tracking via IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    { rootMargin: "-30% 0px -50% 0px" }
  );

  sections.forEach((sec) => observer.observe(sec));
}

/**
 * Contact Form Interactive Submission
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("submitBtnText");
  const toast = document.getElementById("formSuccessToast");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("formEmail").value.trim();
    const msg = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !msg) return;

    // Simulate sending state
    if (btnText) btnText.textContent = "Sending...";
    if (submitBtn) submitBtn.disabled = true;

    setTimeout(() => {
      if (btnText) btnText.textContent = "Message Sent!";
      if (toast) {
        toast.style.display = "block";
        setTimeout(() => {
          toast.style.display = "none";
          if (btnText) btnText.textContent = "Send Message";
          if (submitBtn) submitBtn.disabled = false;
        }, 4000);
      }
      form.reset();
    }, 1000);
  });
}

/**
 * Smooth Back-To-Top Trigger
 */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
