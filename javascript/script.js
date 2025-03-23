document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(savedTheme + '-theme');
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon(currentTheme);
    });

    function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                // Aktif class'ı hemen güncelle
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // script.js'i şu şekilde güncelle
    // Skills Tabs - Güncellenmiş Kod
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Tüm buton ve panelleri resetle
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Aktif olanı işaretle
        button.classList.add('active');
        document.getElementById(category).classList.add('active');
    });
    });

    document.querySelectorAll('.btn-details').forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const shortDesc = btn.closest('.project-content').querySelector('p').innerHTML; // Kısa açıklamayı al
        const details = btn.closest('.project-card').querySelector('.project-details').innerHTML; // Detayları al
        
        // Modal içeriğini oluştur
        modalBody.innerHTML = `
            <h3>${btn.closest('.project-card').querySelector('h3').textContent}</h3>
            <div class="short-desc">${shortDesc}</div>
            <hr>
            <div class="full-details">${details}</div>
        `;
        modal.style.display = 'block';
    });
});

    // Sayfa yüklendiğinde sadece ilk kategoriyi göster
    document.querySelector('.tab-btn.active').click();

    // Project Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            projectCards.forEach(card => {
                card.style.display = 'none';
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                }
            });
        });
    });

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress');
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const level = bar.dataset.level;
            bar.style.width = level + '%';
        });
    }

    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.querySelector('#skills'));
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    // Project Modal
    const projectDetails = document.querySelectorAll('.project-details');
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');

    document.querySelectorAll('.btn-details').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalBody.innerHTML = projectDetails[index].innerHTML;
            modal.style.display = 'block';
        });
    });

    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    

    // Initialize Particles
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#4a6cf7' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });
    // Aktif nav link güncelleme
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if(window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Scroll event listener
    window.addEventListener('scroll', () => {
        updateActiveNav();
        
        // Debounce için
        clearTimeout(window.scrollTimer);
        window.scrollTimer = setTimeout(updateActiveNav, 50);
    });

    // Sayfa yüklendiğinde çalıştır
    document.addEventListener('DOMContentLoaded', updateActiveNav);
});