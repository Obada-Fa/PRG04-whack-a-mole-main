import { Scene, Vector, Actor } from 'excalibur';
import { Player } from './Player.js';
import { Healthbar } from './healthbar.js';

class FightScene extends Scene {
    constructor(engine, playerStartPos, enemyClass, enemyStartPos) {
        super(engine);
        this.playerStartPos = playerStartPos;
        this.enemyClass = enemyClass;
        this.enemyStartPos = enemyStartPos;
    }

    onInitialize(engine) {
        // Setup the background (can be overridden by subclasses)
        this.setupBackground(engine);

        // Spawn the player
        const player = new Player(this.playerStartPos.x, this.playerStartPos.y, -Infinity, -Infinity, Infinity, Infinity);
        this.add(player);

        // Spawn the enemy
        const enemy = new this.enemyClass(this.enemyStartPos.x, this.enemyStartPos.y);
        this.add(enemy);

        // Set up the camera to follow the player
        engine.currentScene.camera.strategy.lockToActor(player);

        // Add health bars
        const playerHealthbar = new Healthbar(engine);
        player.addChild(playerHealthbar);

        const enemyHealthbar = new Healthbar(engine, true);
        enemy.addChild(enemyHealthbar);

        player.healthBar = playerHealthbar;
        enemy.healthBar = enemyHealthbar;

        // Initialize health bars
        setTimeout(() => {
            player.healthBar.setHealth(player.currentHealth);
            enemy.healthBar.setHealth(enemy.currentHealth / enemy.maxHealth); // Scale the health bar for the enemy
        }, 100);
    }

    setupBackground(engine) {
        // This can be overridden by subclasses to set up specific backgrounds
    }

    onActivate(ctx) {
        console.log('FightScene activated');
    }
}

export { FightScene };
