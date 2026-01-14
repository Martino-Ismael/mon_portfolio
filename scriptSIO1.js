
// ==========================================
// 1. Animation au scroll   
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer toutes les sections et cartes
document.querySelectorAll('section, .info-card, .project-card, .motivation-item, .contact-card').forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
});

// ==========================================
// 2. Smooth scroll pour les ancres
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// 3. Effet de typing sur le titre 
// ==========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ==========================================
// 4. Bouton retour en haut
// ==========================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Retour en haut');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// 5. Animation des cartes au hover
// ==========================================
document.querySelectorAll('.project-card, .info-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==========================================
// 6. Compteur de temps avant le stage
// ==========================================
function updateCountdown() {
    const stageDate = new Date('2026-05-04');
    const now = new Date();
    const diff = stageDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const countdownEl = document.querySelector('.date-highlight span:last-child');
        if (countdownEl && days > 0) {
            const existingText = countdownEl.innerHTML;
            if (!existingText.includes('jours')) {
                countdownEl.innerHTML += ` <small style="opacity: 0.7;">(dans ${days} jours)</small>`;
            }
        }
    }
}
updateCountdown();


