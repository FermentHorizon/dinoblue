/**
 * Dinosaur Bluey Adventure - Main Game Logic
 * A Frogger-inspired game featuring Bluey characters and dinosaurs
 */

// Game constants and configuration
const GAME_CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    PLAYER_SIZE: 30,
    PLAYER_SPEED: 4,
    BACKGROUND_COLOR: '#87CEEB'
};

// Game state management
class GameState {
    constructor() {
        this.isRunning = false;
        this.isPaused = false;
        this.score = 0;
        this.level = 1;
    }

    pause() {
        this.isPaused = !this.isPaused;
        this.updatePauseOverlay();
    }

    updatePauseOverlay() {
        const overlay = document.getElementById('pauseOverlay');
        if (this.isPaused) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }

    updateScore(points) {
        this.score += points;
        document.getElementById('score').textContent = this.score;
    }
}

// Player class representing Bluey character
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = GAME_CONFIG.PLAYER_SIZE;
        this.height = GAME_CONFIG.PLAYER_SIZE;
        this.speed = GAME_CONFIG.PLAYER_SPEED;
        this.color = '#4169E1'; // Bluey's blue color
    }

    /**
     * Move player in specified direction while respecting canvas boundaries
     * @param {string} direction - 'up', 'down', 'left', 'right'
     * @param {number} canvasWidth - Canvas width for boundary checking
     * @param {number} canvasHeight - Canvas height for boundary checking
     */
    move(direction, canvasWidth, canvasHeight) {
        const prevX = this.x;
        const prevY = this.y;

        switch (direction) {
            case 'up':
                this.y -= this.speed;
                break;
            case 'down':
                this.y += this.speed;
                break;
            case 'left':
                this.x -= this.speed;
                break;
            case 'right':
                this.x += this.speed;
                break;
        }

        // Boundary checking - prevent moving off canvas
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvasWidth) this.x = canvasWidth - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvasHeight) this.y = canvasHeight - this.height;

        // Award points for movement (distance-based scoring)
        if (this.x !== prevX || this.y !== prevY) {
            game.gameState.updateScore(1);
        }
    }

    /**
     * Render the player on the canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    render(ctx) {
        // Draw simple rectangle for now (placeholder for sprite)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Add simple face details to represent Bluey
        ctx.fillStyle = '#FFF';
        // Eyes
        ctx.fillRect(this.x + 5, this.y + 8, 5, 5);
        ctx.fillRect(this.x + 15, this.y + 8, 5, 5);
        
        // Nose
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 12, this.y + 15, 3, 3);
        
        // Ears (triangle approximation)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + 2, this.y - 3, 6, 8);
        ctx.fillRect(this.x + 17, this.y - 3, 6, 8);
    }
}

// Input handling system
class InputHandler {
    constructor() {
        this.keys = {};
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Keydown event
        document.addEventListener('keydown', (event) => {
            this.keys[event.key.toLowerCase()] = true;
            
            // Handle pause/resume with spacebar
            if (event.key === ' ') {
                event.preventDefault();
                game.gameState.pause();
            }
        });

        // Keyup event
        document.addEventListener('keyup', (event) => {
            this.keys[event.key.toLowerCase()] = false;
        });

        // Prevent arrow keys from scrolling the page
        document.addEventListener('keydown', (event) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
                event.preventDefault();
            }
        });
    }

    /**
     * Check if a key is currently pressed
     * @param {string} key - Key to check
     * @returns {boolean} - True if key is pressed
     */
    isKeyPressed(key) {
        return !!this.keys[key.toLowerCase()];
    }

    /**
     * Process input and move player accordingly
     * @param {Player} player - Player object to control
     * @param {number} canvasWidth - Canvas width for boundary checking
     * @param {number} canvasHeight - Canvas height for boundary checking
     */
    handlePlayerMovement(player, canvasWidth, canvasHeight) {
        // Arrow keys
        if (this.isKeyPressed('arrowup')) player.move('up', canvasWidth, canvasHeight);
        if (this.isKeyPressed('arrowdown')) player.move('down', canvasWidth, canvasHeight);
        if (this.isKeyPressed('arrowleft')) player.move('left', canvasWidth, canvasHeight);
        if (this.isKeyPressed('arrowright')) player.move('right', canvasWidth, canvasHeight);

        // WASD keys
        if (this.isKeyPressed('w')) player.move('up', canvasWidth, canvasHeight);
        if (this.isKeyPressed('s')) player.move('down', canvasWidth, canvasHeight);
        if (this.isKeyPressed('a')) player.move('left', canvasWidth, canvasHeight);
        if (this.isKeyPressed('d')) player.move('right', canvasWidth, canvasHeight);
    }
}

// Asset management system (placeholder for future sprite and sound loading)
class AssetManager {
    constructor() {
        this.sprites = {};
        this.sounds = {};
        this.loaded = false;
    }

