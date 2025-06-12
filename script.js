// Función para scroll suave a secciones
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Efecto de parallax simple para el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Animación de aparición para elementos cuando entran en viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a elementos específicos cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    // Elementos a animar
    const animatedElements = document.querySelectorAll(
        '.race-card, .timeline-item, .gameplay-feature, .gallery-item'
    );
    
    // Configurar estado inicial y observar elementos
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Control de navegación activa
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    
    // Función para actualizar navegación activa
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Agregar listener para scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Agregar clicks a los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Efecto de typing para el título hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar efecto después de un pequeño delay
        setTimeout(typeWriter, 500);
    }
    
    // Contador animado para estadísticas (si decides agregarlo después)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Efecto de hover mejorado para las cards de razas
    const raceCards = document.querySelectorAll('.race-card');
    raceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de partículas en el fondo (simple)
    createStarField();
});

// Función para crear un campo de estrellas simple
function createStarField() {
    const starField = document.createElement('div');
    starField.className = 'star-field';
    starField.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    // Crear estrellas
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
        `;
        starField.appendChild(star);
    }
    
    document.body.appendChild(starField);
    
    // Agregar CSS para la animación de twinkle
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Función para mostrar/ocultar menú móvil (para futuras mejoras)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Event listeners adicionales
window.addEventListener('resize', function() {
    // Recalcular posiciones si es necesario
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    }
});
