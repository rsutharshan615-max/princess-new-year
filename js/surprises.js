// Interactive Surprises JavaScript
class SurpriseEngine {
    constructor() {
        this.isInitialized = false;
        this.surpriseData = this.loadSurpriseData();
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        this.isInitialized = true;
        
        this.initScratchCard();
        this.initSecretCode();
        this.initSpinWheel();
        this.initComplimentGenerator();
        this.initPromiseBox();
        this.initSurpriseBox();
        this.initMemoryCards();
        this.initBirthdayCode();
    }

    loadSurpriseData() {
        return {
            scratchMessages: [
                "You're my favorite human! 💖",
                "You make every day brighter! ✨",
                "Your smile lights up the world! 😊",
                "You're absolutely amazing! 🌟",
                "I'm so lucky to have you! 🍀",
                "You're stronger than you know! 💪",
                "Your kindness changes everything! 🌈",
                "You deserve all the happiness! 🎉"
            ],
            secretCodes: ['bestie', 'chella', 'soulmate', 'partner', 'rideordie', 'bff', 'forever'],
            secretMessages: [
                "🌟 You're the sister I always wanted, the friend I always needed, and the bestie I'll never deserve! 🌟",
                "💕 In a world full of temporary people, you're my forever. Thank you for being unapologetically you! 💕",
                "🦋 You've grown so much and I'm honored to witness your journey. You're going to do amazing things! 🦋",
                "🎯 You have this incredible ability to make everyone feel special, but you're the most special of all! 🎯",
                "🌈 Thank you for painting my world with your colors. Life with you is never boring! 🌈"
            ],
            wheelPrizes: [
                "Chocolates 🍫",
                "Pani Puri 🍱",
                "Life Advice 🧠",
                "Dance Party 🕺",
                "Special Gifts 🎁",
                "Free Hug 🤗"
            ],
            compliments: [
                "Your laugh is contagious and makes everything better! 😄",
                "You have the biggest heart of anyone I know! ❤️",
                "Your strength inspires me every single day! 💪",
                "You're smarter than you give yourself credit for! 🧠",
                "Your kindness changes lives, starting with mine! 🌟",
                "You have an amazing sense of humor! 😂",
                "Your friendship is the greatest gift in my life! 🎁",
                "You light up every room you enter! ✨",
                "Your determination is absolutely admirable! 🎯",
                "You have this way of making everyone feel special! 🌈"
            ]
        };
    }

