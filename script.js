// Futuristic Typewriter for Home Subtitle
const phrases = [
    "Your next mobile journey starts here.",
    "Cutting-edge technology. Modern experience.",
    "Gaming, gadgets & innovation await.",
    "Shop the future, today.",
    "Discover. Experience. Elevate."
];
let typeIndex = 0, charIndex = 0, isDeleting = false;

function typeDynamicText() {
    const el = document.getElementById('dynamic-text');
    if (!el) return;
    const phrase = phrases[typeIndex];
    if (isDeleting) {
        el.textContent = phrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        el.textContent = phrase.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === phrase.length) {
        setTimeout(() => { isDeleting = true; typeDynamicText(); }, 1600);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeIndex = (typeIndex + 1) % phrases.length;
        setTimeout(typeDynamicText, 350);
    } else {
        setTimeout(typeDynamicText, isDeleting ? 30 : 65);
    }
}
window.addEventListener('DOMContentLoaded', typeDynamicText);

// Animate featured cards on scroll into view
function animateCardsOnScroll() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('show')) {
                entry.target.classList.add('show');
                entry.target.animate([
                    { opacity: 0, transform: 'scale(0.93) translateY(40px)' },
                    { opacity: 1, transform: 'scale(1) translateY(0)' }
                ], {
                    duration: 650,
                    easing: 'cubic-bezier(.41,1.17,.82,1.01)',
                    fill: 'forwards'
                });
            }
        });
    }, { threshold: 0.18 });
    document.querySelectorAll('.product-modern').forEach(el => observer.observe(el));
}
window.addEventListener('DOMContentLoaded', animateCardsOnScroll);

// Infinite brand marquee (reset animation for infinity)
window.addEventListener('DOMContentLoaded', () => {
    const marquee = document.getElementById('brands-marquee');
    if (!marquee) return;
    let marqueeWidth = marquee.scrollWidth / 2;
    let start = null;
    let pos = 0;

    function animateMarquee(ts) {
        if (!start) start = ts;
        let elapsed = ts - start;
        let speed = 0.08;
        pos = (elapsed * speed) % marqueeWidth;
        marquee.style.transform = `translateX(${-pos}px)`;
        requestAnimationFrame(animateMarquee);
    }
    requestAnimationFrame(animateMarquee);

    // Touch/drag to scroll on mobile
    let isDragging = false, dragStartX = 0, marqueeStartX = 0;
    marquee.parentElement.addEventListener('mousedown', e => {
        isDragging = true;
        dragStartX = e.clientX;
        marqueeStartX = pos;
        marquee.style.transition = 'none';
        e.preventDefault();
    });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const dx = e.clientX - dragStartX;
        pos = (marqueeStartX - dx) % marqueeWidth;
        marquee.style.transform = `translateX(${-pos}px)`;
    });
    // Touch events
    marquee.parentElement.addEventListener('touchstart', e => {
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        marqueeStartX = pos;
        marquee.style.transition = 'none';
    }, {passive:true});
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const dx = e.touches[0].clientX - dragStartX;
        pos = (marqueeStartX - dx) % marqueeWidth;
        marquee.style.transform = `translateX(${-pos}px)`;
    }, {passive:true});
});

// Subtle Home Particle Animation
function drawParticles() {
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    let num = Math.floor(w / 48) + 12;
    let particles = [];
    for (let i = 0; i < num; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: 1 + Math.random() * 2,
            dx: (Math.random() - 0.5) * 0.25,
            dy: (Math.random() - 0.5) * 0.22,
            color: `rgba(36,159,253,${Math.random()*0.13+0.13})`
        });
    }
    function animate() {
        ctx.clearRect(0,0,w,h);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = "#249ffd";
            ctx.shadowBlur = 8;
            ctx.fill();
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
        }
        requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('resize', () => {
        w = window.innerWidth; h = window.innerHeight;
        canvas.width = w; canvas.height = h;
    });
}
window.addEventListener('DOMContentLoaded', drawParticles);

// Responsive NAV + Smooth Scroll
window.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            navLinks.classList.remove('open');
        });
    });
    // Close nav on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener('scroll', function() {
    if(window.scrollY > 300) {
        scrollTopBtn.style.display = "flex";
    } else {
        scrollTopBtn.style.display = "none";
    }
});
scrollTopBtn?.addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
});
document.addEventListener('keyup', function(e) {
    if(e.key === "Escape") {
        document.getElementById('navLinks')?.classList.remove('open');
    }
});