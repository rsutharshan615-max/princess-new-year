// Visual Effects and Animations for New Year Surprise Website
class EffectsEngine {
    constructor() {
        this.isInitialized = false;
        this.fireworksInterval = null;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        this.isInitialized = true;
        
        // Initialize all effects
        this.initFireworks();
        this.initConfetti();
        this.initHeartParticles();
        this.initSparkles();
        this.initBackgroundAnimations();
    }

    // Fireworks Effects
    initFireworks() {
        this.createFireworksContainer();
    }

    createFireworksContainer() {
        let container = document.querySelector('.fireworks-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'fireworks-container';
            document.querySelector('.bg-animation').appendChild(container);
        }
        return container;
    }

    startFireworks() {
        if (this.fireworksInterval) return;
        
        this.fireworksInterval = setInterval(() => {
            this.createFirework();
        }, 1500);
        
        // Create initial burst
        for (let i = 0; i < 3; i++) {
            setTimeout(() => this.createFirework(), i * 500);
        }
    }

    stopFireworks() {
        if (this.fireworksInterval) {
            clearInterval(this.fireworksInterval);
            this.fireworksInterval = null;
        }
    }

    createFirework() {
        const container = this.createFireworksContainer();
        const colors = ['#FF69B4', '#FFD700', '#87CEEB', '#98FB98', '#9B59B6', '#FF6347'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const firework = document.createElement('div');
        firework.className = 'firework-burst';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.6;
        
        firework.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 10px ${color};
            pointer-events: none;
            z-index: 999;
        `;
        
        container.appendChild(firework);
        
        // Create explosion
        setTimeout(() => {
            this.createFireworkExplosion(x, y, color);
            firework.remove();
        }, 800);
    }

    createFireworkExplosion(x, y, color) {
        const container = this.createFireworksContainer();
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const angle = (i * 360 / particleCount) * Math.PI / 180;
            const velocity = 80 + Math.random() * 40;
            
            particle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 3px;
                height: 3px;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 6px ${color};
                pointer-events: none;
                z-index: 999;
            `;
            
            container.appendChild(particle);
            
            this.animateParticle(particle, angle, velocity, color);
        }
    }

    animateParticle(particle, angle, velocity, color) {
        let distance = 0;
        let opacity = 1;
        const gravity = 0.5;
        let velocityY = 0;
        
        const animate = () => {
            distance += 3;
            velocityY += gravity;
            
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance + velocityY;
            
            particle.style.transform = `translate(${dx}px, ${dy}px)`;
            opacity = Math.max(0, 1 - (distance / velocity));
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Confetti Effects
    initConfetti() {
        this.createConfettiContainer();
    }

    createConfettiContainer() {
        let container = document.querySelector('.confetti-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'confetti-container';
            document.querySelector('.bg-animation').appendChild(container);
        }
        return container;
    }

    createConfetti() {
        const container = this.createConfettiContainer();
        const colors = ['#FF69B4', '#FFD700', '#87CEEB', '#98FB98', '#9B59B6', '#FF6347', '#FFF'];
        const shapes = ['square', 'circle', 'triangle'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                const color = colors[Math.floor(Math.random() * colors.length)];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                const size = Math.random() * 8 + 4;
                const duration = Math.random() * 3 + 2;
                
                confetti.style.cssText = `
                    position: absolute;
                    top: -20px;
                    left: ${Math.random() * 100}%;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    opacity: ${Math.random() * 0.5 + 0.5};
                    animation: confettiFall ${duration}s linear forwards;
                    pointer-events: none;
                    z-index: 998;
                    transform: rotate(${Math.random() * 360}deg);
                `;
                
                if (shape === 'circle') {
                    confetti.style.borderRadius = '50%';
                } else if (shape === 'triangle') {
                    confetti.style.width = '0';
                    confetti.style.height = '0';
                    confetti.style.borderLeft = `${size/2}px solid transparent`;
                    confetti.style.borderRight = `${size/2}px solid transparent`;
                    confetti.style.borderBottom = `${size}px solid ${color}`;
                    confetti.style.background = 'transparent';
                }
                
                container.appendChild(confetti);
                setTimeout(() => confetti.remove(), duration * 1000);
            }, i * 50);
        }
    }

