const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const hablemosForm = document.getElementById('hablemos-form');
const quickFormStatus = document.getElementById('quick-form-status');
const downloadButton = document.querySelector('.btn-secondary');

(function () {
    emailjs.init('7xJ5AwH-qdRG69jDs');
})();

document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    setupEventListeners();
    setupScrollAnimations();
});

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function setupEventListeners() {
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (downloadButton) {
        downloadButton.addEventListener('click', downloadCV);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    if (hablemosForm) {
        hablemosForm.addEventListener('submit', handleQuickFormSubmit);
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('scroll', handleScroll);
}

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

function toggleMenu() {
    navLinks.classList.toggle('active');

    const spans = menuToggle.querySelectorAll('span');

    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function closeMenu() {
    if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');

        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function downloadCV(e) {
    e.preventDefault();
    const cvUrl = './assets/curriculum/curriculum-web.pdf';
    window.open(cvUrl, '_blank');
}

function handleFormSubmit(e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.classList.add('loading');

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send('service_tm0xrli', 'template_3mdc4os', templateParams)
        .then(function (response) {
            submitBtn.classList.remove('loading');
            showFormStatus('success', '¡Mensaje enviado con éxito! Te responderé pronto.');
            contactForm.reset();
        }, function (error) {
            submitBtn.classList.remove('loading');
            showFormStatus('error', 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
            console.error('Error:', error);
        });
}

function handleQuickFormSubmit(e) {
    e.preventDefault();

    if (!hablemosForm) {
        console.error('El formulario no fue encontrado');
        return;
    }

    const submitBtn = hablemosForm.querySelector('.quick-submit-btn');
    submitBtn.classList.add('loading');

    const message = document.getElementById('quick-message').value;

    const templateParams = {
        from_name: 'Visitante del sitio',
        from_email: 'mensaje_directo@sitio.com',
        message: `[Mensaje Directo] ${message}`,
        subject: 'Mensaje directo de tu sitio web'
    };

    console.log('Enviando mensaje directo:', templateParams);

    emailjs.send('service_tm0xrli', 'template_3mdc4os', templateParams)
        .then(function (response) {
            console.log('Respuesta exitosa:', response);
            submitBtn.classList.remove('loading');
            showQuickFormStatus('success', '¡Mensaje enviado! Te responderé pronto.');
            hablemosForm.reset();
        }, function (error) {
            console.error('Error detallado:', error);
            submitBtn.classList.remove('loading');
            showQuickFormStatus('error', 'Error al enviar. Por favor intenta de nuevo.');
        });
}

function showFormStatus(type, message) {
    formStatus.className = 'form-status';
    formStatus.classList.add(type);
    formStatus.textContent = message;

    formStatus.style.display = 'block';

    setTimeout(() => {
        formStatus.style.display = 'none';
        setTimeout(() => {
            formStatus.style.display = '';
            formStatus.className = 'form-status';
        }, 300);
    }, 5000);
}

function showQuickFormStatus(type, message) {
    if (!quickFormStatus) {
        console.error('El elemento quickFormStatus no fue encontrado');
        return;
    }

    quickFormStatus.className = 'form-status';
    quickFormStatus.classList.add(type);
    quickFormStatus.textContent = message;

    quickFormStatus.style.display = 'block';

    setTimeout(() => {
        quickFormStatus.style.display = 'none';
        setTimeout(() => {
            quickFormStatus.style.display = '';
            quickFormStatus.className = 'form-status';
        }, 300);
    }, 5000);
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const elements = document.querySelectorAll(
        '.service-card, .section-title, .about-image-wrapper, .about-text, .hablemos-form-container'
    );
    elements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}