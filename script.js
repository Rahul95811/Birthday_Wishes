document.addEventListener('DOMContentLoaded', () => {
    // Gift opening logic
    const giftImg = document.getElementById('giftImg');
    const giftLanding = document.getElementById('giftLanding');
    const nameModal = document.getElementById('nameModal');
    const nameForm = document.getElementById('nameForm');
    const nameInput = document.getElementById('nameInput');
    const mainContent = document.getElementById('mainContent');
    const personName = document.getElementById('personName');
    const celebrateModal = document.getElementById('celebrateModal');
    const celebrateName = document.getElementById('celebrateName');

    function startMainContentFeatures() {
        // Typing animation for birthday message (if present)
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            const text = typingText.textContent;
            typingText.textContent = '';
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    typingText.textContent = text.substring(0, i + 1);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            setTimeout(typeWriter, 500);
        }

        // Confetti animation (if confetti is available)
        if (typeof confetti !== 'undefined') {
            function shootConfetti() {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            setInterval(shootConfetti, 3000);
        }
    }

    if (giftImg) {
        // Magical chime sound
        const chime = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae5b7.mp3');
        giftImg.addEventListener('mouseenter', () => {
            // Sparkle effect
            for (let i = 0; i < 3; i++) {
                const sparkle = document.createElement('img');
                sparkle.src = 'https://cdn.pixabay.com/photo/2013/07/12/13/57/star-147615_1280.png';
                sparkle.className = 'sparkle';
                sparkle.style.left = `${30 + Math.random() * 80}px`;
                sparkle.style.top = `${20 + Math.random() * 60}px`;
                giftImg.parentElement.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1200);
            }
            chime.currentTime = 0;
            chime.play();
        });
        giftImg.addEventListener('click', () => {
            chime.currentTime = 0;
            chime.play();
            // Transition to name input page
            giftLanding.style.transition = 'opacity 0.7s';
            giftLanding.style.opacity = 0;
            setTimeout(() => {
                giftLanding.style.display = 'none';
                nameModal.style.display = 'flex';
                if (nameInput) nameInput.focus();
            }, 700);
        });
    }

    if (nameForm) {
        nameForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = nameInput.value.trim() || 'Friend';
            nameModal.style.display = 'none';
            mainContent.style.display = 'block';
            if (personName) personName.textContent = name;
            startMainContentFeatures();
        });
    }

    // Handle Next button to show celebration modal
    const nextBtn = document.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            mainContent.style.display = 'none';
            if (celebrateModal) celebrateModal.style.display = 'flex';
            // Personalize name in celebration modal
            if (personName && celebrateName) celebrateName.textContent = personName.textContent;
        });
    }

    // Handle Celebrate Yes button to show carousel
    const celebrateYesBtn = document.querySelector('.celebrate-yes');
    const carouselSection = document.getElementById('carouselSection');
    if (celebrateYesBtn) {
        celebrateYesBtn.addEventListener('click', () => {
            if (celebrateModal) celebrateModal.style.display = 'none';
            if (carouselSection) carouselSection.style.display = 'flex';
        });
    }

    // Audio control (remains global)
    const audio = document.getElementById('bgMusic');
    const audioToggle = document.getElementById('audioToggle');
    let isMuted = false;

    if (audioToggle && audio) {
        audioToggle.addEventListener('click', () => {
            if (isMuted) {
                audio.play();
                audioToggle.innerHTML = '🔊';
            } else {
                audio.pause();
                audioToggle.innerHTML = '🔇';
            }
            isMuted = !isMuted;
        });

        document.addEventListener('click', () => {
            if (!isMuted) {
                audio.play();
            }
        }, { once: true });
    }

    // Birthday card reveal
    const revealBtn = document.getElementById('revealCard');
    const birthdayCard = document.getElementById('birthdayCard');

    revealBtn.addEventListener('click', () => {
        birthdayCard.style.display = 'block';
        revealBtn.style.display = 'none';
    });

    // Card flip animation
    birthdayCard.addEventListener('click', () => {
        birthdayCard.classList.toggle('flipped');
    });

    // Floating balloons
    function createLandingBalloon() {
        const balloon = document.createElement('div');
        const isFront = Math.random() > 0.5;
        balloon.className = 'balloon-anim' + (isFront ? ' front' : ' back');
        balloon.style.left = Math.random() * 90 + 'vw';
        // Random color
        const colors = [
            'linear-gradient(135deg, #ff6b6b, #ffd93d)',
            'linear-gradient(135deg, #6bc6ff, #a1c4fd)',
            'linear-gradient(135deg, #fcb69f, #ffecd2)',
            'linear-gradient(135deg, #a8edea, #fed6e3)',
            'linear-gradient(135deg, #fcb69f, #ff6b6b)',
            'linear-gradient(135deg, #fcb69f, #6bc6ff)',
            'linear-gradient(135deg, #ffecd2, #ffd93d)'
        ];
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        // Random size
        const scale = 0.8 + Math.random() * 0.7;
        balloon.style.transform = `scale(${scale})`;
        // Add string
        const string = document.createElement('div');
        string.className = 'balloon-string';
        balloon.appendChild(string);
        document.body.appendChild(balloon);
        setTimeout(() => balloon.remove(), 7000);
    }
    let balloonInterval = setInterval(createLandingBalloon, 900);

    // Confetti burst on page load
    if (typeof confetti !== 'undefined') {
        setTimeout(() => { confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } }); }, 800);
    }
}); 