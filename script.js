// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления ника
    const nickname = document.getElementById('animated-nickname');
    setTimeout(() => {
        nickname.style.animation = 'fadeInUp 1.5s forwards';
    }, 500);
    
    // Предзагрузка изображений
    function preloadImages() {
        const imageUrls = [
            'https://i.ibb.co/ycFyr8wt/avatar-washington.jpg',
            'https://i.ibb.co/wrpVbnR5/avatar-voronov.jpg',
            'https://i.ibb.co/ht6V2fZ/epysium-logo.jpg',
            'https://i.ibb.co/WWhK7H23/finlanov-partiya.jpg' // НОВОЕ ИЗОБРАЖЕНИЕ
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    preloadImages();
    
    // Обработка ошибок загрузки изображений
    function handleImageErrors() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                console.error('Не удалось загрузить изображение:', this.src);
                
                // Для аватара Washington
                if (this.id === 'avatar-img') {
                    const placeholder = this.closest('.avatar-placeholder');
                    this.style.display = 'none';
                    
                    if (!placeholder.querySelector('.avatar-initials')) {
                        const initialsSpan = document.createElement('span');
                        initialsSpan.className = 'avatar-initials';
                        initialsSpan.textContent = 'WA';
                        initialsSpan.style.fontSize = '3rem';
                        initialsSpan.style.fontWeight = '700';
                        initialsSpan.style.color = '#3a86ff';
                        placeholder.appendChild(initialsSpan);
                    }
                }
                
                // Для аватара Voronov
                if (this.src.includes('avatar-voronov')) {
                    const avatarContainer = this.closest('.friend-avatar');
                    this.style.display = 'none';
                    
                    if (!avatarContainer.querySelector('.fallback-initials')) {
                        const initialsSpan = document.createElement('span');
                        initialsSpan.className = 'fallback-initials';
                        initialsSpan.textContent = 'HV';
                        initialsSpan.style.position = 'absolute';
                        initialsSpan.style.top = '50%';
                        initialsSpan.style.left = '50%';
                        initialsSpan.style.transform = 'translate(-50%, -50%)';
                        initialsSpan.style.fontSize = '2rem';
                        initialsSpan.style.fontWeight = '700';
                        initialsSpan.style.color = 'white';
                        initialsSpan.style.zIndex = '2';
                        avatarContainer.appendChild(initialsSpan);
                    }
                }
                
                // Для логотипа проекта Epysium
                if (this.id === 'project-img') {
                    const placeholder = this.closest('.project-placeholder');
                    this.style.display = 'none';
                    
                    if (!placeholder.querySelector('.fallback-icon')) {
                        const icon = document.createElement('i');
                        icon.className = 'fas fa-project-diagram fallback-icon';
                        icon.style.fontSize = '5rem';
                        icon.style.color = '#3a86ff';
                        icon.style.marginBottom = '20px';
                        placeholder.appendChild(icon);
                        
                        const text = document.createElement('p');
                        text.textContent = 'Epysium Project';
                        text.style.color = '#3a86ff';
                        text.style.fontSize = '1.2rem';
                        placeholder.appendChild(text);
                    }
                }
                
                // Для изображения Финланов Партия
                if (this.src.includes('finlanov-partiya')) {
                    const placeholder = this.closest('.project-placeholder');
                    this.style.display = 'none';
                    
                    if (!placeholder.querySelector('.finlanov-fallback')) {
                        const icon = document.createElement('i');
                        icon.className = 'fas fa-flag finlanov-fallback';
                        icon.style.fontSize = '4rem';
                        icon.style.color = '#ff9900';
                        icon.style.marginBottom = '20px';
                        placeholder.appendChild(icon);
                        
                        const text = document.createElement('p');
                        text.textContent = 'Финланов Партия';
                        text.style.color = '#ff9900';
                        text.style.fontSize = '1.2rem';
                        text.style.fontWeight = '600';
                        placeholder.appendChild(text);
                    }
                }
            });
        });
    }
    
    setTimeout(handleImageErrors, 1000);
    
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                navMenu.style.display = '';
            } else {
                if (!navMenu.classList.contains('active')) {
                    navMenu.style.display = 'none';
                }
            }
        });
    }
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                if (window.innerWidth <= 768 && navMenu) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Обновление активного пункта меню
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    });
    
    // Анимация появления элементов
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.ally-card, .stat-card').forEach(card => {
        observer.observe(card);
    });
    
    // Анимация skill-bars
    const skillBars = document.querySelectorAll('.skill-level');
    const skillBarObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const width = skillLevel.style.width;
                skillLevel.style.width = '0';
                
                setTimeout(() => {
                    skillLevel.style.transition = 'width 2s ease-out';
                    skillLevel.style.width = width;
                }, 300);
                
                skillBarObserver.unobserve(skillLevel);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillBarObserver.observe(bar);
    });
    
    // Обновление года в футере
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
    
    // Адаптация стрелочки на мобильных
    function adjustScrollIndicator() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const scrollIndicator = document.querySelector('.scroll-indicator-container');
        
        if (window.innerWidth <= 768) {
            if (heroSubtitle && scrollIndicator) {
                const subtitleHeight = heroSubtitle.offsetHeight;
                scrollIndicator.style.bottom = Math.max(30, 20 + subtitleHeight / 2) + 'px';
            }
        } else {
            if (scrollIndicator) {
                scrollIndicator.style.bottom = '40px';
            }
        }
    }
    
    adjustScrollIndicator();
    window.addEventListener('resize', adjustScrollIndicator);
    
    // Индикатор загрузки
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Анимация NFT бейджа после загрузки
        const nftBadge = document.querySelector('.nft-badge');
        if (nftBadge) {
            setTimeout(() => {
                nftBadge.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    nftBadge.style.transform = 'scale(1)';
                }, 200);
            }, 1000);
        }
    });
});
