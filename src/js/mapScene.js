import { Scene, Actor, Vector, Sprite } from "excalibur";
import { Resources } from "./resources.js";
import { Player } from "./Player.js";
import { Bench, Tree, BlueTable, LimeTable } from "./mapdecoration.js";

class MapScene extends Scene {
  onInitialize(engine) {
    console.log("MapScene onInitialize called");

    // Load the map
    const map = new Actor({
      pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
      width: 3840,
      height: 3968,
    });
    const mapSprite = Sprite.from(Resources.Map);
    map.graphics.use(mapSprite);
    this.add(map);

    // Define map boundaries
    const minX = -50;
    const minY = -150;
    const maxX = 1600;
    const maxY = 1000;

    // Spawn the player
    this.player = new Player(
      engine.drawWidth / 2,
      engine.drawHeight / 2,
      minX,
      minY,
      maxX,
      maxY
    );
    this.add(this.player);

    // Adjust camera to follow the player
    engine.currentScene.camera.strategy.lockToActor(this.player);
    engine.currentScene.camera.strategy.elasticToActor(this.player, 0.5, 0.5);

    // Prevent the camera from showing outside the map
    engine.currentScene.camera.strategy.limitCameraBounds({
      left: minX,
      right: maxX,
      top: minY,
      bottom: maxY,
    });

    // Adjust the camera zoom level based on the map size and screen size
    const zoomX = engine.drawWidth / map.width;
    const zoomY = engine.drawHeight / map.height;
    const zoom = Math.min(zoomX, zoomY) * 7; // Adjust the multiplier as needed

    // engine.currentScene.camera.zoom = zoom;

    // Add map decorations
    const benchPositions = [
      { x: 350, y: 345 },
      { x: 540, y: 345 },
      { x: 625, y: 345 },
      { x: 825, y: 345 },
      { x: 925, y: 345 },
      { x: 350, y: 1100 },
      { x: 590, y: 1100 },
      { x: 1150, y: 1100 },
      { x: 1025, y: 1100 },
      { x: 850, y: 1100 },
      { x: 1000, y: 925 },
      { x: 1310, y: 925 },
      { x: 1405, y: 925 },
      { x: 1000, y: 750 },
      { x: 1150, y: 750 },
    ];

    benchPositions.forEach((pos) => {
      const bench = new Bench(pos.x, pos.y);
      this.add(bench);
    });

    const treePositions = [
      { x: 440, y: 300 },
      { x: 720, y: 300 },
      { x: 1000, y: 300 },
      { x: 133, y: 380 },
      { x: 110, y: 620 },
      { x: 110, y: 795 },
      { x: 300, y: 765 },
      { x: 520, y: 1050 },
    ];

    treePositions.forEach((pos) => {
      const tree = new Tree(pos.x, pos.y);
      this.add(tree);
    });

    const blueTablePositions = [
      //   { x: 300, y: 400 },
      //   { x: 600, y: 800 },
    ];

    blueTablePositions.forEach((pos) => {
      const blueTable = new BlueTable(pos.x, pos.y);
      this.add(blueTable);
    });

    const limeTablePositions = [
      //   { x: 150, y: 500 },
      //   { x: 450, y: 650 },
    ];

    limeTablePositions.forEach((pos) => {
      const limeTable = new LimeTable(pos.x, pos.y);
      this.add(limeTable);
    });
  }

  onPreUpdate(engine, delta) {
    // Check if the player has reached the target position
    const targetPosition = new Vector(90, 1000);
    const distance = this.player.pos.distance(targetPosition);

    if (distance < 50) {
      // Allow some tolerance for the position
      // Switch to the fighting scene
      engine.goToScene("fight");
    }
  }

  onActivate(ctx) {
    console.log("MapScene activated");
  }
}

export { MapScene };
