import Phaser from "phaser";
import C4C from "c4c-lib";
import ExampleScene from "./scenes/GameScene";

// You can define a custom theme here and pass it into .create below
const theme = {
  "&": {
    color: "red",
    backgroundColor: "blue",
  },
  ".cm-content, .cm-gutter": {
    minHeight: "600px",
  }
}

C4C.Editor.create(document.body, null, true);

var config = {
  parent: "body",
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  dom: {
    createContainer: true,
  },
  scene: [ExampleScene],
};

const game = new Phaser.Game(config);
