import Phaser from "phaser";
import Physics from "phaser";

import parrotImg from "../assets/parrot.png";
import grassImg from "../assets/grassNew.png";
import stoneImg from "../assets/stoneNew.png";
import treeImg from "../assets/treeNew.png";
import treasureImg from "../assets/treasure.png";
import mapPieceImg from "../assets/pieceOfMap.png";
import waterImg from "../assets/waterNew.png";
import sandImg from "../assets/sandNew.png";

import C4C from "c4c-lib";

import { IslandTiles } from "./WorldGen.js";
import Buttons from "../Buttons";
import Entity from "../entity";
import Treasure from "../Treasure";
import PieceOfMap from "../PieceOfMap";
import InteractionsManager from "../interactions";
import Parrot from "../Parrot.js";

//Button Hovering
function enterButtonHoverState(btn) {
  btn.setStyle({ fill: "#ff0" });
}

function enterButtonRestState(btn) {
  btn.setStyle({ fill: "#fff" });
}

const TILE_SIZE = 30;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Example");
    // Buttons ;
    // Buttons.constructor()
  }

  //Load in images || TODO: move to own file
  preload() {
    // this.load.image("logo", logoImg);
    this.load.image("parrot", parrotImg);
    this.load.image("grass", grassImg);
    this.load.image("stone", stoneImg);
    this.load.image("tree", treeImg);
    this.load.image("treasure", treasureImg);
    this.load.image("mapPiece", mapPieceImg);
    this.load.image("water", waterImg);
    this.load.image("sand", sandImg);
  }

  // Create Scene
  create() {
    // Initialize editor window
    C4C.Editor.Window.init(this);
    C4C.Editor.Window.open();
    C4C.Editor.setText(`moveRight(1)`);

    let NumTilesX = 30;
    let NumTilesY = 30;

    // Set tile layout
    this.tiles = [];
    this.textureGrid = IslandTiles(NumTilesX, NumTilesY);

    this.entities = [];

    for (let y = 0; y < NumTilesY; y++) {
      let row = [];
      for (let x = 0; x < NumTilesX; x++) {
        row[x] = [];
        for (let layer = 0; layer < this.textureGrid[y][x].length; layer++) {
          let texture = this.textureGrid[y][x][layer];
          let tile = this.add.sprite(
            x * TILE_SIZE + TILE_SIZE / 2,
            y * TILE_SIZE + TILE_SIZE / 2,
            texture
          );
          tile.width = TILE_SIZE;
          tile.displayWidth = TILE_SIZE;
          tile.height = TILE_SIZE;
          tile.displayHeight = TILE_SIZE;
          row[x].push(tile);
        }
      }
      this.tiles.push(row);
    }

    /*for(var j = 0; j < NumTilesY; j++){
      for(var i = 0; i < NumTilesX; i++){
        this.add.rectangle(i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE, ((i + j) % 2 == 0)?0x00000:0x888888,0.1);
      }  
    }*/

    this.parrot = new Parrot(0, 0, TILE_SIZE);
    this.entities.push(this.parrot);

    for (let x = 4; x < 20; x++) {
      if (Math.random() < 0.5) {
        this.entities.push(new PieceOfMap(x, 0, TILE_SIZE));
      } else {
        this.entities.push(new Treasure(x, 0, TILE_SIZE));
      }
    }

    this.entities.forEach((e) => e.initialize(this));

    const updateAll = () => {
      this.entities.forEach((e) => e.update());
    };

    // Intepreter Movement Commands
    C4C.Interpreter.define("moveRight", (x_dist) => {
      this.parrot.x += x_dist;
      updateAll();
      this.interactionsManager.checkInteractions(
        this.entities.filter((e) => e.alive)
      );
    });

    C4C.Interpreter.define("moveLeft", (x_dist) => {
      this.parrot.x -= x_dist;
      updateAll();
      this.interactionsManager.checkInteractions(
        this.entities.filter((e) => e.alive)
      );
    });

    C4C.Interpreter.define("moveDown", (y_dist) => {
      this.parrot.y += y_dist;
      updateAll();
      this.interactionsManager.checkInteractions(
        this.entities.filter((e) => e.alive)
      );
    });

    C4C.Interpreter.define("moveUp", (y_dist) => {
      this.parrot.y -= y_dist;
      updateAll();
      this.interactionsManager.checkInteractions(
        this.entities.filter((e) => e.alive)
      );
    });

    // Create some interface to running the interpreter:
    new Buttons(this);

    this.interactionsManager = new InteractionsManager();

    this.interactionsManager.addInteraction(
      [Parrot, PieceOfMap],
      (_, pieceOfMap) => {
        pieceOfMap.destroy();
      }
    );

    this.interactionsManager.addInteraction(
      [Parrot, Treasure],
      (_, treasure) => {
        treasure.destroy();
      }
    );
  }

  update() {
    if (Date.now() - this.lastUpdate > 1000) {
      const programText = C4C.Editor.getText();
      const res = C4C.Interpreter.stepRun(programText, [this.loc]);
      this.loc = res[1];
      this.interactionsManager.checkInteractions(
        this.entities.filter((e) => e.alive)
      );
      this.lastUpdate = Date.now();
    }
    this.entities.forEach((entity) => {
      entity.visualUpdate();
    });
  }
}
