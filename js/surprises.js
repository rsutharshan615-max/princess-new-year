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
            isScratching = true;
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        canvas.addEventListener('touchmove', (e) => {
            if (isScratching) {
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousemove', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(mouseEvent);
            }
        });
        
        canvas.addEventListener('touchend', () => {
            isScratching = false;
        });
        
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
        
        // Set scratch surface
        ctx.fillStyle = '#FF69B4';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('SCRATCH ME!', canvas.width / 2, canvas.height / 2);
        
        // Update hidden message
        const messages = this.surpriseData.scratchMessages;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const messageElement = document.querySelector('.scratch-message');
        if (messageElement) {
            messageElement.textContent = randomMessage;
        }
    }

    scratch(e, ctx, canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
        
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
        
        if (percentage > 50) {
            this.revealScratchMessage();
        }
    }

    revealScratchMessage() {
        const canvas = document.getElementById('scratchCanvas');
        if (canvas) {
            canvas.style.opacity = '0.3';
            canvas.style.pointerEvents = 'none';
            
            // Add celebration effect
            this.createMiniCelebration();
            
            // Reset after delay
            setTimeout(() => {
                canvas.style.opacity = '1';
                canvas.style.pointerEvents = 'auto';
                const ctx = canvas.getContext('2d');
                this.resetScratchCard(ctx, canvas);
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

// Memory Game Logic
class MemoryGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.gameTimer = null;
        this.startTime = null;
        this.isProcessing = false;
        
        // Friendship-themed symbols
        this.symbols = ['�', '❣️', '😇', '🫶�', '😍', '🥰', '😊', '�', '✨', '💗', '�', '❤️'];
        
        this.init();
    }
    
    init() {
        this.setupGame();
        this.bindEvents();
    }
    
    setupGame() {
        const grid = document.getElementById('memoryGrid');
        if (!grid) return;
        
        // Create pairs of cards
        const cardSymbols = [...this.symbols, ...this.symbols];
        this.shuffleArray(cardSymbols);
        
        // Clear and populate grid
        grid.innerHTML = '';
        cardSymbols.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            
            card.innerHTML = `
                <div class="card-front">?</div>
                <div class="card-back">${symbol}</div>
            `;
            
            grid.appendChild(card);
            this.cards.push(card);
        });
    }
    
    bindEvents() {
        const startBtn = document.getElementById('startGameBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startNewGame());
        }
        
        this.cards.forEach(card => {
            card.addEventListener('click', () => this.flipCard(card));
        });
    }
    
    startNewGame() {
        // Reset game state
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.isProcessing = false;
        
        // Clear timer
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }
        
        // Reset UI
        this.updateStats();
        document.getElementById('gameMessage').classList.add('hidden');
        
        // Reset cards
        this.cards.forEach(card => {
            card.classList.remove('flipped', 'matched');
        });
        
        // Shuffle and re-setup
        this.shuffleArray(this.symbols);
        const cardSymbols = [...this.symbols, ...this.symbols];
        this.shuffleArray(cardSymbols);
        
        this.cards.forEach((card, index) => {
            card.dataset.symbol = cardSymbols[index];
            card.querySelector('.card-back').textContent = cardSymbols[index];
        });
        
        // Start timer
        this.startTimer();
    }
    
    flipCard(card) {
        if (this.isProcessing || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        // Flip the card
        card.classList.add('flipped');
        this.flippedCards.push(card);
        
        // Check for match
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateStats();
            this.checkMatch();
        }
    }
    
    checkMatch() {
        this.isProcessing = true;
        const [card1, card2] = this.flippedCards;
        
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Match found
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                this.matchedPairs++;
                
                // Check for win
                if (this.matchedPairs === this.symbols.length) {
                    this.gameWon();
                }
                
                this.flippedCards = [];
                this.isProcessing = false;
            }, 600);
        } else {
            // No match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
                this.isProcessing = false;
            }, 1000);
        }
    }
    
    startTimer() {
        this.startTime = Date.now();
        this.gameTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('gameTime').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    updateStats() {
        document.getElementById('moveCount').textContent = this.moves;
    }
    
    gameWon() {
        clearInterval(this.gameTimer);
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('finalTime').textContent = timeStr;
        document.getElementById('finalMoves').textContent = this.moves;
        document.getElementById('gameMessage').classList.remove('hidden');
        
        // Celebration effect
        this.celebrate();
    }
    
    celebrate() {
        // Add celebration animation to matched cards
        this.cards.forEach(card => {
            if (card.classList.contains('matched')) {
                card.style.animation = 'matchPulse 0.6s ease 3';
            }
        });
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// Initialize memory game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});

// Initialize surprise engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.surpriseEngine = new SurpriseEngine();
});

// Export for use in other files
window.SurpriseEngine = SurpriseEngine;
