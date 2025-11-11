document.addEventListener('DOMContentLoaded', function() {
    // Effet de parallaxe pour le fond
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX / window.innerWidth) * 10;
        const moveY = (e.clientY / window.innerHeight) * 10;
        document.querySelector('.radio-static').style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Animation du bouton radio
    const dial = document.querySelector('.dial');
    const frequency = document.querySelector('.frequency');

    dial.addEventListener('mousedown', function() {
        document.body.style.cursor = 'grabbing';
        document.addEventListener('mousemove', moveDial);
    });

    document.addEventListener('mouseup', function() {
        document.body.style.cursor = 'default';
        document.removeEventListener('mousemove', moveDial);
    });

    function moveDial(e) {
        const container = document.querySelector('.dial-container');
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;

        // Calculer la position relative du curseur dans le conteneur
        let position = e.clientX - containerRect.left;

        // Limiter la position dans les limites du conteneur
        if (position < 5) position = 5;
        if (position > containerWidth - 35) position = containerWidth - 35;

        // Déplacer le bouton
        dial.style.left = `${position}px`;

        // Calculer et afficher la fréquence (entre 66.0 et 99.9)
        const frequencyValue = (66.0 + (position / containerWidth) * 33.9).toFixed(1);
        frequency.textContent = `FM ${frequencyValue}`;

        // Effet sonore statique aléatoire
        if (Math.random() > 0.7) {
            playStaticSound();
        }
    }

    function playStaticSound() {
        // Créer un son statique avec l'API Web Audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const staticBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.1, audioContext.sampleRate);
        const staticData = staticBuffer.getChannelData(0);

        // Remplir le buffer avec du bruit blanc
        for (let i = 0; i < staticBuffer.length; i++) {
            staticData[i] = Math.random() * 2 - 1;
        }

        // Jouer le son
        const staticSource = audioContext.createBufferSource();
        staticSource.buffer = staticBuffer;

        // Créer un gain node pour contrôler le volume
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.03; // Volume très bas

        // Connecter les nodes
        staticSource.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Jouer le son
        staticSource.start();
    }

    // Animation de défilement fluide pour les liens de navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });

    // Effet de survol pour les cartes
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px var(--shadow-color)';
            this.style.transition = 'transform 0.3s, box-shadow 0.3s';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 6px 12px var(--shadow-color)';
        });
    });

    // Easter egg: message caché dans la console
    console.log("%cBienvenue dans l'émission de Kim Tursley!", "color: #ff4500; font-size: 20px; font-weight: bold;");
    console.log("%cSouriez, chers auditeurs. Le spectacle ne fait que commencer...", "color: #ff8c00; font-style: italic;");

    // Ajout d'effets Danganronpa

    // Effet de glitch aléatoire sur le titre
    const title = document.querySelector('h1');
    setInterval(() => {
        if (Math.random() > 0.95) {
            title.classList.add('glitch-effect');
            setTimeout(() => {
                title.classList.remove('glitch-effect');
            }, 200);
        }
    }, 3000);

    // Effet de sang qui coule
    const bloodDrops = document.createElement('div');
    bloodDrops.className = 'blood-drops';
    document.querySelector('.container').appendChild(bloodDrops);

    for (let i = 0; i < 5; i++) {
        const drop = document.createElement('div');
        drop.className = 'blood-drop';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDelay = `${Math.random() * 5}s`;
        drop.style.animationDuration = `${5 + Math.random() * 10}s`;
        bloodDrops.appendChild(drop);
    }

    // Effet de distorsion audio lors du survol du nom
    title.addEventListener('mouseover', () => {
        playDistortedSound();
    });

    function playDistortedSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    }

    // Effet de transition de classe (comme dans les procès)
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Effet de pulsation pour le rôle "Mastermind"
    const roleText = document.querySelector('.role p');
    if (roleText && roleText.textContent.includes('Mastermind')) {
        roleText.style.color = '#ff1414';
        roleText.style.fontWeight = 'bold';
    }

    // Ajout d'un effet de "découverte" de la vérité
    document.querySelectorAll('.info-item, .traits-list li, .preferences-list li').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('revealed');
            if (this.classList.contains('revealed')) {
                this.style.backgroundColor = 'rgba(255, 20, 20, 0.1)';
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'all 0.3s';
                playRevealSound();
            } else {
                this.style.backgroundColor = '';
                this.style.transform = '';
            }
        });
    });

    function playRevealSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Do
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Mi
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Sol

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    }
});