# Assets Directory

This directory contains game assets for Dinosaur Bluey Adventure.

## Structure

- `sprites/` - PNG sprite images with transparent backgrounds
  - Character sprites (Bluey, Bingo, etc.)
  - Dinosaur sprites (T-Rex, Triceratops, Pterodactyl, etc.)
  - Environment sprites (logs, rocks, plants, etc.)
  - UI elements

- `sounds/` - Audio files in OGG or MP3 format
  - Sound effects (jump, collision, pickup, etc.)
  - Background music
  - Character voices

## Guidelines

- Sprite dimensions should be kept under 64x64px for performance
- Use transparent backgrounds for sprites
- Audio files should be optimized for web playback
- Follow consistent naming conventions (e.g., `bluey_idle.png`, `trex_walk.png`)

## Future Implementation

The AssetManager class in `game.js` is ready to load these assets when they are added to the project.