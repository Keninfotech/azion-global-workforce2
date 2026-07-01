# AZION — Overseas Recruitment & Workforce Solutions

Static, multi-page HTML / CSS / JavaScript version of the AZION corporate website.

## Run it

No build step. Open `index.html` directly in a browser, or serve the folder:

```
# Any tiny static server works, e.g.
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure

```
azion-html/
├── index.html              Home (with cinematic PageLoader)
├── about.html              About / Mission / Vision / Stats
├── services.html           Recruitment services + workforce solutions
├── industries.html         Industries served + global reach map
├── process.html            9-step recruitment process
├── why-azion.html          Value props + testimonials
├── contact.html            Contact info + inquiry form
├── css/
│   └── styles.css          Full design system (tokens, layout, components, animations)
└── js/
    ├── loader.js           GSAP-powered PageLoader (Bangalore → Dubai flight)
    └── main.js             Shared nav + footer injection, cursor, reveal,
                            counters, testimonials slider, form handler
```

## Notes

- **Fonts**: Poppins + Inter loaded from Google Fonts.
- **Icons**: Inline SVG (Lucide-style strokes) — no icon-font dependency.
- **Images**: Royalty-free Unsplash URLs (no local binaries).
- **Animations**: GSAP is loaded from CDN for the loader only; all other
  motion uses vanilla CSS / IntersectionObserver.
- **Loader**: Only mounts on `index.html`. Ported 1:1 from the supplied
  `PageLoader.jsx` (same paths, markers, timeline, particles).
- **Nav & footer**: Rendered client-side by `main.js` into
  `<div id="nav-mount">` / `<div id="footer-mount">`, so every page shares
  identical navigation and the active link is highlighted automatically.

## Colors

```
--navy-deep:   #0B1F3A
--brand-blue:  #2D7FF9
--brand-blue-glow: #6BA6FF
--brand-orange: #F7941D
--mist:        #F5F7FB
```
