// ========================================
// MENÚ RESPONSIVO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    // Toggle del menú móvil
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// ========================================
// FORMULARIO DE CONTACTO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const evento = document.getElementById('evento').value;
            const fecha = document.getElementById('fecha').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            // Validación básica
            if (!nombre || !email || !telefono || !evento || !fecha) {
                alert('Por favor, complete todos los campos requeridos.');
                return;
            }

            // Validación de email
            if (!isValidEmail(email)) {
                alert('Por favor, ingrese un correo electrónico válido.');
                return;
            }

            // Validación de teléfono
            if (!isValidPhone(telefono)) {
                alert('Por favor, ingrese un número de teléfono válido.');
                return;
            }

            // Crear el mensaje de confirmación
            const confirmMessage = `
Gracias por su solicitud, ${nombre}!

Detalles de su evento:
- Tipo de evento: ${evento}
- Fecha: ${fecha}
- Teléfono: ${telefono}
- Email: ${email}

Pronto nos pondremos en contacto con usted para confirmar los detalles.

¡Esperamos hacer de su evento un momento inolvidable!
            `;

            // Mostrar confirmación
            alert(confirmMessage);

            // Aquí iría la lógica para enviar el formulario a un servidor
            // Por ahora, solo limpiamos el formulario
            contactForm.reset();

            // Scroll hacia arriba
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// ========================================
// FUNCIONES DE VALIDACIÓN
// ========================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Acepta números con formato internacional, guiones, espacios y paréntesis
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
}

// ========================================
// EFECTOS DE SCROLL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Observador para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animar tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animar tarjetas de galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Animar categorías de ritmos
    const rhythmCategories = document.querySelectorAll('.rhythm-category');
    rhythmCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(category);
    });
});

// ========================================
// NAVEGACIÓN ACTIVA
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';

        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// ========================================
// CONTADOR ANIMADO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card h3');
    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;

        statCards.forEach(card => {
            const target = parseInt(card.textContent);
            const isNumber = !isNaN(target);

            if (isNumber) {
                let current = 0;
                const increment = Math.ceil(target / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        card.textContent = target;
                        clearInterval(timer);
                    } else {
                        card.textContent = current;
                    }
                }, 20);
            }
        });

        hasAnimated = true;
    };

    // Observador para iniciar animación cuando se vea la sección
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateCounters();
            }
        });
    }, observerOptions);

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});

// ========================================
// EFECTO PARALLAX SUAVE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const heroBackground = hero.querySelector('.hero-background');

            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
            }
        });
    }
});

// ========================================
// SUAVIDAD EN ENLACES INTERNOS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();

                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 70; // Ajuste para la barra de navegación fija

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================================
// VALIDACIÓN EN TIEMPO REAL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    }

    if (telefonoInput) {
        telefonoInput.addEventListener('blur', function() {
            if (this.value && !isValidPhone(this.value)) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    }
});

// ========================================
// EFECTO DE CARGA INICIAL
// ========================================

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ========================================
// MANEJO DE ERRORES Y LOGS
// ========================================

window.addEventListener('error', function(event) {
    console.error('Error detectado:', event.error);
});

// Mensaje de bienvenida en consola
console.log('%cGrupo Instrumental Pamplonés', 'font-size: 20px; color: #FF6B35; font-weight: bold;');
console.log('%c30 años de tradición musical', 'font-size: 14px; color: #F7931E;');
console.log('%cSitio web desarrollado con HTML, CSS y JavaScript puro', 'font-size: 12px; color: #004E89;');

