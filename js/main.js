(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  const active = (href) => (href === path ? "active" : "");
  const onHome = path === "index.html" || path === "";

  const navHTML = `
  <header class="nav" id="nav">
    <div class="nav-inner">
      <a href="index.html" class="brand" aria-label="AZION home">
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
        <a href="index.html" class="brand"><img src="logo.png" alt="AZION logo" class="brand-logo" /></a>
        <p style="margin-top:16px;max-width:420px;">Bangalore-based recruitment and workforce solutions for companies building global teams with precision, compliance, and long-term trust.</p>
        <form class="newsletter" onsubmit="event.preventDefault();this.querySelector('button').textContent='Subscribed';">
          <input type="email" placeholder="Your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div><h4>Company</h4><ul><li><a href="about.html">About</a></li><li><a href="process.html">Process</a></li><li><a href="why-azion.html">Why AZION</a></li><li><a href="contact.html">Contact</a></li></ul></div>
      <div><h4>Explore</h4><ul><li><a href="services.html">Services</a></li><li><a href="industries.html">Industries</a></li><li><a href="index.html">Home</a></li></ul></div>
      <div><h4>Connect</h4><div class="socials"><a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8h4.52V24H.24V8zM8.32 8h4.33v2.19h.06c.6-1.13 2.07-2.32 4.26-2.32 4.55 0 5.39 3 5.39 6.9V24h-4.5v-7.28c0-1.74-.03-3.97-2.42-3.97-2.42 0-2.8 1.89-2.8 3.85V24h-4.5V8z"/></svg></a><a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.522 7.457L22 22h-6.828l-5.36-6.83L3.5 22H.744l6.98-7.98L1 2h7.008l4.828 6.29L18.244 2zm-2.4 18h1.68L6.24 3.88H4.44L15.844 20z"/></svg></a><a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.16 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg></a></div></div>
    </div>
    <div class="footer-bottom"><div>&copy; <span id="yr"></span> AZION. All rights reserved.</div><div>Your Global Workforce Partner</div></div>
  </footer>`;

  const navMount = document.getElementById("nav-mount");
  if (navMount) navMount.outerHTML = navHTML;
  const footerMount = document.getElementById("footer-mount");
  if (footerMount) footerMount.outerHTML = footerHTML;
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  document.body.classList.add("page-enter");
  requestAnimationFrame(() => document.body.classList.add("page-ready"));

  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  const nav = document.getElementById("nav");
  const navMobile = document.getElementById("navMobile");
  const navToggle = document.getElementById("navToggle");
  if (navToggle && navMobile) {
    navToggle.addEventListener("click", () => navMobile.classList.toggle("open"));
    navMobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => navMobile.classList.remove("open")));
  }

  const updateProgress = () => {
    const top = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, top / max)})`;
    if (nav) nav.classList.toggle("scrolled", top > 24);
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  document.querySelectorAll("a[href$='.html']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href === path || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      document.body.classList.add("page-leave");
      setTimeout(() => { window.location.href = href; }, 220);
    });
  });

  if (window.matchMedia("(pointer:fine)").matches) {
    const c = document.createElement("div");
    const d = document.createElement("div");
    c.className = "cursor";
    d.className = "cursor-dot";
    document.body.append(c, d);
    let x = 0, y = 0, cx = 0, cy = 0;
    document.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px,${y}px)`; });
    const raf = () => { cx += (x - cx) * 0.18; cy += (y - cy) * 0.18; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(raf); };
    raf();
    document.addEventListener("mouseover", (e) => { if (e.target.closest("a,button,.card,input,textarea,.quote-card,.step-card")) c.classList.add("hover"); });
    document.addEventListener("mouseout", (e) => { if (e.target.closest("a,button,.card,input,textarea,.quote-card,.step-card")) c.classList.remove("hover"); });
  }

  document.querySelectorAll(".section-head").forEach((el) => el.classList.add("reveal-heading"));
  document.querySelectorAll(".about-visual,.contact-grid > :first-child").forEach((el) => el.classList.add("reveal-left"));
  document.querySelectorAll(".hero-visual,.contact-grid > :last-child").forEach((el) => el.classList.add("reveal-right"));
  document.querySelectorAll(".card,.step-card,.quote-card,.stat,.step,.contact-info li").forEach((el, i) => {
    if (!el.className.includes("reveal")) el.classList.add("reveal-scale");
    el.style.setProperty("--reveal-delay", `${(i % 6) * 70}ms`);
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-heading");
  if (!reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  const cIo = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const to = parseInt(el.dataset.to || "0", 10);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      const duration = 1600;
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(to * eased).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cIo.unobserve(el);
    });
  }, { threshold: 0.45 });
  document.querySelectorAll("[data-to]").forEach((el) => cIo.observe(el));

  const slides = [...document.querySelectorAll(".quote-card[data-idx]")];
  const dots = [...document.querySelectorAll(".dots [data-idx]")];
  if (slides.length) {
    let current = 0;
    const show = (n) => {
      slides.forEach((s, i) => { s.style.display = i === n ? "block" : "none"; });
      dots.forEach((d, i) => d.classList.toggle("active", i === n));
      current = n;
    };
    show(0);
    dots.forEach((d, i) => d.addEventListener("click", () => show(i)));
    setInterval(() => show((current + 1) % slides.length), 5000);
  }

  const cf = document.getElementById("contactForm");
  if (cf) cf.addEventListener("submit", (e) => { e.preventDefault(); const btn = cf.querySelector("button[type='submit']"); if (btn) btn.innerHTML = "Thanks, we'll be in touch"; });

  document.querySelectorAll(".pin").forEach((p) => {
    const label = p.querySelector(".pin-label");
    p.addEventListener("mouseenter", () => label && label.setAttribute("opacity", "1"));
    p.addEventListener("mouseleave", () => label && label.setAttribute("opacity", "0"));
  });

  if (onHome) {
    const map = [
      ["hero", "index.html"],
      ["about", "about.html"],
      ["services-preview", "services.html"],
      ["process-preview", "process.html"],
      ["why-preview", "why-azion.html"],
      ["testimonials", "contact.html"]
    ];
    const links = [...document.querySelectorAll(".nav-links a, .nav-mobile a")];
    const sections = map.map(([id, href]) => ({ el: document.getElementById(id), href })).filter((x) => x.el);
    const spy = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const href = sections.find((s) => s.el === visible.target)?.href;
      if (!href) return;
      links.forEach((link) => link.classList.toggle("active-scroll", link.getAttribute("href") === href));
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: "-20% 0px -45% 0px" });
    sections.forEach((section) => spy.observe(section.el));
  }
})();