    // Birthday Code Implementation
    initBirthdayCode() {
        const unlockBtn = document.getElementById('unlockBirthday');
        const codeInput = document.getElementById('birthdayCode');
        
        if (unlockBtn && codeInput) {
            unlockBtn.addEventListener('click', () => {
                this.checkBirthdayCode(codeInput.value);
            });
            
            codeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkBirthdayCode(codeInput.value);
                }
            });

            // Auto-format input as DD/MM/YYYY
            codeInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2);
                }
                if (value.length >= 5) {
                    value = value.slice(0, 5) + '/' + value.slice(5, 9);
                }
                e.target.value = value;
            });
        }
    }

    checkBirthdayCode(code) {
        const correctCode = '01052005'; // DDMMYYYY format
        const formattedCode = code.replace(/\//g, '');
        
        const surpriseDiv = document.getElementById('birthdaySurprise');
        const input = document.getElementById('birthdayCode');
        
        if (formattedCode === correctCode) {
            // Success!
            if (surpriseDiv) {
                surpriseDiv.classList.remove('hidden');
                surpriseDiv.classList.add('reveal');
                
                // Create celebration effect
                this.createCelebrationBurst();
                
                // Animate photos
                this.animatePhotos();
                
                // Clear input
                input.value = '';
                input.placeholder = '✨ Correct! Surprise unlocked!';
            }
        } else {
            // Wrong code
            input.classList.add('shake');
            setTimeout(() => {
                input.classList.remove('shake');
            }, 500);
            
            // Show hint
            if (formattedCode.length === 8) {
                input.placeholder = '❌ Wrong! Try again...';
            }
        }
    }

    animatePhotos() {
        const photos = document.querySelectorAll('.photo-item');
        photos.forEach((photo, index) => {
            photo.style.opacity = '0';
            photo.style.transform = 'translateY(20px)';
            setTimeout(() => {
                photo.style.transition = 'all 0.5s ease-out';
                photo.style.opacity = '1';
                photo.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Scratch Card Implementation
    initScratchCard() {
        const canvas = document.getElementById('scratchCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let isScratching = false;
        let scratchedPixels = 0;
        const totalPixels = canvas.width * canvas.height;
        
        // Set canvas size properly
        canvas.width = 300;
        canvas.height = 200;
        
        // Initialize scratch card with random message
        this.resetScratchCard(ctx, canvas);
        
        // Mouse events
        canvas.addEventListener('mousedown', (e) => {
            isScratching = true;
            this.scratch(e, ctx, canvas);
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (isScratching) {
                this.scratch(e, ctx, canvas);
            }
        });
        
        canvas.addEventListener('mouseup', () => {
            isScratching = false;
        });
        
        canvas.addEventListener('mouseleave', () => {
            isScratching = false;
        });
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isScratching = true;
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            this.scratchAt(x, y, ctx, canvas);
        }, { passive: false });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (isScratching) {
                const touch = e.touches[0];
                const rect = canvas.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                this.scratchAt(x, y, ctx, canvas);
            }
        }, { passive: false });
        
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            isScratching = false;
        }, { passive: false });
        
        // Reset button
        const resetBtn = document.querySelector('.reset-scratch');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetScratchCard(ctx, canvas);
            });
        }
    }

    resetScratchCard(ctx, canvas) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#FF69B4');
        gradient.addColorStop(1, '#FF1493');
        
        // Set scratch surface with gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add decorative elements
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = 'bold 28px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('🎈 SCRATCH ME! 🎈', canvas.width / 2, canvas.height / 2 - 10);
        
        ctx.font = '16px Poppins';
        ctx.fillText('Reveal your surprise!', canvas.width / 2, canvas.height / 2 + 20);
        
        // Add sparkle effects
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 3 + 1;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Update hidden message
        const messages = this.surpriseData.scratchMessages;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const messageElement = document.querySelector('.scratch-message');
        if (messageElement) {
            messageElement.textContent = randomMessage;
        }
        
        // Reset canvas opacity and pointer events
        canvas.style.opacity = '1';
        canvas.style.pointerEvents = 'auto';
        
        // Make sure canvas is properly positioned
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '10';
        canvas.style.cursor = 'crosshair';
    }

    scratch(e, ctx, canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.scratchAt(x, y, ctx, canvas);
    }

    scratchAt(x, y, ctx, canvas) {
        // Create scratch effect
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
        
        // Add scratch texture
        for (let i = 0; i < 5; i++) {
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            const size = Math.random() * 10 + 5;
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Check if enough has been scratched
        this.checkScratchProgress(ctx, canvas);
    }

    checkScratchProgress(ctx, canvas) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparent = 0;
        
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] < 128) {
                transparent++;
            }
        }
        
        const percentage = (transparent / (canvas.width * canvas.height)) * 100;
        
        if (percentage > 60) {
            this.revealScratchMessage();
        }
    }

    revealScratchMessage() {
        const canvas = document.getElementById('scratchCanvas');
        if (canvas) {
            // Fade out the canvas
            canvas.style.transition = 'opacity 0.5s ease';
            canvas.style.opacity = '0';
            canvas.style.pointerEvents = 'none';
            
            // Add celebration effect
            this.createMiniCelebration();
            
            // Reset after delay
            setTimeout(() => {
                canvas.style.transition = 'none';
                const ctx = canvas.getContext('2d');
                this.resetScratchCard(ctx, canvas);
                setTimeout(() => {
                    canvas.style.transition = 'opacity 0.5s ease';
                }, 100);
            }, 3000);
        }
    }

    // Secret Code Implementation
    initSecretCode() {
        const unlockBtn = document.getElementById('unlockBtn');
        const codeInput = document.getElementById('secretCode');
        
        if (unlockBtn && codeInput) {
            unlockBtn.addEventListener('click', () => {
                this.checkSecretCode(codeInput.value.toLowerCase());
            });
            
            codeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkSecretCode(codeInput.value);
                }
            });

            // Auto-format input as DD/MM/YYYY
            codeInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2);
                }
                if (value.length >= 5) {
                    value = value.slice(0, 5) + '/' + value.slice(5, 9);
                }
                e.target.value = value;
            });
        }
    }

    checkSecretCode(code) {
        const correctCode = '28102004'; // DDMMYYYY format for 28/10/2004
        const formattedCode = code.replace(/\//g, '');
        
        const secretDiv = document.getElementById('secretMessage');
        const input = document.getElementById('secretCode');
        
        if (formattedCode === correctCode) {
            // Success!
            if (secretDiv) {
                secretDiv.classList.remove('hidden');
                secretDiv.classList.add('reveal');
                
                // Create celebration effect
                createConfetti();
            }
            
            // Clear input
            input.value = '';
            input.placeholder = '✨ Correct! Message unlocked!';
        } else {
            // Wrong code
            input.classList.add('shake');
            setTimeout(() => {
                input.classList.remove('shake');
            }, 500);
            
            // Show hint
            if (formattedCode.length === 8) {
                input.placeholder = '❌ Wrong! Try again...';
            }
        }
    }

    // Spin Wheel Implementation
    initSpinWheel() {
        const spinBtn = document.getElementById('spinBtn');
        const wheel = document.getElementById('wheel');
        
        if (spinBtn && wheel) {
            spinBtn.addEventListener('click', () => {
                this.spinWheel(wheel, spinBtn);
            });
        }
    }

    spinWheel(wheel, spinBtn) {
        if (spinBtn.disabled) return;
        
        spinBtn.disabled = true;
        spinBtn.textContent = 'Spinning...';
        
        const prizes = this.surpriseData.wheelPrizes;
        const randomDegree = Math.floor(Math.random() * 360) + 720; // At least 2 full rotations
        const prizeIndex = Math.floor(((randomDegree % 360) + 15) / 45) % prizes.length; // Adjust for segment size
        
        wheel.style.transform = `rotate(${randomDegree}deg)`;
        
        setTimeout(() => {
            const prize = prizes[prizeIndex];
            this.showWheelResult(prize);
            
            spinBtn.disabled = false;
            spinBtn.textContent = 'SPIN! 🎰';
        }, 3000);
    }

    showWheelResult(prize) {
        const resultDiv = document.getElementById('wheelResult');
        const resultText = resultDiv.querySelector('.result-text');
        
        if (resultDiv && resultText) {
            resultText.textContent = `🎉 You won: ${prize}`;
            resultDiv.classList.remove('hidden');
            resultDiv.classList.add('animate-bounce');
            
            // Celebration
            this.createMiniCelebration();
            
            // Hide after delay
            setTimeout(() => {
                resultDiv.classList.add('hidden');
                resultDiv.classList.remove('animate-bounce');
            }, 5000);
        }
    }

    // Compliment Generator Implementation
    initComplimentGenerator() {
        const complimentBtn = document.getElementById('complimentBtn');
        if (complimentBtn) {
            complimentBtn.addEventListener('click', () => {
                this.showCompliment();
            });
        }
    }

    showCompliment() {
        const compliments = this.surpriseData.compliments;
        const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        const complimentElement = document.getElementById('complimentText');
        
        if (complimentElement) {
            complimentElement.textContent = randomCompliment;
            complimentElement.classList.add('animate-glow');
            
            // Create heart effect
            this.createHeartBurst();
            
            // Remove animation class
            setTimeout(() => {
                complimentElement.classList.remove('animate-glow');
            }, 2000);
        }
    }

    // Promise Box Implementation
    initPromiseBox() {
        const promiseBtn = document.getElementById('promiseBtn');
        if (promiseBtn) {
            promiseBtn.addEventListener('click', () => {
                this.checkPromises();
            });
        }
    }

    checkPromises() {
        const checkboxes = document.querySelectorAll('.promise-item input:checked');
        const checkedCount = checkboxes.length;
        
        if (checkedCount >= 3) {
            // Success!
            this.sealPromises();
        } else {
            // Not enough promises checked
            this.showPromiseHint();
        }
    }

    sealPromises() {
        // Check all promises
        document.querySelectorAll('.promise-item input').forEach(checkbox => {
            checkbox.checked = true;
        });
        
        // Show success message
        const resultDiv = document.getElementById('sealResult');
        if (resultDiv) {
            resultDiv.classList.remove('hidden');
            resultDiv.classList.add('animate-bounce');
        }
        
        // Celebration
        this.createCelebrationBurst();
        
        // Alert
        setTimeout(() => {
            alert('🎉 Our friendship promises are sealed! Forever and always! 💕');
        }, 1000);
    }

    showPromiseHint() {
        alert('🤗 Check at least 3 promises to seal our friendship pact!');
    }

    // Surprise Box Implementation
    initSurpriseBox() {
        const boxLid = document.querySelector('.box-lid');
        if (boxLid) {
            boxLid.addEventListener('click', () => {
                this.openSurpriseBox();
            });
        }
        
        const acceptBtn = document.getElementById('acceptAward');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                this.acceptAward();
            });
        }
    }

    openSurpriseBox() {
        const boxLid = document.querySelector('.box-lid');
        const boxContent = document.querySelector('.box-content');
        
        if (boxLid && boxContent) {
            boxLid.classList.add('open');
            boxContent.classList.remove('hidden');
            
            // Celebration
            this.createCelebrationBurst();
        }
    }

    acceptAward() {
        alert('🏆 Award accepted! You\'ll receive your official certificate via bestie telepathy! 💕');
        this.createHeartRain();
    }

    // Memory Cards Implementation
    initMemoryCards() {
        const memoryCards = document.querySelectorAll('.memory-card');
        memoryCards.forEach(card => {
            card.addEventListener('click', () => {
                this.revealMemorySecret(card);
            });
        });
    }

    revealMemorySecret(card) {
        const secret = card.querySelector('.memory-secret');
        if (secret && secret.classList.contains('hidden')) {
            secret.classList.remove('hidden');
            secret.classList.add('reveal');
            card.classList.add('glow');
            
            // Create small celebration
            this.createMiniCelebration();
        }
    }

    // Special Effects
    createMiniCelebration() {
        // Create a small burst of hearts
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💕';
                heart.style.cssText = `
                    position: fixed;
                    left: 50%;
                    top: 50%;
                    font-size: ${Math.random() * 15 + 10}px;
                    animation: heartParticle 1.5s ease-out forwards;
                    pointer-events: none;
                    z-index: 9999;
                    --x: ${(Math.random() - 0.5) * 150}px;
                    --y: ${(Math.random() - 0.5) * 150}px;
                `;
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 1500);
            }, i * 50);
        }
    }

    createCelebrationBurst() {
        if (window.effectsEngine) {
            window.effectsEngine.createCelebrationBurst();
        }
    }

    createHeartRain() {
        if (window.effectsEngine) {
            window.effectsEngine.createHeartRain();
        }
    }

    createHeartBurst() {
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `
                position: fixed;
                left: 50%;
                top: 50%;
                font-size: 1.5rem;
                animation: heartBurst 2s ease-out forwards;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%) rotate(${i * 45}deg) translateY(-100px);
            `;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }
    }

    destroy() {
        // Clean up any ongoing animations or intervals
        this.isInitialized = false;
    }
}