    /**
     * Initialize asset loading (placeholder)
     * This will be expanded to load actual sprites and sounds
     */
    async loadAssets() {
        // Placeholder for asset loading
        // Future implementation will load sprites from assets/sprites/
        // and sounds from assets/sounds/
        console.log('Asset loading system initialized - ready for sprite and sound files');
        this.loaded = true;
        return Promise.resolve();
    }

    /**
     * Get sprite (placeholder)
     * @param {string} name - Sprite name
     * @returns {Object|null} - Sprite object or null
     */
    getSprite(name) {
        return this.sprites[name] || null;
    }

    /**
     * Get sound (placeholder)
     * @param {string} name - Sound name
     * @returns {Object|null} - Sound object or null
     */
    getSound(name) {
        return this.sounds[name] || null;
    }
}

// Main game class
class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameState = new GameState();
        this.player = null;
        this.inputHandler = new InputHandler();
        this.assetManager = new AssetManager();
        this.lastFrameTime = 0;
        this.deltaTime = 0;
    }

    /**
     * Initialize the game
     */
    async init() {
        // Get canvas and context
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        if (!this.ctx) {
            throw new Error('Could not get 2D context from canvas');
        }

        // Set canvas size
        this.canvas.width = GAME_CONFIG.CANVAS_WIDTH;
        this.canvas.height = GAME_CONFIG.CANVAS_HEIGHT;

        // Initialize player at center bottom
        this.player = new Player(
            GAME_CONFIG.CANVAS_WIDTH / 2 - GAME_CONFIG.PLAYER_SIZE / 2,
            GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.PLAYER_SIZE - 10
        );

        // Load assets
        await this.assetManager.loadAssets();

        // Set initial game state
        this.gameState.isRunning = true;
        
        console.log('Dinosaur Bluey Adventure initialized successfully!');
    }

    /**
     * Main game loop using requestAnimationFrame
     * @param {number} currentTime - Current timestamp
     */
    gameLoop(currentTime) {
        // Calculate delta time for smooth animation
        this.deltaTime = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;

        // Only update game logic if not paused
        if (!this.gameState.isPaused && this.gameState.isRunning) {
            this.update();
        }

        // Always render (to show pause overlay)
        this.render();

        // Continue the game loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    /**
     * Update game logic
     */
    update() {
        // Handle player input
        this.inputHandler.handlePlayerMovement(
            this.player,
            this.canvas.width,
            this.canvas.height
        );

        // Future: Update obstacles, check collisions, etc.
        // This is where obstacle movement and collision detection will be added
    }

    /**
     * Render game graphics
     */
    render() {
        // Clear canvas
        this.ctx.fillStyle = GAME_CONFIG.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw simple background elements
        this.drawBackground();

        // Render player
        this.player.render(this.ctx);

        // Future: Render obstacles, UI elements, etc.
    }

    /**
     * Draw background elements
     */
    drawBackground() {
        // Draw simple grass areas and paths
        const ctx = this.ctx;
        
        // Grass areas (green)
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(0, 0, this.canvas.width, 100); // Top grass
        ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100); // Bottom grass
        
        // Path areas (brown)
        ctx.fillStyle = '#8B7355';
        ctx.fillRect(0, 150, this.canvas.width, 80); // Top path
        ctx.fillRect(0, 300, this.canvas.width, 80); // Middle path
        ctx.fillRect(0, 450, this.canvas.width, 80); // Bottom path
        
        // River (blue)
        ctx.fillStyle = '#4682B4';
        ctx.fillRect(0, 100, this.canvas.width, 50); // Top river
        ctx.fillRect(0, 380, this.canvas.width, 70); // Bottom river
    }

    /**
     * Start the game
     */
    start() {
        console.log('Starting Dinosaur Bluey Adventure...');
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// Global game instance
let game;

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        game = new Game();
        await game.init();
        game.start();
        console.log('Game started successfully!');
    } catch (error) {
        console.error('Failed to start game:', error);
        alert('Failed to start the game. Please check the console for details.');
    }
});

// Placeholder structures for future expansion

/**
 * Obstacle class (placeholder for future dinosaur obstacles)
 * This will be expanded to include different types of dinosaurs with unique behaviors
 */
class Obstacle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; // 'trex', 'triceratops', 'pterodactyl', etc.
        this.speed = 2;
        this.width = 40;
        this.height = 40;
    }

    update() {
        // Placeholder for obstacle movement logic
    }

    render(ctx) {
        // Placeholder for obstacle rendering
    }
}

/**
 * Level management class (placeholder)
 * This will handle level progression, difficulty scaling, and level-specific content
 */
class LevelManager {
    constructor() {
        this.currentLevel = 1;
        this.obstacles = [];
    }

    loadLevel(levelNumber) {
        // Placeholder for level loading logic
    }

    spawnObstacle() {
        // Placeholder for obstacle spawning logic
    }
}

/**
 * Collision detection utilities (placeholder)
 */
class CollisionDetector {
    static checkRectangleCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
}