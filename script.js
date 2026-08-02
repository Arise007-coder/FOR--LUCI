// Global State Tracking
let currentStep = 1;

// Loading Bar Simulation & Page Initialization
window.addEventListener('DOMContentLoaded', () => {
    let progress = 0;
    const fill = document.getElementById('progressFill');
    const interval = setInterval(() => {
        progress += 10;
        fill.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
                document.getElementById('appContainer').classList.remove('hidden');
                startTypewriter('type1', "Hi luci! 👋🌸\n\nI know we just met recently...\n\nBut I wanted to make something a little different.\n\nI hope this small surprise makes you smile today. 😊");
            }, 400);
        }
    }, 150);

    initBackgroundCanvas();
    initVideoControls();
});

// Step Transition Engine
function nextStep(stepNumber) {
    const activeCard = document.querySelector('.step-card.active');
    if (activeCard) activeCard.classList.remove('active');

    const nextCard = document.getElementById(`step${stepNumber}`);
    if (nextCard) {
        nextCard.classList.add('active');
        currentStep = stepNumber;
    }

    // Trigger Typewriters on relevant steps
    if (stepNumber === 3) {
        startTypewriter('type3', "Hi luci 😊\n\nI just wanted to say...\n\nThank you for taking a little time to visit this page.\n\nMaybe this is unexpected...\n\nBut I thought it would be more fun than sending just another message.\n\nI hope this little surprise makes you smile. 🌸");
    }
}

// Typewriter Effect Logic
function startTypewriter(elementId, text) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = '';
    let i = 0;
    const speed = 40;

    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                el.innerHTML += '<br>';
            } else {
                el.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Audio Control Logic
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggle');
    if (audio.paused) {
        audio.play();
        btn.innerText = '🎶';
    } else {
        audio.pause();
        btn.innerText = '🎵';
    }
}

// Envelope Interaction
function openEnvelope() {
    triggerConfetti();
    nextStep(3);
}

// Playful Dodging Button Mechanics
function dodgeBtn() {
    const btn = document.getElementById('shyBtn');
    const popup = document.getElementById('funnyPopup');
    if (popup) popup.classList.remove('hidden');

    const randomX = (Math.random() - 0.5) * 150;
    const randomY = (Math.random() - 0.5) * 100;

    if (btn) btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Maybe Button Branching
function showMaybeMessage() {
    const msg = document.getElementById('maybeMsg');
    if (msg) msg.classList.remove('hidden');
    setTimeout(() => {
        nextStep(14);
    }, 2000);
}

// Canvas Visual Particle System
function initBackgroundCanvas() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 30 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: ['#ffb6c1', '#e6e6fa', '#ffffff'][Math.floor(Math.random() * 3)],
        speedY: Math.random() * 1 + 0.5,
        speedX: Math.random() * 0.5 - 0.25
    }));

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.fill();

            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// Confetti Utility Integration
function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 }
        });
    }
}

function triggerGrandCelebration() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.6 }
        });
    }
}

// Video setup
function initVideoControls() {
    const specialVideo = document.getElementById('specialVideo');
    const videoFinishMsg = document.getElementById('videoFinishMsg');

    if (videoFinishMsg) {
        videoFinishMsg.classList.remove('hidden');
        videoFinishMsg.style.display = 'block';
    }

    if (specialVideo) {
        specialVideo.addEventListener('ended', () => {
            triggerConfetti();
        });
    }
}
