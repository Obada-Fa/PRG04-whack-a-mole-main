import { Actor, Vector, Input, Animation, SpriteSheet, CollisionType, Shape } from 'excalibur';
import { Resources } from './resources.js';
import { Inventory, ItemActor, Gun, Bullet } from './Inventory.js';
import { Healthbar } from './healthbar.js'; // Import Healthbar

class Player extends Actor {
    constructor(x, y, minX, minY, maxX, maxY) {
        super({
            pos: new Vector(x, y),
            collisionType: CollisionType.Active,
            width: 300,
            height: 316
        });

        const playerSheet = SpriteSheet.fromImageSource({
            image: Resources.Player,
            grid: {
                rows: 3,
                columns: 4,
                spriteWidth: 320,
                spriteHeight: 316
            }
        });

        this.scale = new Vector(0.2, 0.2);

        this.animations = {
            left: Animation.fromSpriteSheet(playerSheet, [0, 1, 2, 3], 200),
            right: Animation.fromSpriteSheet(playerSheet, [0, 1, 2, 3], 200),
            up: Animation.fromSpriteSheet(playerSheet, [8, 9, 10, 11], 200),
            down: Animation.fromSpriteSheet(playerSheet, [4, 5, 6, 7], 200)
        };

        this.animations.right.flipHorizontal = true;
        this.graphics.use(this.animations.down);

        this.inventory = new Inventory();
        this.hasGun = false;
        this.facingDirection = 'down';
        this.collider.set(Shape.Box(this.width, this.height));

        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;

        this.maxHealth = 1; // Player's health ranges from 0 to 1 for simplicity
        this.currentHealth = this.maxHealth;
        this.healthBar = new Healthbar(this.game); // Initialize Healthbar
        this.addChild(this.healthBar); // Add health bar as a child to the player

        this.isInFightScene = false; // Flag to check if player is in fighting scene
    }

    onInitialize(engine) {
        this.engine = engine;

        engine.currentScene.camera.strategy.lockToActor(this);

        this.on('collisionstart', (evt) => {
            if (evt.other instanceof ItemActor) {
                this.collectItem(evt.other);
            }
        });

        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space && this.hasGun) {
                this.shoot();
            }
        });

        // Delay the health setting to ensure Healthbar is initialized
        setTimeout(() => {
            this.healthBar.setHealth(this.currentHealth);
        }, 100);
    }

    onPreUpdate(engine, delta) {
        this.vel.setTo(0, 0);

        let moving = false;

        if (this.isInFightScene) {
            if (engine.input.keyboard.isHeld(Input.Keys.W)) {
                this.vel.y = -600; // Jump
                moving = true;
                this.facingDirection = 'up';
            }
        } else {
            if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.ArrowUp)) {
                this.vel.y = -400;
                moving = true;
                this.facingDirection = 'up';
            }
        }

        if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.ArrowDown)) {
            this.vel.y = 400;
            moving = true;
            this.facingDirection = 'down';
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.ArrowLeft)) {
            this.vel.x = -400;
            moving = true;
            this.facingDirection = 'left';
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.ArrowRight)) {
            this.vel.x = 400;
            moving = true;
            this.facingDirection = 'right';
        }

        if (moving) {
            this._updateAnimation();
            this._constrainPosition(delta);
        }

        // Update health bar position
        if (this.healthBar) {
            this.healthBar.pos = new Vector(0, -this.height * this.scale.y / 2 - 10); // Position above the player
        }
    }

    _updateAnimation() {
        if (this.isInFightScene) {
            if (this.facingDirection === 'left' || this.facingDirection === 'right') {
                this.graphics.use(this.animations.left); // Use left animation for jumping
            }
        } else {
            if (this.facingDirection === 'left') {
                this.graphics.use(this.animations.left);
            } else if (this.facingDirection === 'right') {
                this.graphics.use(this.animations.right);
            } else if (this.facingDirection === 'up') {
                this.graphics.use(this.animations.up);
            } else if (this.facingDirection === 'down') {
                this.graphics.use(this.animations.down);
            }
        }
    }

    _constrainPosition(delta) {
        const halfWidth = this.width * this.scale.x / 2;
        const halfHeight = this.height * this.scale.y / 2;
        const newX = Math.max(this.minX + halfWidth, Math.min(this.maxX - halfWidth, this.pos.x + this.vel.x * delta / 1000));
        const newY = Math.max(this.minY + halfHeight, Math.min(this.maxY - halfHeight, this.pos.y + this.vel.y * delta / 1000));

        this.pos.setTo(newX, newY);
    }

    collectItem(itemActor) {
        this.inventory.addItem(itemActor.item);
        if (itemActor.item instanceof Gun) {
            this.hasGun = true;
        }
        itemActor.kill();
    }

    shoot() {
        let bulletDirection;
        if (this.facingDirection === 'left') {
            bulletDirection = new Vector(-1, 0);
        } else if (this.facingDirection === 'right') {
            bulletDirection = new Vector(1, 0);
        } else if (this.facingDirection === 'up') {
            bulletDirection = new Vector(0, -1);
        } else if (this.facingDirection === 'down') {
            bulletDirection = new Vector(0, 1);
        }
        const bullet = new Bullet(this.pos.x, this.pos.y, bulletDirection);
        this.scene.add(bullet);
    }

    takeDamage(amount) {
        this.currentHealth = Math.max(0, this.currentHealth - amount);
        this.healthBar.setHealth(this.currentHealth);
        if (this.currentHealth <= 0) {
            this.kill();
        }
    }

    increaseHealth(amount) {
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
        this.healthBar.setHealth(this.currentHealth);
    }
}

export { Player };