// Roast or Praise Game Logic - Reimagined
class RoastOrPraiseGame {
    constructor() {
        this.clickCount = 0;
        this.braveLevel = 0;
        this.praiseMessages = [
            "You make people feel safe just by being yourself 💖",
            "You're rare. Like really rare ✨",
            "Someone's comfort person = YOU 🫶",
            "Your laugh is contagious 😄",
            "You have a heart of pure gold 🏆",
            "You're stronger than you give yourself credit for 💪",
            "Your kindness changes lives 🌟",
            "You're the definition of a true friend 🤗",
            "You light up every room you enter 💡",
            "Your wisdom beyond years is amazing 🧠",
            "You're someone's reason to smile 😊",
            "Your authenticity is refreshing 🌸",
            "You make the world a better place 🌍",
            "Your friendship is a treasure 💎",
            "You're absolutely unforgettable 🌺"
        ];
        
        this.lightRoasts = [
            "You say 'I'm fine' like a professional liar 😈",
            "Your '5 minutes' means 30 minutes ⏰",
            "You have 100 tabs open in your brain 🧠",
            "You're suspiciously good at finding problems 🔍",
            "Your mood swings have mood swings 🎢",
            "You're allergic to early mornings ☕",
            "Your phone battery dies faster than your motivation 📱",
            "You say 'one last thing' but it's never one thing 🤷‍♀️"
        ];
        
        this.spicyRoasts = [
            "You overthink so much even Google gets tired 😈🔥",
            "Drama level: Netflix Original 🎬",
            "Your 'I'm fine' and mean 47 emotions 😏",
            "You're the queen of 'I'll do it later' 👑",
            "Your drama could win an Oscar 🏆",
            "You have a PhD in overthinking 🎓",
            "You're basically a walking meme generator 😈",
            "Your emotional range is impressive 😂"
        ];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        const button = document.getElementById('roastPraiseBtn');
        if (button) {
            button.addEventListener('click', () => this.handleClick());
        }
    }
    
