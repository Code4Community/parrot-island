import Phaser from "phaser";
import Physics from "phaser";

import parrotImg from "../assets/parrot.png";
import grassImg from "../assets/grassNew.png";
import stoneImg from "../assets/stoneNew.png";
import treeImg from "../assets/treeNew2.png";
import treasureImg from "../assets/treasure.png";
import mapPieceImg from "../assets/pieceOfMap.png";
import waterImg from "../assets/waterNew.png";
import sandImg from "../assets/sandNew.png";

import level1JSON from "../assets/levels/level1.json";

import C4C from "c4c-lib";

import { IslandTiles } from "./WorldGen.js";
import { GenerateSceneFromLevelData } from "../level.js";
import Buttons from "../Buttons";

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
    GenerateSceneFromLevelData(level1JSON,this,TILE_SIZE);

    // coords for position
    this.parrot = this.add.sprite(TILE_SIZE / 2, TILE_SIZE / 2, "parrot");
    this.parrot.width = TILE_SIZE;
    this.parrot.displayWidth = TILE_SIZE;
    this.parrot.height = TILE_SIZE;
    this.parrot.displayHeight = TILE_SIZE;

    // coords for position
    this.mapPiece = this.add.sprite(TILE_SIZE * 8, TILE_SIZE * 4, "mapPiece");
    this.mapPiece.width = TILE_SIZE;
    this.mapPiece.displayWidth = TILE_SIZE;
    this.mapPiece.height = TILE_SIZE;
    this.mapPiece.displayHeight = TILE_SIZE;

    // coords for position
    this.treasure = this.add.sprite(TILE_SIZE * 4, TILE_SIZE * 8, "treasure");
    this.treasure.width = TILE_SIZE;
    this.treasure.displayWidth = TILE_SIZE;
    this.treasure.height = TILE_SIZE;
    this.treasure.displayHeight = TILE_SIZE;

    // Define new function and store it in the symbol "alert-hello". This
    // function can now be called from our little language.
    C4C.Interpreter.define("alertHello", () => {
      alert("hello");
    });

    //Intepreter Movement Commands
    C4C.Interpreter.define("moveRight", (x_dist) => {
      this.parrot.x += x_dist * TILE_SIZE;
    });

    C4C.Interpreter.define("moveLeft", (x_dist) => {
      this.parrot.x -= x_dist * TILE_SIZE;
    });

    C4C.Interpreter.define("moveDown", (y_dist) => {
      this.parrot.y += y_dist * TILE_SIZE;
    });

    C4C.Interpreter.define("moveUp", (y_dist) => {
      this.parrot.y -= y_dist * TILE_SIZE;
    });

    // Create some interface to running the interpreter:
    new Buttons(this);
  }
}
