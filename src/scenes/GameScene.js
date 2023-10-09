import Phaser from "phaser";
import Physics from "phaser";

import parrotImg from "../assets/parrot.png";
import grassImg from "../assets/grass.png";
import stoneImg from "../assets/stone.png";

import C4C from "c4c-lib";

//Button Hovering
function enterButtonHoverState(btn) {
  btn.setStyle({ fill: "#ff0" });
}

function enterButtonRestState(btn) {
  btn.setStyle({ fill: "#fff" });
}

const TILE_SIZE = 30;

export default class GameScene extends Phaser.Scene{

  constructor() {
    super("Example")
  }

  //Load in images || TODO: move to own file
  preload() {
    // this.load.image("logo", logoImg);
    this.load.image("parrot", parrotImg);
    this.load.image("grass", grassImg);
    this.load.image("stone", stoneImg);
  }

  //Create Scene
  create() {

    //Initialize editor window
    C4C.Editor.Window.init(this);
    C4C.Editor.Window.open();
    C4C.Editor.setText(`moveRight(20)`);

    //Set tile layout
    this.tiles = []

    for (let y = 0; y < 30; y++) {
      let row = []
      for (let x = 0; x < 30; x++) {
        let texture;
        if (Math.random() < 0.5) {
          texture = "stone"
        } else {
          texture = "grass"
        }
        let tile = this.add.sprite(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, texture)
        tile.width = TILE_SIZE
        tile.displayWidth = TILE_SIZE
        tile.height = TILE_SIZE
        tile.displayHeight = TILE_SIZE
        row.push(tile)
      }
      this.tiles.push(row)
    }
        
    // coords for position
    this.parrot = this.add.sprite(TILE_SIZE / 2, TILE_SIZE / 2, "parrot")
    this.parrot.width = TILE_SIZE
    this.parrot.displayWidth = TILE_SIZE
    this.parrot.height = TILE_SIZE
    this.parrot.displayHeight = TILE_SIZE
    
    // Define new function and store it in the symbol "alert-hello". This
    // function can now be called from our little language.
    C4C.Interpreter.define("alertHello", () => {
      alert("hello");
    });

    //Intepreter Movement Commands
    C4C.Interpreter.define("moveRight", (x_dist) => {
      this.parrot.x += x_dist;
    });

    C4C.Interpreter.define("moveLeft", (x_dist) => {
      this.parrot.x -= x_dist;
    });

    C4C.Interpreter.define("moveDown", (y_dist) => {
      this.parrot.y += y_dist;
    });

    C4C.Interpreter.define("moveUp", (y_dist) => {
      this.parrot.y -= y_dist;
    });
    
    // Create some interface to running the interpreter:
    // Run Button
    const runButton = this.add
          .text(550, 100, "Evaluate", { fill: "#fff", fontSize: "30px" })
          .setInteractive()
          .on("pointerdown", () => {
            const programText = C4C.Editor.getText();
            // HERE'S THE IMPORTANT PART!!
            C4C.Interpreter.run(programText);
          })
          .on("pointerover", () => enterButtonHoverState(runButton))
          .on("pointerout", () => enterButtonRestState(runButton));

    // Editor Button
    const editorButton = this.add
          .text(500, 200, "Toggle Editor", { fill: "#fff", fontSize: "30px" })
          .setInteractive()
          .on("pointerdown", () => {
            C4C.Editor.Window.toggle();
          })
          .on("pointerover", () => enterButtonHoverState(editorButton))
          .on("pointerout", () => enterButtonRestState(editorButton));

    // Check Button
    const checkButton = this.add
          .text(570, 300, "Check", { fill: "#fff", fontSize: "30px" })
          .setInteractive()
          .on("pointerdown", () => {
            const programText = C4C.Editor.getText();
            // HERE'S THE IMPORTANT PART!!
            try {
              C4C.Interpreter.check(programText);              
            } catch (err) {
              console.log("Caught something: " + err);
            } finally {
              console.log("Done handling");
            }
          })
          .on("pointerover", () => enterButtonHoverState(checkButton))
          .on("pointerout", () => enterButtonRestState(checkButton));

    // Help Button
    const helpButton = this.add
          .text(580, 400, "Help", { fill: "#fff", fontSize: "30px" })
          .setInteractive()
          .on("pointerdown", () => {
            C4C.Editor.Window.toggle();
          })
          .on("pointerover", () => enterButtonHoverState(helpButton))
          .on("pointerout", () => enterButtonRestState(helpButton));
  }
}