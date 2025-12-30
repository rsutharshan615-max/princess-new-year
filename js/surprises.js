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

// Puzzle Game Logic
class PuzzleGame {
    constructor() {
        // Use online image that works on GitHub Pages
        this.imageUrl = 'https://picsum.photos/seed/princesspuzzle/400/400.jpg';
        this.gridSize = 4;
        this.pieces = [];
        this.placedPieces = 0;
        this.startTime = null;
        this.timer = null;
        this.isInitialized = false;
        this.touchItem = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        const startBtn = document.getElementById('startPuzzleBtn');
        const hintBtn = document.getElementById('hintBtn');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startPuzzle());
        }
        
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.showHint());
        }
    }
    
    startPuzzle() {
        this.placedPieces = 0;
        this.startTime = Date.now();
        this.isInitialized = true;
        
        // Update UI
        document.getElementById('piecesPlaced').textContent = '0';
        document.getElementById('puzzleComplete').classList.add('hidden');
        
        // Create puzzle pieces
        this.createPuzzlePieces();
        
        // Start timer
        this.startTimer();
    }
    
    createPuzzlePieces() {
        const board = document.getElementById('puzzleBoard');
        if (!board) return;
        
        // Clear board
        board.innerHTML = '';
        this.pieces = [];
        
        // Create responsive grid
        const boardSize = this.getBoardSize();
        board.style.display = 'grid';
        board.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        board.style.gap = '2px';
        board.style.width = `${boardSize}px`;
        board.style.height = `${boardSize}px`;
        board.style.margin = '0 auto';
        board.style.background = '#f0f0f0';
        board.style.border = '2px solid var(--primary-purple)';
        board.style.borderRadius = '10px';
        board.style.padding = '5px';
        
        // Create pieces
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.dataset.correctPosition = i;
            piece.dataset.currentPosition = i;
            
            // Calculate background position
            const row = Math.floor(i / this.gridSize);
            const col = i % this.gridSize;
            const bgPosX = -(col * 100);
            const bgPosY = -(row * 100);
            
            piece.style.backgroundImage = `url(${this.imageUrl})`;
            piece.style.backgroundSize = `${this.gridSize * 100}px ${this.gridSize * 100}px`;
            piece.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
            piece.style.width = `${this.getPieceSize()}px`;
            piece.style.height = `${this.getPieceSize()}px`;
            piece.style.border = '1px solid #ddd';
            piece.style.cursor = 'move';
            piece.style.transition = 'all 0.3s ease';
            piece.style.borderRadius = '5px';
            
            // Add drag functionality
            this.addDragFunctionality(piece, i);
            
            board.appendChild(piece);
            this.pieces.push(piece);
        }
        
        // Shuffle pieces after a delay
        setTimeout(() => this.shufflePieces(), 1000);
    }
    
    getBoardSize() {
        const width = window.innerWidth;
        if (width <= 360) return 240;
        if (width <= 480) return 280;
        if (width <= 768) return 320;
        return 400;
    }
    
    getPieceSize() {
        const boardSize = this.getBoardSize();
        return Math.floor((boardSize - 10) / this.gridSize) - 2;
    }
    
    addDragFunctionality(piece, originalIndex) {
        let draggedElement = null;
        
        // Mouse events
        piece.addEventListener('dragstart', (e) => {
            draggedElement = e.target;
            e.target.style.opacity = '0.5';
        });
        
        piece.addEventListener('dragend', (e) => {
            e.target.style.opacity = '';
        });
        
        piece.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        piece.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('puzzle-piece') && draggedElement !== e.target) {
                this.swapPieces(draggedElement, e.target);
            }
        });
        
        // Touch events for mobile
        piece.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.touchItem = e.target;
            e.target.style.opacity = '0.5';
            e.target.style.transform = 'scale(1.1)';
            e.target.style.zIndex = '1000';
        }, { passive: false });
        
        piece.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            
            // Highlight the element below
            document.querySelectorAll('.puzzle-piece').forEach(p => {
                p.style.border = '1px solid #ddd';
            });
            
            if (elementBelow && elementBelow.classList.contains('puzzle-piece')) {
                elementBelow.style.border = '3px solid var(--primary-purple)';
            }
        }, { passive: false });
        
        piece.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (this.touchItem) {
                this.touchItem.style.opacity = '';
                this.touchItem.style.transform = '';
                this.touchItem.style.zIndex = '';
                
                const touch = e.changedTouches[0];
                const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
                
                if (elementBelow && elementBelow.classList.contains('puzzle-piece') && elementBelow !== this.touchItem) {
                    this.swapPieces(this.touchItem, elementBelow);
                }
                
                // Reset borders
                document.querySelectorAll('.puzzle-piece').forEach(p => {
                    this.checkPiecePlacement(p);
                });
                
                this.touchItem = null;
            }
        }, { passive: false });
    }
    
    swapPieces(piece1, piece2) {
        // Swap background positions
        const tempBg = piece1.style.backgroundPosition;
        const tempCorrect = piece1.dataset.correctPosition;
        
        piece1.style.backgroundPosition = piece2.style.backgroundPosition;
        piece1.dataset.correctPosition = piece2.dataset.correctPosition;
        
        piece2.style.backgroundPosition = tempBg;
        piece2.dataset.correctPosition = tempCorrect;
        
        // Check if pieces are in correct positions
        this.checkPiecePlacement(piece1);
        this.checkPiecePlacement(piece2);
        
        // Update placed pieces count
        this.updatePlacedCount();
    }
    
    checkPiecePlacement(piece) {
        const correctPos = piece.dataset.correctPosition;
        const currentPos = piece.dataset.currentPosition;
        
        if (correctPos === currentPos) {
            piece.style.border = '2px solid #4CAF50';
            piece.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.5)';
        } else {
            piece.style.border = '1px solid #ddd';
            piece.style.boxShadow = '';
        }
    }
    
    shufflePieces() {
        const positions = [];
        for (let i = 0; i < this.pieces.length; i++) {
            const row = Math.floor(i / this.gridSize);
            const col = i % this.gridSize;
            positions.push({
                bgPosX: -(col * 100),
                bgPosY: -(row * 100),
                correctPos: i
            });
        }
        
        // Shuffle positions
        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }
        
        // Apply shuffled positions
        this.pieces.forEach((piece, index) => {
            const pos = positions[index];
            piece.style.backgroundPosition = `${pos.bgPosX}px ${pos.bgPosY}px`;
            piece.dataset.correctPosition = pos.correctPos;
            this.checkPiecePlacement(piece);
        });
    }
    
    showHint() {
        // Briefly show correct positions
        this.pieces.forEach(piece => {
            const correctPos = piece.dataset.correctPosition;
            const currentPos = piece.dataset.currentPosition;
            
            if (correctPos === currentPos) {
                piece.style.border = '3px solid #4CAF50';
                piece.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.8)';
            } else {
                piece.style.border = '3px solid #ff9800';
                piece.style.boxShadow = '0 0 15px rgba(255, 152, 0, 0.8)';
            }
        });
        
        // Reset after 2 seconds
        setTimeout(() => {
            this.pieces.forEach(piece => {
                this.checkPiecePlacement(piece);
            });
        }, 2000);
    }
    
    updatePlacedCount() {
        let correctCount = 0;
        this.pieces.forEach(piece => {
            if (piece.dataset.correctPosition === piece.dataset.currentPosition) {
                correctCount++;
            }
        });
        
        this.placedPieces = correctCount;
        document.getElementById('piecesPlaced').textContent = correctCount;
        
        // Check if puzzle is complete
        if (correctCount === this.pieces.length) {
            this.puzzleComplete();
        }
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('puzzleTime').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    puzzleComplete() {
        clearInterval(this.timer);
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('finalPuzzleTime').textContent = timeStr;
        document.getElementById('puzzleComplete').classList.remove('hidden');
        
        // Celebration effect
        this.celebrate();
    }
    
    celebrate() {
        // Add celebration animation to pieces
        this.pieces.forEach((piece, index) => {
            setTimeout(() => {
                piece.style.animation = 'placePiece 0.5s ease';
            }, index * 50);
        });
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

// Initialize puzzle game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PuzzleGame();
});

// Initialize word scramble game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WordScrambleGame();
});

// Initialize surprise engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.surpriseEngine = new SurpriseEngine();
});

// Export for use in other files
window.SurpriseEngine = SurpriseEngine;
