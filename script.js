document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.glass-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Card tilt on mouse move
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.transform = `translateY(-5px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Magnetic effect on hero icons
    document.querySelectorAll('.hero-icon-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // Nav hide on scroll down, show on scroll up
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateX(-50%) translateY(-100px)';
            nav.style.opacity = '0';
        } else {
            nav.style.transform = 'translateX(-50%) translateY(0)';
            nav.style.opacity = '1';
        }
        lastScroll = currentScroll;
    });

    // Duck walks across screen on scroll
    const duck = document.querySelector('.duck');
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const progress = window.scrollY / maxScroll;
        const screenWidth = window.innerWidth;
        const duckX = progress * (screenWidth + 60) - 60;
        duck.style.left = duckX + 'px';

        if (window.scrollY < lastScrollY) {
            duck.classList.add('flip');
        } else {
            duck.classList.remove('flip');
        }
        lastScrollY = window.scrollY;
    });

    // Rain effect on hero hover
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        if (Math.random() > 0.6) {
            const drop = document.createElement('span');
            drop.classList.add('raindrop');
            drop.style.left = (e.clientX - rect.left) + 'px';
            drop.style.top = (e.clientY - rect.top) + 'px';
            hero.appendChild(drop);
            setTimeout(() => drop.remove(), 1000);
        }
    });
});
