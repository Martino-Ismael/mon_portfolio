// Theme clair / sombre commun a toutes les pages du portfolio.
// Charge dans <head> (sans defer) pour appliquer le theme memorise avant
// l'affichage et eviter un flash. Sans choix memorise, le site suit le
// reglage de l'appareil (prefers-color-scheme). Les boutons .theme-toggle
// basculent le theme et le memorisent (cle "site.theme").
(() => {
  const KEY = "site.theme";
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  } catch { /* stockage indisponible */ }

  const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
  const sync = () => document.querySelectorAll(".theme-toggle").forEach((b) => b.setAttribute("aria-pressed", String(isDark())));

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".theme-toggle").forEach((b) => b.addEventListener("click", () => {
      const next = isDark() ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch { /* stockage indisponible */ }
      sync();
    }));
    sync();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", sync);
})();
