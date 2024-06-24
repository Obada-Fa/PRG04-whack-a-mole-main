import { Actor, Vector, CollisionType, Shape } from "excalibur";

export class MapContents extends Actor {
  constructor(x, y) {
    super({
      //height: 50,
      // width: 50,
      pos: new Vector(x, y),
    });
  }

  onInitialize(engine) {
    this.z = 2;
    //const collider = Shape.Box(72, 55, new Vector(0.55, -0.15));
    //this.collider.set(collider);
  }
}