    handleClick() {
        this.clickCount++;
        this.updateBraveMeter();
        
        let message, isRoast;
        
        if (this.clickCount === 1) {
            // First click - guaranteed praise
            message = this.getRandomMessage(this.praiseMessages);
            isRoast = false;
            this.updateButtonText("👉 Again… maybe 😏");
        } else if (this.clickCount === 2) {
            // Second click - mixed zone
            if (Math.random() < 0.5) {
                message = this.getRandomMessage(this.praiseMessages);
                isRoast = false;
            } else {
                message = this.getRandomMessage(this.lightRoasts);
                isRoast = true;
            }
            this.updateButtonText("👉 One more time 🔥");
        } else if (this.clickCount === 3) {
            // Third click - spicy zone
            message = this.getRandomMessage(this.spicyRoasts);
            isRoast = true;
            this.updateButtonText("👉 Okay okay, praise me 😭");
        } else {
            // Fourth+ clicks - mostly roasts with occasional praise
            if (Math.random() < 0.8) {
                message = this.getRandomMessage(this.spicyRoasts);
                isRoast = true;
            } else {
                message = this.getRandomMessage(this.praiseMessages);
                isRoast = false;
            }
            
            // Force praise after 3 consecutive roasts
            if (this.clickCount > 6 && Math.random() < 0.3) {
                message = "Relax. You're still my favorite human. 💖";
                isRoast = false;
                this.clickCount = 1; // Reset to safe zone
            }
        }
        
        this.displayResult(message, isRoast);
        this.playSound();
    }
    
