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