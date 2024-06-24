import { ImageSource, Loader } from "excalibur";
import { Helmet } from "./Inventory";

const Resources = {
  Mia: new ImageSource("/images/Mia.png"),
  Player: new ImageSource("/images/Spritesheet_player.png"),
  Boss: new ImageSource("/images/Trash_monster_spritesheet.png"),
  Helmet: new ImageSource("/images/helmet.png"),
  Map: new ImageSource("/map/map.png"),
  Bench: new ImageSource("/map/bench.png"),
  BlueTable: new ImageSource("/map/bluetable.png"),
  LimeTable: new ImageSource("/map/limetable.png"),
  PinkTable: new ImageSource("/map/pinktable.png"),
  PurpleTable: new ImageSource("/map/purpletable.png"),
  RedTable: new ImageSource("/map/redtable.png"),
  Tree: new ImageSource("/map/tree.png"),
  Sewer: new ImageSource("/images/sewerBG.png")
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };
