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
import PieceOfMap from '../PieceOfMap'
import InteractionsManager from '../interactions'
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

    for (let y = 0; y < NumTilesY; y++) {
      let row = [];
      for (let x = 0; x < NumTilesX; x++) {
        row[x]=[]
        for(let layer=0;layer<this.textureGrid[y][x].length;layer++){
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

    this.parrot = new Entity(1, 1, "parrot", TILE_SIZE, 1);
    this.parrot.initialize(this);

    this.map = new Entity(8, 4, "mapPiece", TILE_SIZE, 1);
    this.map.initialize(this);

    this.treasure = new Entity(4, 8, "treasure", TILE_SIZE, 1);
    this.treasure.initialize(this);

    // Define new function and store it in the symbol "alert-hello". This
    // function can now be called from our little language.
    C4C.Interpreter.define("alertHello", () => {
      alert("hello");
    });

    //Intepreter Movement Commands
    C4C.Interpreter.define("moveRight", (x_dist) => {
      this.parrot.x += x_dist;
      this.parrot.visualUpdate();
    });

    C4C.Interpreter.define("moveLeft", (x_dist) => {
      this.parrot.x -= x_dist;
      this.parrot.visualUpdate();
    });

    C4C.Interpreter.define("moveDown", (y_dist) => {
      this.parrot.y += y_dist;
      this.parrot.visualUpdate();
    });

    C4C.Interpreter.define("moveUp", (y_dist) => {
      this.parrot.y -= y_dist;
      this.parrot.visualUpdate();
    });

    // Create some interface to running the interpreter:
    new Buttons(this);
  }
}
