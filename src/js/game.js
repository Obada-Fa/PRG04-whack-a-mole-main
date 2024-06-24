import { DisplayMode, Engine, Color, Vector } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { MapScene } from './mapScene.js';
import { SewerFightScene } from './sewerscene.js';
import { Boss } from './boss.js';

class Game extends Engine {
    constructor() {
        super({
            width: 1440,
            height: 760,
            displayMode: DisplayMode.FitScreen,
            backgroundColor: Color.fromHex('#edcda7')
        });

        this.start(ResourceLoader).then(() => {
            this.add('map', new MapScene());
            this.add('fight', new SewerFightScene(this, new Vector(720, 380), Boss, new Vector(720, 380)));

            this.goToScene('map');
        });
    }

    onInitialize() {
        // Initialization code if needed
    }
}

new Game();