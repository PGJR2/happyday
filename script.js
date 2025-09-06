// Back to Top button — accessible, modern, and self‑contained
// Usage: save as back-to-top.js and include with <script src="back-to-top.js" defer></script>
// Works with your existing CSS tokens (e.g., --elev, --fg, --border, --shadow)

(() => {
  const ID = "backToTop";
  if (document.getElementById(ID)) return; // avoid duplicates

  const btn = document.createElement("button");
  btn.id = ID;
  btn.type = "button";
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.title = "Back to top";
  btn.tabIndex = -1; // not focusable while hidden

  // Simple arrow icon (inline SVG)
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 19V5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M6 11l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // Inject minimal styles so no CSS edits are required
  const style = document.createElement("style");
  style.textContent = `
    .back-to-top { position: fixed; bottom: 1.25rem; right: 1.25rem; z-index: 999; 
      display: grid; place-items: center; width: 44px; height: 44px;
      border-radius: 999px; border: 1px solid var(--border, #e5e7eb);
      background: var(--elev, #f8fafc); color: var(--fg, #0f172a);
      box-shadow: var(--shadow, 0 1px 2px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.06));
      opacity: 0; transform: translateY(8px); pointer-events: none;
      transition: opacity .2s ease, transform .2s ease;
    }
    .back-to-top:hover { transform: translateY(6px); }
    .back-to-top.is-visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
    @media (prefers-reduced-motion: reduce) { .back-to-top, .back-to-top:hover { transition: none; transform: none; } }
    @media print { .back-to-top { display: none !important; } }
  `;

  document.head.appendChild(style);
  document.body.appendChild(btn);

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const show = () => { btn.classList.add("is-visible"); btn.removeAttribute("aria-hidden"); btn.tabIndex = 0; };
  const hide = () => { btn.classList.remove("is-visible"); btn.setAttribute("aria-hidden", "true"); btn.tabIndex = -1; };

  const THRESHOLD = 300; // px scrolled before showing the button
  const onScroll = () => {
    (window.scrollY || window.pageYOffset) > THRESHOLD ? show() : hide();
  };

  // Initialize state and listeners
  hide();
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Click to scroll to top (respects reduced motion)
  btn.addEventListener("click", () => {
    if (prefersReducedMotion()) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
})();

