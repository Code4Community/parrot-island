import Phaser from "phaser";
import C4C from "c4c-lib";
import WorldGame from "./scenes/GameScene";

// You can define a custom theme here and pass it into .create below
const theme = {
  "&": {
    color: "#00007F",
    backgroundColor: "#DDFFFF",
    maxWidth: "300px",
  },
  ".cm-content, .cm-gutter": {
    minHeight: "600px",
  }
}

C4C.Editor.create(document.body, theme, true);

var config = {
  parent: "body",
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  pixelArt: true,
  dom: {
    createContainer: true,
  },
  scene: [WorldGame],
  backgroundColor:"#000000",
};

const game = new Phaser.Game(config);
