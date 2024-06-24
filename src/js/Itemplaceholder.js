import { Actor, Color, Vector, Circle } from 'excalibur';

class ItemPlaceholder extends Actor {
    constructor(name, type, x, y) {
        super({
            pos: new Vector(x, y),
            radius: 20, // Placeholder radius
            color: Color.Red // Placeholder color
        });
        this.name = name;
        this.type = type;
    }

    onInitialize(engine) {
        this.graphics.use(new Circle({ radius: this.radius, color: this.color }));
    }
}

export { ItemPlaceholder };
