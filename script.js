const numStars = 200; // Number of stars

for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random position
    const x = Math.random() * 100; // Percentage width
    const y = Math.random() * 100; // Percentage height
    star.style.left = `${x}vw`;
    star.style.top = `${y}vh`;

    // Random animation duration for variety
    const moveDuration = Math.random() * 4 + 3; // 3 to 7 seconds
    star.style.animationDuration = `${moveDuration}s, 1s`; // moveUp, twinkle

    // Random star size
    const size = Math.random() * 2 + 1;  // 1px to 3px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random delay so stars don't all move in sync
    const delay = Math.random() * moveDuration;
    star.style.animationDelay = `${delay}s, ${delay}s`;


    document.body.appendChild(star);
}

let currentStep = 1;
const steps = document.querySelectorAll('.step');
const form = document.getElementById('multistep-form');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

function showStep(stepIndex) {
    steps.forEach((step, index) => {
        step.classList.remove('active', 'animate__animated', 'animate__fadeIn');
        if (index === stepIndex - 1) {
            step.classList.add('active', 'animate__animated', 'animate__fadeIn');
        }
    });

    if (stepIndex === 1) {
        prevButton.classList.add('hidden'); // Add the hidden class
    } else if (stepIndex === 6) {
        nextButton.classList.add('hidden'); // Add the hidden class
    } else {
        prevButton.classList.remove('hidden'); // Remove the hidden class
    }
}

function nextStep() {
    if (currentStep < steps.length) {
        currentStep++;
        showStep(currentStep);
        if (currentStep === 3) {
            nextButton.textContent = 'Apa?';
            prevButton.textContent = 'Kembali';
        }// Check if it's the second step

        if (currentStep === 4) { // Check if it's the third step
            nextButton.textContent = 'Lanjut';
            const canvas = document.createElement('canvas');
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '10000';
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const particles = [];

            const createParticle = () => {
                const x = Math.random() * canvas.width;
                const y = -Math.random() * canvas.height * 0.2; // Start above the screen
                const size = Math.random() * 0.5 + 0.5; // Smaller size
                const speed = Math.random() * 3 + 2; // Adjust speed
                const angle = Math.random() * 360;
                const vx = Math.cos(angle * Math.PI / 180) * speed * 0.2; // Reduced horizontal speed
                const vy = Math.sin(angle * Math.PI / 180) * speed + 0.1; // Gravity
                const color = `hsl(${Math.random() * 360}, 70%, 70%)`; // Random HSL color

                return { x, y, size, vx, vy, alpha: 1, color };
            };

            for (let i = 0; i < 300; i++) { // More particles
                particles.push(createParticle());
            }

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.alpha -= 0.003; // Slower fade out
                    p.vy += 0.001; // More gravity

                    if (p.y > canvas.height * 1.2 || p.alpha <= 0) {
                        particles[i] = createParticle();
                    }

                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                requestAnimationFrame(animate);
            };

            animate();

            setTimeout(() => {
                canvas.remove();
            }, 5000);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

showStep(currentStep);