    updateBraveMeter() {
        const braveText = document.querySelector('.brave-text');
        const braveFill = document.getElementById('braveFill');
        
        if (this.clickCount === 1) {
            braveText.textContent = "😌 Safe Zone";
            braveFill.style.width = "20%";
        } else if (this.clickCount === 2) {
            braveText.textContent = "👀 Okay… now it's risky";
            braveFill.style.width = "50%";
        } else if (this.clickCount === 3) {
            braveText.textContent = "🔥 No turning back";
            braveFill.style.width = "80%";
        } else {
            braveText.textContent = "😈 Danger Zone";
            braveFill.style.width = "100%";
        }
    }
    
    updateButtonText(text) {
        const buttonText = document.querySelector('.btn-text');
        if (buttonText) {
            buttonText.textContent = text;
        }
    }
    
    getRandomMessage(messages) {
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    displayResult(message, isRoast) {
        const resultDiv = document.getElementById('roastPraiseResult');
        const resultText = resultDiv.querySelector('.result-text');
        
        resultDiv.classList.remove('show', 'roast-mode', 'praise-mode');
        
        resultText.textContent = message;
        
        setTimeout(() => {
            resultDiv.classList.add('show', isRoast ? 'roast-mode' : 'praise-mode');
            
            if (window.innerWidth <= 768) {
                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
    
    playSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Audio not supported, silently fail
        }
    }
}

// Mood Detector Game Logic
class MoodDetector {
    constructor() {
        this.moodResponses = {
            happy: {
                message: "I love this smile on you 😄 Keep it shining.",
                primaryAction: "Spin something fun 🎡",
                secondaryAction: "Save this mood 💾",
                extra: "Screenshot this moment. You'll want to remember this feeling."
            },
            sad: {
                message: "It's okay to feel like this. You don't need to be strong today.",
                primaryAction: "Read something for you 💌",
                secondaryAction: "Virtual hug 🤗",
                extra: "If this feeling stays, remember I'm just one message away."
            },
            angry: {
                message: "Your anger is valid. Don't swallow it.",
                primaryAction: "Let it out 💥",
                secondaryAction: "Distract me 🎧",
                extra: "Your feelings matter. All of them."
            },
            tired: {
                message: "You've done enough today.",
                primaryAction: "Breathe with me 🌬️",
                secondaryAction: "Rest mode 😴",
                extra: "Rest is not lazy. It's necessary."
            },
            confused: {
                message: "It's okay to not have all the answers right now.",
                primaryAction: "Clear your mind 🧘",
                secondaryAction: "Talk it out 💬",
                extra: "Clarity comes with time, not force."
            },
            loved: {
                message: "Good. Because you are.",
                primaryAction: "Open a secret 💝",
                secondaryAction: "Feel it more ❤️",
                extra: "You deserve all the love in the world."
            },
            overwhelmed: {
                message: "You're carrying too much. Let me help you put some down.",
                primaryAction: "Take a break ☕",
                secondaryAction: "One thing at a time 🎯",
                extra: "You don't have to do everything at once."
            },
            numb: {
                message: "Feeling nothing can be heavier than feeling everything.",
                primaryAction: "Stay here with me for 10 seconds.",
                secondaryAction: "Feel something small 🌱",
                extra: "You're not alone in this feeling."
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Start mood detector
        const moodIntro = document.getElementById('moodIntro');
        if (moodIntro) {
            moodIntro.addEventListener('click', () => this.showMoodSelection());
        }
        
        // Mood card selection
        document.querySelectorAll('.mood-card').forEach(card => {
            card.addEventListener('click', () => this.selectMood(card));
        });
        
        // Reset button
        const resetBtn = document.getElementById('moodResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetMoodDetector());
        }
    }
    
    showMoodSelection() {
        const moodIntro = document.getElementById('moodIntro');
        const moodSelection = document.getElementById('moodSelection');
        
        moodIntro.classList.add('hidden');
        moodSelection.classList.remove('hidden');
    }
    
    selectMood(card) {
        const mood = card.dataset.mood;
        const moodSelection = document.getElementById('moodSelection');
        const moodResponse = document.getElementById('moodResponse');
        
        // Remove selected class from all cards
        document.querySelectorAll('.mood-card').forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked card
        card.classList.add('selected');
        
        // Hide selection, show response
        setTimeout(() => {
            moodSelection.classList.add('hidden');
            this.showMoodResponse(mood);
        }, 300);
    }
    
    showMoodResponse(mood) {
        const moodResponse = document.getElementById('moodResponse');
        const moodText = document.querySelector('.mood-text');
        const primaryBtn = document.querySelector('.mood-action-btn.primary');
        const secondaryBtn = document.getElementById('moodSecondary');
        const extraText = document.querySelector('.mood-extra-text');
        
        const response = this.moodResponses[mood];
        
        moodText.textContent = response.message;
        primaryBtn.textContent = response.primaryAction;
        secondaryBtn.textContent = response.secondaryAction;
        extraText.textContent = response.extra;
        
        moodResponse.classList.remove('hidden');
        
        // Add event listeners to action buttons
        primaryBtn.onclick = () => this.handleAction(mood, 'primary');
        secondaryBtn.onclick = () => this.handleAction(mood, 'secondary');
    }
    
    handleAction(mood, actionType) {
        const response = this.moodResponses[mood];
        
        switch (mood) {
            case 'tired':
                if (actionType === 'primary') {
                    this.startBreathingExercise();
                } else {
                    this.showRestMode();
                }
                break;
            case 'angry':
                if (actionType === 'primary') {
                    this.showVentArea();
                } else {
                    this.showDistraction();
                }
                break;
            case 'numb':
                if (actionType === 'primary') {
                    this.startCountdown();
                } else {
                    this.showSmallFeeling();
                }
                break;
            default:
                this.showGeneralAction(response.primaryAction);
        }
    }
    
    startBreathingExercise() {
        const moodText = document.querySelector('.mood-text');
        moodText.innerHTML = "Let's breathe together<br><span id='breathText'>Inhale... 4... 3... 2... 1...</span>";
        
        let step = 0;
        const steps = [
            { text: "Inhale... 4... 3... 2... 1...", duration: 4000 },
            { text: "Hold... 4... 3... 2... 1...", duration: 4000 },
            { text: "Exhale... 6... 5... 4... 3... 2... 1...", duration: 6000 }
        ];
        
        function nextStep() {
            if (step < steps.length) {
                document.getElementById('breathText').textContent = steps[step].text;
                setTimeout(nextStep, steps[step].duration);
                step++;
            } else {
                moodText.innerHTML = "Feel better? 💕<br><small>You can do this as many times as you need.</small>";
            }
        }
        
        nextStep();
    }
    
    showVentArea() {
        const moodText = document.querySelector('.mood-text');
        moodText.innerHTML = `
            <textarea id="ventArea" placeholder="Let it all out... I'm listening 💕" 
                      style="width: 100%; height: 100px; padding: 10px; border-radius: 10px; 
                             border: 2px solid rgba(147, 112, 219, 0.3); background: rgba(255, 255, 255, 0.1); 
                             color: var(--text-dark); resize: none;"></textarea>
            <button onclick="this.clearVent()" style="margin-top: 10px; padding: 8px 16px; 
                                                   background: var(--primary-purple); color: white; 
                                                   border: none; border-radius: 20px; cursor: pointer;">
                Clear & Send 💨
            </button>
        `;
    }
    
    startCountdown() {
        const moodText = document.querySelector('.mood-text');
        let count = 10;
        
        moodText.innerHTML = `Stay here with me... <span id="countdown">${count}</span>`;
        
        const timer = setInterval(() => {
            count--;
            document.getElementById('countdown').textContent = count;
            
            if (count === 0) {
                clearInterval(timer);
                moodText.innerHTML = "You're not alone. 💕<br><small>I'm right here with you.</small>";
            }
        }, 1000);
    }
    
    showGeneralAction(action) {
        const moodText = document.querySelector('.mood-text');
        moodText.innerHTML = `${action}<br><small>This action would take you to another feature!</small>`;
    }
    
    resetMoodDetector() {
        const moodIntro = document.getElementById('moodIntro');
        const moodSelection = document.getElementById('moodSelection');
        const moodResponse = document.getElementById('moodResponse');
        
        // Hide response, show intro
        moodResponse.classList.add('hidden');
        moodSelection.classList.add('hidden');
        moodIntro.classList.remove('hidden');
        
        // Reset selected states
        document.querySelectorAll('.mood-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Clear any active exercises
        this.clearActiveExercise();
    }
    
    clearActiveExercise() {
        // Clear any ongoing exercises like breathing or countdown
        const moodText = document.querySelector('.mood-text');
        if (moodText) {
            // Clear any timers or intervals
            const timers = window.moodDetectorTimers || [];
            timers.forEach(timer => clearTimeout(timer));
            window.moodDetectorTimers = [];
        }
    }
}

// Word Scramble Game Logic
class WordScrambleGame {
    constructor() {
        this.words = [
            { word: 'PRINCESS', hint: 'What I call you! 👑' },
            { word: 'SISTER', hint: 'Our special bond! 💕' },
            { word: 'BESTIE', hint: 'What we are! 🤗' },
            { word: 'FOREVER', hint: 'How long our friendship lasts! ∞' },
            { word: 'FRIEND', hint: 'What you are to me! 🌟' }
        ];
        
        this.currentWordIndex = 0;
        this.currentWord = '';
        this.scrambledLetters = [];
        this.selectedLetters = [];
        this.score = 0;
        this.hintsUsed = 0;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadWord();
    }
    
    bindEvents() {
        const submitBtn = document.getElementById('submitBtn');
        const shuffleBtn = document.getElementById('shuffleBtn');
        const hintBtn = document.getElementById('hintBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.checkAnswer());
        }
        
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => this.shuffleLetters());
        }
        
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.showHint());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextWord());
        }
    }
    
    loadWord() {
        if (this.currentWordIndex >= this.words.length) {
            this.gameComplete();
            return;
        }
        
        const wordData = this.words[this.currentWordIndex];
        this.currentWord = wordData.word;
        
        // Update hint
        document.getElementById('wordHint').textContent = `Hint: ${wordData.hint}`;
        
        // Create scrambled letters
        this.scrambledLetters = this.currentWord.split('').sort(() => Math.random() - 0.5);
        this.selectedLetters = [];
        
        // Update UI
        this.updateWordDisplay();
        this.updateStats();
        
        // Hide next button
        document.getElementById('nextBtn').classList.add('hidden');
        document.getElementById('scrambleResult').classList.add('hidden');
    }
    
    updateWordDisplay() {
        const scrambledWordDiv = document.getElementById('scrambledWord');
        const selectedWordDiv = document.getElementById('selectedWord');
        
        // Clear and populate scrambled letters
        scrambledWordDiv.innerHTML = '';
        this.scrambledLetters.forEach((letter, index) => {
            const button = document.createElement('button');
            button.className = 'letter-tile';
            button.textContent = letter;
            button.dataset.index = index;
            button.addEventListener('click', () => this.selectLetter(index));
            scrambledWordDiv.appendChild(button);
        });
        
        // Update selected word display
        selectedWordDiv.textContent = this.selectedLetters.join('');
    }
    
    selectLetter(index) {
        if (this.scrambledLetters[index] === null) return;
        
        // Add letter to selection
        this.selectedLetters.push(this.scrambledLetters[index]);
        this.scrambledLetters[index] = null;
        
        // Update display
        this.updateWordDisplay();
        
        // Check if word is complete
        if (this.selectedLetters.length === this.currentWord.length) {
            this.checkAnswer();
        }
    }
    
    checkAnswer() {
        const answer = this.selectedLetters.join('');
        
        if (answer === this.currentWord) {
            // Correct answer
            this.score += 10;
            this.showResult(true);
            document.getElementById('nextBtn').classList.remove('hidden');
        } else {
            // Wrong answer
            this.showResult(false);
            // Return letters to scrambled
            this.selectedLetters.forEach((letter, index) => {
                const emptyIndex = this.scrambledLetters.findIndex(l => l === null);
                if (emptyIndex !== -1) {
                    this.scrambledLetters[emptyIndex] = letter;
                }
            });
            this.selectedLetters = [];
            this.updateWordDisplay();
        }
        
        this.updateStats();
    }
    
    shuffleLetters() {
        const availableLetters = this.scrambledLetters.filter(l => l !== null);
        const usedLetters = this.scrambledLetters.filter(l => l === null);
        
        // Shuffle available letters
        availableLetters.sort(() => Math.random() - 0.5);
        
        // Rebuild array
        let newIndex = 0;
        this.scrambledLetters = this.scrambledLetters.map(() => {
            if (newIndex < availableLetters.length) {
                return availableLetters[newIndex++];
            }
            return null;
        });
        
        this.updateWordDisplay();
    }
    
    showHint() {
        if (this.selectedLetters.length >= this.currentWord.length) return;
        
        // Find next correct letter
        const nextIndex = this.selectedLetters.length;
        const correctLetter = this.currentWord[nextIndex];
        
        // Find and select the correct letter
        const letterIndex = this.scrambledLetters.indexOf(correctLetter);
        if (letterIndex !== -1) {
            this.selectLetter(letterIndex);
            this.hintsUsed++;
            this.updateStats();
        }
    }
    
    showResult(isCorrect) {
        const resultDiv = document.getElementById('scrambleResult');
        const resultMessage = resultDiv.querySelector('.result-message');
        
        if (isCorrect) {
            resultMessage.textContent = '🎉 Correct! Amazing job! 🎉';
            resultDiv.style.background = 'linear-gradient(135deg, var(--primary-gold), var(--primary-green))';
        } else {
            resultMessage.textContent = '❌ Not quite right. Try again! ❌';
            resultDiv.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e53)';
        }
        
        resultDiv.classList.remove('hidden');
    }
    
