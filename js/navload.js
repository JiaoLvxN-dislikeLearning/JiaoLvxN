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
    });