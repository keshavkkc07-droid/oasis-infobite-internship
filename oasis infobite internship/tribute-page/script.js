/* ═══════════════════════════════════════════════════════════
   NIKOLA TESLA TRIBUTE PAGE — JAVASCRIPT
   Features: Particle system, scroll animations, counter,
             navbar, mobile menu, back-to-top
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ─── HERO LOAD ANIMATION ───
    const hero = document.getElementById('hero');
    requestAnimationFrame(() => {
        hero.classList.add('loaded');
    });

    // ─── PARTICLE SYSTEM ───
    class ParticleSystem {
        constructor(container) {
            this.container = container;
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.mouse = { x: -1000, y: -1000 };
            this.animationId = null;

            this.container.appendChild(this.canvas);
            this.resize();

            window.addEventListener('resize', () => this.resize());
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });

            this.init();
            this.animate();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        init() {
            const count = Math.min(Math.floor(window.innerWidth / 15), 80);
            this.particles = [];
            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.5 + 0.1,
                    color: Math.random() > 0.7 ? '#ffd700' : '#00d4ff',
                });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.particles.forEach((p, i) => {
                // Move particle
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = this.canvas.width;
                if (p.x > this.canvas.width) p.x = 0;
                if (p.y < 0) p.y = this.canvas.height;
                if (p.y > this.canvas.height) p.y = 0;

                // Draw particle
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.opacity;
                this.ctx.fill();

                // Connect nearby particles
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p2 = this.particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(p.x, p.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.strokeStyle = '#00d4ff';
                        this.ctx.globalAlpha = (1 - dist / 120) * 0.15;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                    }
                }

                // Mouse interaction
                const mdx = p.x - this.mouse.x;
                const mdy = p.y - this.mouse.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < 150) {
                    const force = (150 - mDist) / 150;
                    p.vx += (mdx / mDist) * force * 0.2;
                    p.vy += (mdy / mDist) * force * 0.2;
                }

                // Dampen velocity
                p.vx *= 0.99;
                p.vy *= 0.99;
            });

            this.ctx.globalAlpha = 1;
            this.animationId = requestAnimationFrame(() => this.animate());
        }

        destroy() {
            cancelAnimationFrame(this.animationId);
            this.canvas.remove();
        }
    }

    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        new ParticleSystem(particleContainer);
    }


    // ─── NAVBAR ───
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.navbar__links');
    let lastScrollY = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;

        // Show navbar after scrolling past hero
        if (scrollY > window.innerHeight * 0.5) {
            navbar.classList.add('visible', 'scrolled');
        } else {
            navbar.classList.remove('visible', 'scrolled');
        }

        // Active section highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinksAll = document.querySelectorAll('.navbar__links a');
        let currentSection = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksAll.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close on link click
        document.querySelectorAll('.navbar__links a').forEach((link) => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }


    // ─── SCROLL ANIMATIONS (Intersection Observer) ───
    const animateElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach((el) => observer.observe(el));


    // ─── COUNTER ANIMATION ───
    function animateCounter(element, target, duration = 2000) {
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            element.textContent = current + '+';

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach((counter) => counterObserver.observe(counter));


    // ─── BACK TO TOP ───
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ─── SMOOTH SCROLL FOR ANCHOR LINKS ───
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // ─── PARALLAX TILT ON QUOTE BLOCK ───
    const quoteBlock = document.querySelector('.quote-block');
    if (quoteBlock) {
        quoteBlock.addEventListener('mousemove', (e) => {
            const rect = quoteBlock.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            quoteBlock.style.transform = `perspective(1000px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
        });

        quoteBlock.addEventListener('mouseleave', () => {
            quoteBlock.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            quoteBlock.style.transition = 'transform 0.5s ease';
        });

        quoteBlock.addEventListener('mouseenter', () => {
            quoteBlock.style.transition = 'none';
        });
    }


    // ─── KEYBOARD ACCESSIBILITY ───
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });

    console.log('⚡ Tesla Tribute Page loaded successfully');
});
