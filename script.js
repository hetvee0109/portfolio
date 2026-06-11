document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Typing Effect ---
    const textElement = document.getElementById("typing-text");
    const titles = ["Problem Solver", "Full-Stack Developer", "Cloud Enthusiast"];
    let titleIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            textElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (textElement) type();


    // --- 2. Active Nav Highlight on Scroll ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    // --- 3. Scroll Reveal ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(24px)";
        section.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
        observer.observe(section);
    });


    // --- 4. Hamburger Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('open'));
        });
    }

});