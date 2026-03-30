document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Typing Effect Logic ---
    const textElement = document.getElementById("typing-text");
    const titles = ["Problem Solver", "Web Developer", "Cloud Enthusiast"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

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
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing if element exists
    if (textElement) type();


    // --- 2. Active Link Highlight on Scroll ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjusted offset (90px) to account for the fixed navbar height
            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if href matches the current section ID
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    // --- 3. Scroll Reveal Animation (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Apply reveal styles and observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.8s ease-out";
        observer.observe(section);
    });


    // --- 4. Show More Achievements Toggle ---
    const achBtn = document.getElementById('showMoreAchievements');
    const hiddenAch = document.querySelectorAll('.achievement-card.hidden-item');

    if (achBtn) {
        achBtn.addEventListener('click', () => {
            hiddenAch.forEach(item => {
                // We use a specific display toggle to ensure it overrides CSS hidden-item
                if (item.style.display === "flex") {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
            });

            // Toggle Button Text
            achBtn.innerText = achBtn.innerText === "Show More" ? "Show Less" : "Show More";
        });
    }
});

