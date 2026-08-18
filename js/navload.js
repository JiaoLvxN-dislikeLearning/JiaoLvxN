(function randomFavicon() {
    const iconList = [
        './assets/icon/favicon1.webp',
        './assets/icon/favicon2.webp',
        './assets/icon/favicon3.webp',
        './assets/icon/favicon4.webp',
        './assets/icon/favicon5.webp',
        './assets/icon/favicon6.webp',
        './assets/icon/favicon7.webp',
        './assets/icon/favicon8.webp',
        './assets/icon/favicon9.webp',
        './assets/icon/favicon10.webp',
        './assets/icon/favicon11.webp',
        './assets/icon/favicon12.webp',
        './assets/icon/favicon13.webp',
        './assets/icon/favicon14.webp',
        './assets/icon/favicon15.webp',
        './assets/icon/favicon16.webp',
        './assets/icon/favicon17.webp',
        './assets/icon/favicon18.webp',
        './assets/icon/favicon19.webp',
        './assets/icon/favicon20.webp',
        './assets/icon/favicon21.webp',
        './assets/icon/favicon22.webp',
        './assets/icon/favicon23.webp',
        './assets/icon/favicon24.webp',
    ];
    if (iconList.length === 0) return;
    const lastIcon = localStorage.getItem('lastFavicon');
    let available = iconList;
    if (lastIcon && iconList.length > 1) {
        available = iconList.filter(path => path !== lastIcon);
    }
    const randomIcon = available[Math.floor(Math.random() * available.length)];
    localStorage.setItem('lastFavicon', randomIcon);
    let link = document.querySelector('link[rel="icon"]');
    if (link) {
        link.href = randomIcon;
    } else {
        link = document.createElement('link');
        link.rel = 'icon';
        link.href = randomIcon;
        document.head.appendChild(link);
    }
})();
(function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    }
})();
fetch('/components/nav.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('nav').innerHTML = html;
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.main-nav a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            const savedTheme = localStorage.getItem('theme') || 'light';
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
                toggleBtn.textContent = '☀️';
            } else {
                toggleBtn.textContent = '🌙';
            }
            toggleBtn.addEventListener('click', function() {
                const isDark = document.documentElement.classList.toggle('dark');
                this.textContent = isDark ? '☀️' : '🌙';
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        }
    });
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('#')) return;
    if (link.target) return;
    if (link.hasAttribute('download')) return;
    if (link.classList.contains('notransition')) return;
    if (link.dataset.noTransition !== undefined) return;
    if (!link.href.startsWith(window.location.origin)) return;
    const dest = link.href;
    e.preventDefault();
    const page = document.querySelector('.whole-page');
    if (page) {
        page.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = dest;
        }, 200);
    } else {
        window.location.href = dest;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    (function initStars() {
        const canvas = document.createElement('canvas');
        canvas.id = 'stars-canvas';
        canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        transition: opacity 1.2s ease;
    `;
        document.body.prepend(canvas);
        const ctx = canvas.getContext('2d');
        let stars = [];
        let animationId = null;
        let isDark = false;
        function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateStars();
        }
        function generateStars() {
        const count = 150; 
        stars = [];
        for (let i = 0; i < count; i++) {
            const type = Math.random() > 0.85 ? 'bright' : 'normal';
            const radius = type === 'bright' 
                ? Math.random() * 2.5 + 2.0 
                : Math.random() * 1.8 + 0.3;
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: radius,
                baseAlpha: Math.random() * 0.6 + 0.4,
                speed: type === 'bright' 
                    ? Math.random() * 0.03 + 0.01 
                    : Math.random() * 0.08 + 0.02,
                phase: Math.random() * Math.PI * 2,
                type: type,
                color: type === 'bright' 
                    ? `rgba(${180 + Math.random() * 75}, ${180 + Math.random() * 75}, 255, 1)`
                    : `rgba(255, 255, 255, 1)`,
            });
        }
        }
        function drawStars(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!isDark) {
            animationId = requestAnimationFrame(drawStars);
            return;
        }
        const now = performance.now() / 1000;
        stars.forEach(star => {
            const breath = Math.pow((Math.sin(now * star.speed * 8 + star.phase) + 1) / 2, 0.8);
            const alpha = star.baseAlpha * (0.3 + 0.7 * breath);
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            if (star.type === 'bright') {
                ctx.shadowColor = `rgba(180, 180, 255, ${alpha * 0.6})`;
                ctx.shadowBlur = 15 + star.radius * 8;
            } else {
                ctx.shadowColor = `rgba(255, 255, 255, ${alpha * 0.3})`;
                ctx.shadowBlur = 3;
            }
            if (star.type === 'bright') {
                const r = 180 + 75 * (star.x / canvas.width);
                const g = 180 + 75 * (star.y / canvas.height);
                ctx.fillStyle = `rgba(${r}, ${g}, 255, ${alpha})`;
            } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            }
            ctx.fill();
        });
        animationId = requestAnimationFrame(drawStars);
        }

        function startAnimation() {
            if (animationId) return;
            drawStars();
        }
        function updateDarkMode(dark) {
            isDark = dark;
            canvas.style.opacity = dark ? '1' : '0';
            if (dark && !animationId) {
                startAnimation();
            }
        }
        function getCurrentDark() {
            return document.documentElement.classList.contains('dark');
        }
        const observer = new MutationObserver(() => {
            const dark = document.documentElement.classList.contains('dark');
            updateDarkMode(dark);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        window.addEventListener('resize', () => {
            resizeCanvas();
        });
        requestAnimationFrame(() => {
            resizeCanvas();
            const initialDark = getCurrentDark();
            updateDarkMode(initialDark);
            if (initialDark) {
                startAnimation();
            }
        });

        window.__stars = { updateDarkMode, resizeCanvas };
    })();
});