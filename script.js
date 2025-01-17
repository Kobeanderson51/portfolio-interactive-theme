document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Script started successfully');

        // Add global error handler for image loading
        window.addEventListener('error', (event) => {
            if (event.target.tagName === 'IMG') {
                console.error('Image loading error:', {
                    src: event.target.src,
                    fullPath: event.target.currentSrc
                });
            }
        });

        // Cursor Follower Effect
        const cursorFollower = document.querySelector('.cursor-follower');
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: 'power1.out'
            });
        });

        // Typing Effect
        const typingTextElement = document.querySelector('.typing-text');
        const phrases = [
            'Interactive Developer', 
            'Creative Designer', 
            'UI/UX Innovator'
        ];
        
        // Fallback if element not found
        if (!typingTextElement) {
            console.warn('Typing text element not found');
            return;
        }

        let phraseIndex = 0;
        let letterIndex = 0;
        let currentPhrase = [];
        let isDeleting = false;

        function type() {
            const currentText = phrases[phraseIndex];
            
            if (isDeleting) {
                currentPhrase = currentPhrase.slice(0, -1);
            } else {
                // Ensure we're adding the entire character
                currentPhrase.push(currentText[letterIndex]);
            }
            
            typingTextElement.textContent = currentPhrase.join('');
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && letterIndex === currentText.length - 1) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentPhrase.length === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                letterIndex = -1; // Reset to -1 so first increment brings it to 0
            }
            
            letterIndex += isDeleting ? -1 : 1;
            
            setTimeout(type, typeSpeed);
        }
        
        type();

        // Parallax Scroll Effect with GSAP
        gsap.utils.toArray('.section-content').forEach((section, i) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Project Hover Animations
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const overlay = card.querySelector('.project-overlay');
            const projectLink = card.querySelector('.project-link');

            card.addEventListener('mouseenter', () => {
                gsap.to(overlay, {
                    height: '100%',
                    duration: 0.5,
                    ease: 'power2.inOut'
                });
                gsap.from(projectLink, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    delay: 0.3
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(overlay, {
                    height: '0%',
                    duration: 0.5,
                    ease: 'power2.inOut'
                });
            });
        });

        // Interactive Form Submission
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    gsap.to(input, {
                        borderColor: 'red',
                        duration: 0.3
                    });
                } else {
                    gsap.to(input, {
                        borderColor: 'rgba(255,255,255,0.2)',
                        duration: 0.3
                    });
                }
            });
            
            if (isValid) {
                // Simulate form submission
                gsap.to(contactForm, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        contactForm.innerHTML = `
                            <div style="text-align: center; color: var(--primary-color);">
                                <h3>Message Sent Successfully!</h3>
                                <p>Thank you for reaching out.</p>
                            </div>
                        `;
                        gsap.to(contactForm, {
                            opacity: 1,
                            duration: 0.5
                        });
                    }
                });
            }
        });

        // Skill Bubble Interactions
        const skillBubbles = document.querySelectorAll('.skill-bubble');
        skillBubbles.forEach(bubble => {
            bubble.addEventListener('mouseenter', () => {
                gsap.to(bubble, {
                    scale: 1.1,
                    backgroundColor: 'rgba(106, 17, 203, 0.4)',
                    duration: 0.3
                });
            });

            bubble.addEventListener('mouseleave', () => {
                gsap.to(bubble, {
                    scale: 1,
                    backgroundColor: 'rgba(106, 17, 203, 0.2)',
                    duration: 0.3
                });
            });
        });

        // 3D Scroll-Triggered Animations
        gsap.utils.toArray('.section-content').forEach((section, i) => {
            gsap.fromTo(section, {
                opacity: 0,
                rotationX: 90,
                transformOrigin: 'top center',
                scale: 0.8
            }, {
                opacity: 1,
                rotationX: 0,
                scale: 1,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Advanced Cursor Interaction
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // 3D Tilt Effect for Sections
            gsap.utils.toArray('.section-content').forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionCenterX = rect.left + rect.width / 2;
                const sectionCenterY = rect.top + rect.height / 2;

                const angleX = (mouseY - sectionCenterY) / 50;
                const angleY = (mouseX - sectionCenterX) / 50;

                gsap.to(section, {
                    rotationX: -angleX,
                    rotationY: angleY,
                    ease: 'power1.out',
                    duration: 0.5
                });
            });
        });

        // Interactive Skill Visualization
        skillBubbles.forEach(bubble => {
            bubble.addEventListener('mouseenter', () => {
                gsap.to(bubble, {
                    scale: 1.2,
                    backgroundColor: 'rgba(106, 17, 203, 0.5)',
                    color: 'white',
                    boxShadow: '0 0 20px rgba(106, 17, 203, 0.5)',
                    duration: 0.3
                });
            });

            bubble.addEventListener('mouseleave', () => {
                gsap.to(bubble, {
                    scale: 1,
                    backgroundColor: 'rgba(106, 17, 203, 0.2)',
                    color: 'var(--primary-color)',
                    boxShadow: 'none',
                    duration: 0.3
                });
            });
        });

        // Particle Background Effect
        function createParticles() {
            const particlesContainer = document.createElement('div');
            particlesContainer.classList.add('particles-background');
            document.body.appendChild(particlesContainer);

            for (let i = 0; i < 100; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particlesContainer.appendChild(particle);

                gsap.set(particle, {
                    x: gsap.utils.random(0, window.innerWidth),
                    y: gsap.utils.random(0, window.innerHeight),
                    scale: gsap.utils.random(0.1, 1),
                    opacity: gsap.utils.random(0.1, 0.5),
                    backgroundColor: 'white'
                });

                gsap.to(particle, {
                    x: gsap.utils.random(0, window.innerWidth),
                    y: gsap.utils.random(0, window.innerHeight),
                    duration: gsap.utils.random(10, 20),
                    repeat: -1,
                    yoyo: true,
                    ease: 'power1.inOut'
                });
            }
        }

        createParticles();

        // Name reveal animation removed
    } catch (error) {
        console.error('Initialization error:', error);
    }
});
