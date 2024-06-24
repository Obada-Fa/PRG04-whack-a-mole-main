import { Actor, Vector, Animation, SpriteSheet, Color, CollisionType, Shape } from 'excalibur';
import { Resources } from './resources.js';
import { Bullet } from './Inventory.js'; // Ensure you import the Bullet class

class Boss extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 200,
            height: 350,
            collisionType: CollisionType.Active
        });
        this.scale = new Vector(0.2, 0.2);
        this.z = 2;

        const bossSheet = SpriteSheet.fromImageSource({
            image: Resources.Boss,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 768,
                spriteHeight: 768
            }
        });

        this.animations = {
            idle: Animation.fromSpriteSheet(bossSheet, [0, 1, 2, 3], 200),
        };

        this.graphics.use(this.animations.idle);

        // Add health properties
        this.maxHealth = 100;
        this.currentHealth = this.maxHealth;
    }

    onInitialize(engine) {
        this.engine = engine;

        // Listen for collision events with bullets
        this.on('collisionstart', (evt) => {
            if (evt.other instanceof Bullet) {
                this.takeDamage(10); // Assume each bullet does 10 damage
                evt.other.kill(); // Destroy the bullet
                console.log(this.currentHealth);
            }
        });
    }

    onPreUpdate(engine, delta) {
    }

    takeDamage(amount) {
        this.currentHealth = Math.max(0, this.currentHealth - amount);
        if (this.currentHealth <= 0) {
            this.kill(); // Remove the boss if health is depleted
        }
    }

    draw(ctx) {
        super.draw(ctx);

        // Draw the health bar
        const healthBarWidth = 100;
        const healthBarHeight = 10;
        const healthBarX = this.pos.x - healthBarWidth / 2;
        const healthBarY = this.pos.y - this.height / 2 - 20; // Position above the boss

        // Draw the background (red)
        ctx.fillStyle = 'red';
        ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

        // Draw the current health (green)
        const healthWidth = (this.currentHealth / this.maxHealth) * healthBarWidth;
        ctx.fillStyle = 'green';
        ctx.fillRect(healthBarX, healthBarY, healthWidth, healthBarHeight);
    }
}

export { Boss };
