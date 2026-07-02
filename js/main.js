// AZION — shared client scripts (nav, cursor, reveal, counters, testimonials, contact form)
(function () {
  // ---- Inject shared navbar & footer ----
  const path = location.pathname.split("/").pop() || "index.html";
  const active = (href) => (href === path ? "active" : "");

  const navHTML = `
  <header class="nav" id="nav">
    <div class="nav-inner">
      <a href="index.html" class="brand">
        <img src="logo.png" alt="AZION logo" class="brand-logo" />
      </a>
      <ul class="nav-links">
        <li><a href="index.html" class="${active("index.html")}">Home</a></li>
        <li><a href="about.html" class="${active("about.html")}">About</a></li>
        <li><a href="services.html" class="${active("services.html")}">Services</a></li>
        <li><a href="industries.html" class="${active("industries.html")}">Industries</a></li>
        <li><a href="process.html" class="${active("process.html")}">Process</a></li>
        <li><a href="why-azion.html" class="${active("why-azion.html")}">Why AZION</a></li>
        <li><a href="contact.html" class="${active("contact.html")}">Contact</a></li>
      </ul>
      <div style="display:flex;align-items:center;gap:12px;">
        <a href="contact.html" class="nav-cta">Get Started</a>
        <button class="nav-toggle" id="navToggle" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
        </button>
      </div>
    </div>
    <div class="nav-mobile" id="navMobile">
      <ul>
        <li><a href="index.html" class="${active("index.html")}">Home</a></li>
        <li><a href="about.html" class="${active("about.html")}">About</a></li>
        <li><a href="services.html" class="${active("services.html")}">Services</a></li>
        <li><a href="industries.html" class="${active("industries.html")}">Industries</a></li>
        <li><a href="process.html" class="${active("process.html")}">Process</a></li>
        <li><a href="why-azion.html" class="${active("why-azion.html")}">Why AZION</a></li>
        <li><a href="contact.html" class="${active("contact.html")}">Contact</a></li>
      </ul>
    </div>
  </header>`;

  const footerHTML = `
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <div class="brand" style="color:white;">
          <span class="brand-mark">A</span><span>AZION</span>
        </div>
        <p style="margin-top:16px;max-width:400px;">Bangalore-based Recruitment and Human Resources Services company specialising in international recruitment and workforce solutions.</p>
        <form class="newsletter" onsubmit="event.preventDefault();this.querySelector('button').textContent='Subscribed';">
          <input type="email" placeholder="Your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="process.html">Process</a></li>
          <li><a href="why-azion.html">Why AZION</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="services.html">Services</a></li>
          <li><a href="industries.html">Industries</a></li>
          <li><a href="index.html">Home</a></li>
        </ul>
      </div>
      <div>
        <h4>Connect</h4>
        <div class="socials">
          <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8h4.52V24H.24V8zM8.32 8h4.33v2.19h.06c.6-1.13 2.07-2.32 4.26-2.32 4.55 0 5.39 3 5.39 6.9V24h-4.5v-7.28c0-1.74-.03-3.97-2.42-3.97-2.42 0-2.8 1.89-2.8 3.85V24h-4.5V8z"/></svg></a>
          <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.522 7.457L22 22h-6.828l-5.36-6.83L3.5 22H.744l6.98-7.98L1 2h7.008l4.828 6.29L18.244 2zm-2.4 18h1.68L6.24 3.88H4.44L15.844 20z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.16 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg></a>
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.69 4.54-4.69 1.32 0 2.7.24 2.7.24v2.97h-1.52c-1.5 0-1.96.93-1.96 1.89v2.26h3.34l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© <span id="yr"></span> AZION. All rights reserved.</div>
      <div>Your Global Workforce Partner</div>
    </div>
  </footer>`;

  const navMount = document.getElementById("nav-mount");
  if (navMount) navMount.outerHTML = navHTML;
  const footerMount = document.getElementById("footer-mount");
  if (footerMount) footerMount.outerHTML = footerHTML;
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- Nav interactions ----
  const nav = document.getElementById("nav");
  const onScroll = () => { if (nav) nav.classList.toggle("scrolled", window.scrollY > 24); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => mobile.classList.toggle("open"));
  }

  // ---- Custom cursor (desktop only) ----
  if (window.matchMedia("(pointer: fine)").matches) {
    const c = document.createElement("div"); c.className = "cursor";
    const d = document.createElement("div"); d.className = "cursor-dot";
    document.body.appendChild(c); document.body.appendChild(d);
    let x = 0, y = 0, cx = 0, cy = 0;
    document.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px, ${y}px)`; });
    const raf = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      c.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(raf);
    }; raf();
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("a, button, .card, input, textarea")) c.classList.add("hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("a, button, .card, input, textarea")) c.classList.remove("hover");
    });
  }

  // ---- Reveal on scroll ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ---- Counters ----
  const cIo = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const to = parseInt(el.dataset.to, 10);
      const suf = el.dataset.suffix || "";
      const dur = 1600;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * to).toLocaleString() + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cIo.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-to]").forEach((el) => cIo.observe(el));

  // ---- Testimonials ----
  const slides = document.querySelectorAll(".quote-card[data-idx]");
  const dots = document.querySelectorAll(".dots [data-idx]");
  if (slides.length) {
    let i = 0;
    const show = (n) => {
      slides.forEach((s) => s.style.display = "none");
      dots.forEach((d) => d.classList.remove("active"));
      slides[n].style.display = "block";
      if (dots[n]) dots[n].classList.add("active");
      i = n;
    };
    show(0);
    dots.forEach((d, k) => d.addEventListener("click", () => show(k)));
    setInterval(() => show((i + 1) % slides.length), 5000);
  }

  // ---- Contact form ----
  const cf = document.getElementById("contactForm");
  if (cf) {
    cf.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = cf.querySelector("button[type=submit]");
      btn.innerHTML = "Thanks — we'll be in touch";
    });
  }

  // ---- Countries map hover ----
  document.querySelectorAll(".pin").forEach((p) => {
    const label = p.querySelector(".pin-label");
    p.addEventListener("mouseenter", () => { if (label) label.setAttribute("opacity", "1"); });
    p.addEventListener("mouseleave", () => { if (label) label.setAttribute("opacity", "0"); });
  });
})();