    nextWord() {
        this.currentWordIndex++;
        this.loadWord();
    }
    
    updateStats() {
        document.getElementById('currentWordNum').textContent = this.currentWordIndex + 1;
        document.getElementById('scrambleScore').textContent = this.score;
        document.getElementById('hintsUsed').textContent = this.hintsUsed;
    }
    
    gameComplete() {
        const resultDiv = document.getElementById('scrambleResult');
        const resultMessage = resultDiv.querySelector('.result-message');
        
        resultMessage.textContent = `🎊 Game Complete! Final Score: ${this.score} 🎊`;
        resultDiv.style.background = 'linear-gradient(135deg, var(--primary-gold), var(--primary-pink))';
        resultDiv.classList.remove('hidden');
        
        // Hide game controls
        document.getElementById('submitBtn').classList.add('hidden');
        document.getElementById('shuffleBtn').classList.add('hidden');
        document.getElementById('hintBtn').classList.add('hidden');
        document.getElementById('nextBtn').classList.add('hidden');
    }
}

// Initialize word scramble game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WordScrambleGame();
});

// Initialize reimagined roast or praise game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RoastOrPraiseGame();
});

// Initialize mood detector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MoodDetector();
});

// Initialize surprise engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.surpriseEngine = new SurpriseEngine();
});

// Export for use in other files
window.SurpriseEngine = SurpriseEngine;
