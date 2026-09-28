// Traduction FR / EN commune a toutes les pages du portfolio.
//
// Chaque page definit window.SITE_I18N = { base: "fr" | "en", dict: { "texte source": "traduction" } }
// avant de charger ce script. Les textes de la page dont la version normalisee
// (espaces reduits) figure dans le dictionnaire sont traduits ; le reste ne change pas.
// La langue choisie est memorisee pour tout le site ; ?lang=en ou ?lang=fr dans
// l'URL la force (lien a envoyer a un recruteur anglophone).
(() => {
  const KEY = "site.lang";
  const cfg = window.SITE_I18N || { base: "fr", dict: {} };
  const base = cfg.base;
  const alt = base === "fr" ? "en" : "fr";
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch { return null; } },
    set(v) { try { localStorage.setItem(KEY, v); } catch { /* stockage indisponible */ } },
  };

  const texts = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const tag = n.parentNode && n.parentNode.nodeName;
      if (tag === "SCRIPT" || tag === "STYLE") return NodeFilter.FILTER_REJECT;
      return norm(n.nodeValue) in cfg.dict ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  while (walker.nextNode()) {
    const n = walker.currentNode, v = n.nodeValue;
    const lead = v.match(/^\s*/)[0], trail = v.match(/\s*$/)[0];
    texts.push({ n, src: v, dst: lead + cfg.dict[norm(v)] + trail });
  }
  const attrs = [];
  document.querySelectorAll("[aria-label], [title], [placeholder], meta[name='description']").forEach((el) => {
    ["aria-label", "title", "placeholder", "content"].forEach((a) => {
      const v = el.getAttribute(a);
      if (v && norm(v) in cfg.dict) attrs.push({ el, a, src: v, dst: cfg.dict[norm(v)] });
    });
  });

  function apply(lang) {
    const useAlt = lang === alt;
    texts.forEach((t) => { t.n.nodeValue = useAlt ? t.dst : t.src; });
    attrs.forEach((t) => t.el.setAttribute(t.a, useAlt ? t.dst : t.src));
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-switch [data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  }

  document.querySelectorAll(".lang-switch [data-lang]").forEach((b) =>
    b.addEventListener("click", () => { store.set(b.dataset.lang); apply(b.dataset.lang); }));

  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (fromUrl === "fr" || fromUrl === "en") store.set(fromUrl);
  apply(fromUrl === "fr" || fromUrl === "en" ? fromUrl : store.get() || "fr");
})();
