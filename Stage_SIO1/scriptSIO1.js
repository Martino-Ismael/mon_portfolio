// Année du footer
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Respect du mode "mouvement réduit"
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Effet "machine à écrire" sur la ligne de terminal du hero,
// suivi d'un révélé du titre/sous-titre/badge
const typedCmd = document.getElementById('typedCmd');
const revealEls = document.querySelectorAll('.hero-reveal');

function showHeroContent() {
  revealEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('show'), i * 130);
  });
}

if (typedCmd) {
  if (reduceMotion) {
    showHeroContent();
  } else {
    const fullText = typedCmd.textContent;
    typedCmd.textContent = '';
    let i = 0;
    (function typeChar() {
      if (i < fullText.length) {
        typedCmd.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeChar, 38);
      } else {
        showHeroContent();
      }
    })();
  }
} else {
  showHeroContent();
}

// Bouton retour en haut
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}