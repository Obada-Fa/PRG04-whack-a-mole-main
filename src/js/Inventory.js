import { Actor, Vector, Color, CollisionType, Shape, Circle } from 'excalibur';
import { Resources } from './resources.js';

class ItemActor extends Actor {
    constructor(item, x, y) {
        super({
            pos: new Vector(x, y),
            collisionType: CollisionType.Passive // Passive collision type for items
        });

        this.item = item;

        // Set the appearance and collision shape for the item
        if (item instanceof Helmet) {
            const helmetSprite = Resources.Helmet.toSprite();
            helmetSprite.scale = new Vector(0.2, 0.2);
            this.graphics.use(helmetSprite);
            this.collider.set(Shape.Box(helmetSprite.width * helmetSprite.scale.x, helmetSprite.height * helmetSprite.scale.y));
        } else if (item instanceof Gun) {
            const gunCircle = new Circle({
                radius: 10,
                color: Color.Red
            });
            this.graphics.use(gunCircle);
            this.collider.set(Shape.Circle(10));
        }
    }
}

class Item {
    constructor(name, quantity = 1) {
        this.name = name;
        this.quantity = quantity;
    }

    toActor(x, y) {
        return new ItemActor(this, x, y);
    }
}

class Helmet extends Item {
    constructor(name, defense) {
        super(name);
        this.defense = defense;
    }
}

class Gun extends Item {
    constructor(name, attack) {
        super(name);
        this.attack = attack;
    }
}

class Inventory {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
    }

    removeItem(itemName, quantity = 1) {
        const itemIndex = this.items.findIndex(i => i.name === itemName);
        if (itemIndex !== -1) {
            this.items[itemIndex].quantity -= quantity;
            if (this.items[itemIndex].quantity <= 0) {
                this.items.splice(itemIndex, 1);
            }
        }
    }

    getItems() {
        return this.items;
    }
}

class Bullet extends Actor {
    constructor(x, y, direction) {
        super({
            pos: new Vector(x, y),
            width: 10,
            height: 10,
            color: Color.Yellow,
            collisionType: CollisionType.Passive
        });
        this.vel = direction.scale(300); // Adjust bullet speed as needed
        this.z = 1;
    }

    onInitialize(engine) {
        this.engine = engine;
    }

    onPreUpdate(engine, delta) {
        // Remove the bullet if it goes off screen
        if (this.pos.x < 0 || this.pos.x > engine.drawWidth || this.pos.y < 0 || this.pos.y > engine.drawHeight) {
            this.kill();
        }
    }
}

export { Item, Helmet, Gun, Inventory, ItemActor, Bullet };