    // Heart Particles
    initHeartParticles() {
        // Heart particle creation is handled by click events
    }

    createHeartParticle(x, y) {
        const hearts = ['💕', '💖', '💗', '💝', '❤️'];
        const heart = document.createElement('div');
        const heartType = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.innerHTML = heartType;
        heart.className = 'heart-particle';
        heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${Math.random() * 10 + 15}px;
            pointer-events: none;
            z-index: 9999;
            animation: heartParticle 2s ease-out forwards;
            --x: ${(Math.random() - 0.5) * 100}px;
            --y: ${(Math.random() - 0.5) * 100 - 50}px;
        `;
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }

    // Sparkles
    initSparkles() {
        this.createSparklesContainer();
        this.startRandomSparkles();
    }

    createSparklesContainer() {
        let container = document.querySelector('.sparkles');
        if (!container) {
            container = document.createElement('div');
            container.className = 'sparkles';
            document.querySelector('.bg-animation').appendChild(container);
        }
        return container;
    }

    startRandomSparkles() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createSparkle();
            }
        }, 2000);
    }

    createSparkle() {
        const container = this.createSparklesContainer();
        const sparkle = document.createElement('div');
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: #FFD700;
            border-radius: 50%;
            box-shadow: 0 0 10px #FFD700;
            animation: sparkle 2s ease-in-out;
            pointer-events: none;
            z-index: 997;
        `;
        
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
    }

    // Background Animations
    initBackgroundAnimations() {
        this.createFloatingElements();
        this.initParallaxEffect();
    }

    createFloatingElements() {
        // Create floating hearts
        this.createFloatingHearts();
        
        // Create floating gifts (for surprises page)
        this.createFloatingGifts();
        
        // Create floating dreams (for future page)
        this.createFloatingDreams();
    }

