// AZION PageLoader — vanilla JS port of the provided React component.
// Requires GSAP loaded from CDN before this script.
(function () {
  function init() {
    const root = document.getElementById("page-loader");
    if (!root || !window.gsap) return;
    document.body.classList.add("is-loading");

    const path = root.querySelector(".flight-path");
    const glowPath = root.querySelector(".flight-glow");
    const plane = root.querySelector(".plane-group");
    const mapEl = root.querySelector(".loader-map");
    if (!path || !plane) return;

    const length = path.getTotalLength();
    gsap.set([path, glowPath], { strokeDasharray: length, strokeDashoffset: length });

    const setPlaneTransform = (x, y, angle) => {
      plane.setAttribute(
        "transform",
        `translate(${x}, ${y}) rotate(${angle}) scale(0.045) translate(-256, -256)`
      );
    };

    const startPoint = path.getPointAtLength(0);
    const nextInit = path.getPointAtLength(2);
    const angleInit = Math.atan2(nextInit.y - startPoint.y, nextInit.x - startPoint.x) * (180 / Math.PI);
    setPlaneTransform(startPoint.x, startPoint.y, angleInit);
    gsap.set(plane, { opacity: 1 });

    let pi = 0;
    const spawnParticle = (x, y) => {
      const el = document.getElementById(`loader-particle-${pi}`);
      if (el) {
        gsap.killTweensOf(el);
        gsap.set(el, { x, y, scale: Math.random() * 0.4 + 0.6, opacity: 0.8 });
        gsap.to(el, {
          x: x - (Math.random() * 25 + 15),
          y: y + (Math.random() * 12 - 6),
          scale: 0.1, opacity: 0, duration: 0.85, ease: "power2.out",
        });
      }
      pi = (pi + 1) % 15;
    };

    const flight = { progress: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        root.style.display = "none";
      },
    });

    tl.fromTo(".loader-text-1", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.65 }, 0.2)
      .to(".loader-text-1", { opacity: 0, y: -15, duration: 0.45 }, 1.1)
      .fromTo(".loader-text-2", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.65 }, 1.3)
      .to(".loader-text-2", { opacity: 0, y: -15, duration: 0.45 }, 2.2)
      .fromTo(".loader-text-3", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7 }, 2.4);

    tl.to(flight, {
      progress: 1, duration: 3.0, ease: "power2.inOut",
      onUpdate: () => {
        const cur = Math.min(flight.progress * length, length);
        const p = path.getPointAtLength(cur);
        const offset = length - cur;
        gsap.set(path, { strokeDashoffset: offset });
        gsap.set(glowPath, { strokeDashoffset: offset });
        const n = path.getPointAtLength(Math.min(cur + 2, length));
        const angle = Math.atan2(n.y - p.y, n.x - p.x) * (180 / Math.PI);
        setPlaneTransform(p.x, p.y, angle);
        if (Math.random() < 0.4) spawnParticle(p.x, p.y);
      },
    }, 0.1);

    tl.fromTo(".marker-dxb-ring",
      { scale: 0.7, opacity: 0, transformOrigin: "center" },
      { scale: 2.2, opacity: 0, duration: 1.1, repeat: -1, ease: "power1.out", transformOrigin: "center" }, 1.4);

    tl.to(".marker-dxb-dot", {
      scale: 2.5, fill: "#8EC5FF", filter: "drop-shadow(0 0 10px #8EC5FF)",
      duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out", transformOrigin: "center",
    }, 3.1);

    tl.call(() => {
      document.body.classList.remove("is-loading");
      window.dispatchEvent(new CustomEvent("loader-complete"));
    }, null, 3.15);

    tl.to(".loader-bg", { opacity: 0, duration: 0.85, ease: "power3.inOut" }, 3.15);
    tl.to(".loader-map-bg", { opacity: 0, duration: 0.5, ease: "power3.out" }, 3.15);
    tl.to(".loader-text-3", { opacity: 0, y: -15, duration: 0.5, ease: "power3.in" }, 3.25);
    tl.to(mapEl, { scale: 1.1, opacity: 0, duration: 0.7, ease: "power3.inOut" }, 3.15);
    tl.to(root, { opacity: 0, duration: 0.6, ease: "power3.inOut" }, 3.4);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
