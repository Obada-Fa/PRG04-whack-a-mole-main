import { Actor, Vector, Input, Random } from 'excalibur';
import { Resources } from './resources.js';

class NPC extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 40,
            height: 40
        });
        console.log('NPC constructor called');
        this.graphics.use(Resources.Mia.toSprite()); // Using the same placeholder image
        this.random = new Random();
    }

    onInitialize(engine) {
        console.log('NPC onInitialize called');
        this.engine = engine;
        this.timeSinceLastMove = 0;
        this.moveDuration = this.random.integer(2000, 5000); // Move for 2-5 seconds
        this.chooseNewDirection();
    }

    chooseNewDirection() {
        console.log('Choosing new direction');
        const directions = [
            new Vector(0, -1), // Up
            new Vector(0, 1),  // Down
            new Vector(-1, 0), // Left
            new Vector(1, 0)   // Right
        ];
        const direction = directions[this.random.integer(0, directions.length - 1)];
        console.log('New direction chosen:', direction);
        this.vel = direction.scale(50); // Adjust speed as needed
        this.timeSinceLastMove = 0; // Reset the move timer
    }

    onPreUpdate(engine, delta) {
        this.timeSinceLastMove += delta;

        if (this.timeSinceLastMove > this.moveDuration) {
            this.moveDuration = this.random.integer(2000, 5000); // Set new move duration
            this.chooseNewDirection();
        }
    }
}

export { NPC };