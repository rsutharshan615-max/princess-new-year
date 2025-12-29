// New Year Countdown Timer
class CountdownTimer {
    constructor(targetDate = '2025-01-01T00:00:00') {
        this.targetDate = new Date(targetDate).getTime();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.init();
    }

    init() {
        this.updateCountdown();
        this.interval = setInterval(() => this.updateCountdown(), 1000);
        
        // Add some visual effects
        this.addGlowEffect();
        this.startCelebrationCheck();
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            this.handleCountdownComplete();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.updateDisplay(days, hours, minutes, seconds);
        this.addPulseEffect(seconds);
    }

    updateDisplay(days, hours, minutes, seconds) {
        if (this.elements.days) {
            this.elements.days.textContent = this.formatNumber(days);
            this.animateNumber(this.elements.days);
        }
        if (this.elements.hours) {
            this.elements.hours.textContent = this.formatNumber(hours);
            this.animateNumber(this.elements.hours);
        }
        if (this.elements.minutes) {
            this.elements.minutes.textContent = this.formatNumber(minutes);
            this.animateNumber(this.elements.minutes);
        }
        if (this.elements.seconds) {
            this.elements.seconds.textContent = this.formatNumber(seconds);
            this.animateNumber(this.elements.seconds);
        }
    }

    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }

    animateNumber(element) {
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }

    addPulseEffect(seconds) {
        if (seconds === 0) {
            document.querySelectorAll('.countdown-item').forEach(item => {
                item.classList.add('animate-pulse');
                setTimeout(() => {
                    item.classList.remove('animate-pulse');
                }, 1000);
            });
        }
    }

    addGlowEffect() {
        document.querySelectorAll('.countdown-item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                item.style.boxShadow = '0 0 30px rgba(255, 105, 180, 0.6)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    startCelebrationCheck() {
        // Check every minute if we should celebrate
        this.celebrationInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = this.targetDate - now;
            const minutes = Math.floor(distance / (1000 * 60));
            
            // Create mini celebration at special moments
            if (minutes <= 60 && minutes % 10 === 0) {
                this.createMiniCelebration();
            }
        }, 60000); // Check every minute
    }

    createMiniCelebration() {
        // Create floating hearts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💕';
                heart.style.cssText = `
                    position: fixed;
                    bottom: -50px;
                    left: ${Math.random() * 100}%;
                    font-size: ${Math.random() * 20 + 20}px;
                    animation: heartFloat 4s ease-out forwards;
                    pointer-events: none;
                    z-index: 9999;
                `;
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 4000);
            }, i * 200);
        }
    }

    handleCountdownComplete() {
        clearInterval(this.interval);
        clearInterval(this.celebrationInterval);
        
        // Show celebration message
        this.showCelebrationMessage();
        
        // Auto-transition to wish page after delay
        setTimeout(() => {
            window.location.href = 'wish.html';
        }, 5000);
        
        // Start major celebration
        this.startMajorCelebration();
    }

    showCelebrationMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #FF69B4, #9B59B6);
                color: white;
                padding: 30px 50px;
                border-radius: 20px;
                font-size: 2rem;
                font-weight: bold;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: fadeIn 1s ease-out;
            ">
                🎉 Happy New Year! 🎉
                <br>
                <span style="font-size: 1.2rem; font-weight: normal;">
                    Let the celebration begin!
                </span>
            </div>
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 5000);
    }

    startMajorCelebration() {
        // Create fireworks
        this.createFireworks();
        
        // Create confetti
        this.createConfetti();
        
        // Create floating hearts
        this.createHeartRain();
    }

    createFireworks() {
        const colors = ['#FF69B4', '#FFD700', '#87CEEB', '#98FB98', '#9B59B6'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.5;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                firework.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    width: 4px;
                    height: 4px;
                    background: ${color};
                    border-radius: 50%;
                    animation: firework 1.5s ease-out forwards;
                    pointer-events: none;
                    z-index: 9999;
                `;
                
                document.body.appendChild(firework);
                
                // Create explosion particles
                setTimeout(() => {
                    this.createExplosion(x, y, color);
                }, 500);
                
                setTimeout(() => firework.remove(), 1500);
            }, i * 200);
        }
    }

    createExplosion(x, y, color) {
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const angle = (i * 30) * Math.PI / 180;
            const velocity = 100;
            
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 3px;
                height: 3px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            let distance = 0;
            const animateParticle = () => {
                distance += 5;
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance + (distance * distance) / 100; // gravity effect
                
                particle.style.transform = `translate(${dx}px, ${dy}px)`;
                particle.style.opacity = 1 - (distance / velocity);
                
                if (distance < velocity) {
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animateParticle);
        }
    }

    createConfetti() {
        const colors = ['#FF69B4', '#FFD700', '#87CEEB', '#98FB98', '#9B59B6', '#FF6347'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${color};
                opacity: ${Math.random() * 0.5 + 0.5};
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
                pointer-events: none;
                z-index: 9998;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }
    }

    createHeartRain() {
        const hearts = ['💕', '💖', '💗', '💝', '❤️'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                const heartType = hearts[Math.floor(Math.random() * hearts.length)];
                
                heart.innerHTML = heartType;
                heart.style.cssText = `
                    position: fixed;
                    top: -50px;
                    left: ${Math.random() * 100}%;
                    font-size: ${Math.random() * 20 + 20}px;
                    animation: heartFloat ${Math.random() * 3 + 4}s ease-out forwards;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0.8;
                `;
                
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 7000);
            }, i * 150);
        }
    }

    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.celebrationInterval) {
            clearInterval(this.celebrationInterval);
        }
    }
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set target date to New Year
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const targetDate = `${nextYear}-01-01T00:00:00`;
    
    window.countdownTimer = new CountdownTimer(targetDate);
    
    // Add enter button functionality
    const enterBtn = document.getElementById('enterBtn');
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            // Create celebration effect
            createClickCelebration();
            
            // Navigate to wish page after a short delay
            setTimeout(() => {
                window.location.href = 'wish.html';
            }, 1000);
        });
    }
    
    // Music control
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    
    if (musicBtn && bgMusic) {
        let isPlaying = false;
        
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.querySelector('.music-text').textContent = 'Play Music';
                musicBtn.classList.remove('playing');
            } else {
                bgMusic.play().catch(e => {
                    console.log('Audio play failed:', e);
                });
                musicBtn.querySelector('.music-text').textContent = 'Pause Music';
                musicBtn.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });
    }
    
    // Secret message click
    const secretMessage = document.getElementById('secretMessage');
    if (secretMessage) {
        let clickCount = 0;
        document.addEventListener('click', (e) => {
            if (e.target.closest('.hero-section') && !e.target.closest('button')) {
                clickCount++;
                if (clickCount === 5) {
                    secretMessage.style.display = 'block';
                    secretMessage.classList.add('animate-fade-in');
                    setTimeout(() => {
                        secretMessage.style.display = 'none';
                    }, 5000);
                    clickCount = 0;
                }
            }
        });
    }
});

// Helper function for click celebration
function createClickCelebration() {
    const colors = ['#FF69B4', '#FFD700', '#87CEEB'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(particle);
        
        // Animate outward
        const angle = (i * 24) * Math.PI / 180;
        let distance = 0;
        
        const animate = () => {
            distance += 8;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            
            particle.style.transform = `translate(${dx}px, ${dy}px)`;
            particle.style.opacity = 1 - (distance / 200);
            
            if (distance < 200) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Export for use in other files
window.CountdownTimer = CountdownTimer;