    createFloatingHearts() {
        const bgAnimation = document.querySelector('.bg-animation');
        if (!bgAnimation) return;
        
        let container = bgAnimation.querySelector('.floating-hearts');
        if (!container) {
            container = document.createElement('div');
            container.className = 'floating-hearts';
            bgAnimation.appendChild(container);
        }
        
        const hearts = ['💕', '💖', '💗', '💝'];
        
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = `${i * 20 + 10}%`;
            heart.style.animationDelay = `${i * 0.8}s`;
            container.appendChild(heart);
        }
    }

    createFloatingGifts() {
        const bgAnimation = document.querySelector('.bg-animation');
        if (!bgAnimation) return;
        
        let container = bgAnimation.querySelector('.floating-gifts');
        if (!container) {
            container = document.createElement('div');
            container.className = 'floating-gifts';
            bgAnimation.appendChild(container);
        }
        
        const gifts = ['🎁', '🎀', '🎈', '🎊'];
        
        for (let i = 0; i < 4; i++) {
            const gift = document.createElement('div');
            gift.className = 'floating-gift';
            gift.innerHTML = gifts[Math.floor(Math.random() * gifts.length)];
            gift.style.left = `${i * 25 + 5}%`;
            gift.style.animationDelay = `${i * 1}s`;
            container.appendChild(gift);
        }
    }

    createFloatingDreams() {
        const bgAnimation = document.querySelector('.bg-animation');
        if (!bgAnimation) return;
        
        let container = bgAnimation.querySelector('.floating-dreams');
        if (!container) {
            container = document.createElement('div');
            container.className = 'floating-dreams';
            bgAnimation.appendChild(container);
        }
        
        const dreams = ['🌟', '✨', '🌈', '🎆'];
        
        for (let i = 0; i < 4; i++) {
            const dream = document.createElement('div');
            dream.className = 'floating-dream';
            dream.innerHTML = dreams[i];
            dream.style.left = `${i * 25 + 5}%`;
            dream.style.animationDelay = `${i * 1.2}s`;
            container.appendChild(dream);
        }
    }

    initParallaxEffect() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            const floatingElements = document.querySelectorAll('.floating-hearts, .floating-gifts, .floating-dreams');
            floatingElements.forEach(element => {
                const speed = element.classList.contains('floating-hearts') ? 20 : 15;
                const x = mouseX * speed;
                const y = mouseY * speed;
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Special Effects
    createHeartRain() {
        const hearts = ['💕', '💖', '💗', '💝', '❤️'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart-rain';
                heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.animationDelay = `${Math.random() * 2}s`;
                heart.style.animationDuration = `${Math.random() * 3 + 4}s`;
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 7000);
            }, i * 100);
        }
    }

    createRainbowBurst() {
        const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < colors.length; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    width: 10px;
                    height: 10px;
                    background: ${colors[i]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: rainbowBurst 2s ease-out forwards;
                `;
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }

    createCelebrationBurst() {
        this.createConfetti();
        this.createHeartRain();
        setTimeout(() => this.startFireworks(), 500);
        setTimeout(() => this.stopFireworks(), 5000);
    }

    // Utility Methods
    addClickEffect(element, effectType = 'hearts') {
        element.addEventListener('click', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            
            switch (effectType) {
                case 'hearts':
                    this.createHeartParticle(x, y);
                    break;
                case 'sparkles':
                    this.createSparkleBurst(x, y);
                    break;
                case 'confetti':
                    this.createMiniConfetti(x, y);
                    break;
            }
        });
    }

    createSparkleBurst(x, y) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            const angle = (i * 45) * Math.PI / 180;
            
            sparkle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 6px;
                height: 6px;
                background: #FFD700;
                border-radius: 50%;
                box-shadow: 0 0 10px #FFD700;
                pointer-events: none;
                z-index: 9999;
            `;
            
            document.body.appendChild(sparkle);
            
            this.animateParticle(sparkle, angle, 50, '#FFD700');
        }
    }

    createMiniConfetti(x, y) {
        const colors = ['#FF69B4', '#FFD700', '#87CEEB', '#98FB98'];
        
        for (let i = 0; i < 12; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = (i * 30) * Math.PI / 180;
            
            confetti.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 6px;
                height: 6px;
                background: ${color};
                pointer-events: none;
                z-index: 9999;
            `;
            
            document.body.appendChild(confetti);
            
            this.animateParticle(confetti, angle, 40, color);
        }
    }

    destroy() {
        this.stopFireworks();
        
        // Clean up containers
        const containers = document.querySelectorAll('.fireworks-container, .confetti-container, .sparkles');
        containers.forEach(container => container.innerHTML = '');
    }
}

// Initialize effects engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.effectsEngine = new EffectsEngine();
    
    // Add global click effect for heart particles
    document.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && !e.target.closest('button') && !e.target.closest('input')) {
            window.effectsEngine.createHeartParticle(e.clientX, e.clientY);
        }
    });
});

// Export for use in other files
window.EffectsEngine = EffectsEngine;

// Helper functions for backward compatibility
function startFireworks() {
    if (window.effectsEngine) {
        window.effectsEngine.startFireworks();
    }
}

function createConfetti() {
    if (window.effectsEngine) {
        window.effectsEngine.createConfetti();
    }
}

function createHeartParticle(x, y) {
    if (window.effectsEngine) {
        window.effectsEngine.createHeartParticle(x, y);
    }
}

function createHeartRain() {
    if (window.effectsEngine) {
        window.effectsEngine.createHeartRain();
    }
}

function createCelebrationBurst() {
    if (window.effectsEngine) {
        window.effectsEngine.createCelebrationBurst();
    }
}
