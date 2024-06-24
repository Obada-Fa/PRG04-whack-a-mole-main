// sewerscene.js
import { Actor, Sprite, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { FightScene } from './fightscene.js';
import { Player } from './Player.js';

class SewerFightScene extends FightScene {
    constructor(engine, playerStartPos, enemyClass, enemyStartPos) {
        super(engine, playerStartPos, enemyClass, enemyStartPos);
    }

    setupBackground(engine) {
        const sewer = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: engine.drawWidth,
            height: engine.drawHeight,
            collisionType: CollisionType.Fixed // Ensure the background has fixed collision
        });
        const sewerSprite = Sprite.from(Resources.Sewer);
        sewer.graphics.use(sewerSprite);
        this.add(sewer);
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        const player = this.actors.find(actor => actor instanceof Player);
        if (player) {
            player.isInFightScene = true;
            player.pos.y = engine.drawHeight / 2; // Align y position
            player.maxY = engine.drawHeight; // Set maxY to the ground level
        }

        const enemy = this.actors.find(actor => actor instanceof this.enemyClass);
        if (enemy) {
            enemy.pos.y = engine.drawHeight / 2; // Align y position
            enemy.pos.x = engine.drawWidth - player.pos.x; // Opposite x position
        }
    }
}

export { SewerFightScene };
