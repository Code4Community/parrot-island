import Phaser from "phaser";

import parrotImg from "../assets/parrot.png";
import grassImg from "../assets/grassNew.png";
import stoneImg from "../assets/stoneNew.png";
import treeImg from "../assets/treeNew2.png";
import treasureImg from "../assets/treasure.png";
import mapPieceImg from "../assets/pieceOfMap.png";
import waterImg from "../assets/waterNew.png";
import sandImg from "../assets/sandNew.png";
import cannonballImg from "../assets/cannonball.png"
import blankImg from "../assets/blank.png"
import gameOverImg from "../assets/gameOver.png"
import unloadedCannonImg from "../assets/unloadedCannon.png"
import loadedCannonImg from "../assets/loadedCannon.png"

import level1JSON from "../assets/levels/level1.json";
import level2JSON from "../assets/levels/level2.json";
import level3JSON from "../assets/levels/level3.json";

import C4C from "c4c-lib";


import { GenerateSceneFromLevelData } from "../level.js";
import Buttons from "../Buttons";
import Entity from "../entity";
import Treasure from "../Treasure";
import PieceOfMap from "../PieceOfMap";
import InteractionsManager from "../interactions";
import Parrot from "../Parrot.js";
import Emitter from "../Emitter.js";

import Cannonball from "../Cannonball.js";
import Barrier from "../Barrier.js";
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
    this.level = 1;
    this.levelJSONs = [level1JSON, level1JSON, level2JSON, level3JSON];
  }

  setLevel(level) {
    var level = document.getElementById('dropdownMenuButton').value;
    this.level = level;
    this.currentStep = 0;
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
    this.load.image("cannonball", cannonballImg);
    this.load.image("mapPiece", mapPieceImg);
    this.load.image("none", blankImg);
    this.load.image("gameOver", gameOverImg);
    this.load.image("unloadedCannon", unloadedCannonImg);
    this.load.image("loadedCannon", loadedCannonImg);
  }

  // Create Scene
  create() {
    // Initialize editor window
    C4C.Editor.Window.init(this);
    C4C.Editor.Window.open();
    C4C.Editor.setText(`moveLeft(1)`);

    const canvas = document.querySelector('canvas')

    this.levelEditData = level1JSON;
    this.currentTile = 0;
    this.editorEnabled = false;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.currentTile += 1;
      } else if (e.key === 'ArrowLeft') {
        this.currentTile -= 1;
      } else if (e.key === '~') {
        this.editorEnabled = !this.editorEnabled;
      }
    })

    canvas.addEventListener('click', (e) => {
      if (this.editorEnabled) {
        let tileMap = {
          0: "water",
          1: "grass",
          2: "sand",
          3: "stone",
          4: "tree",
        };
        const x = Math.floor(e.offsetX / TILE_SIZE);
        const y = Math.floor(e.offsetY / TILE_SIZE);
        this.levelEditData.tiles[y][x] = this.currentTile;
        let tile = this.add.sprite(
          x * TILE_SIZE + TILE_SIZE / 2,
          y * TILE_SIZE + TILE_SIZE / 2,
          tileMap[this.currentTile]
        );

        tile.width = TILE_SIZE;
        tile.displayWidth = TILE_SIZE;
        tile.height = TILE_SIZE;
        tile.displayHeight = TILE_SIZE;

        console.log(this.levelEditData.tiles);
      }
    })

    let NumTilesX = 30;
    let NumTilesY = 30;
    this.tiles = [];
    this.entities = [];

    this.splash = null;

    this.loadScene();

    this.doneVisualUpdate = true;

    this.entities.forEach((e) => e.initialize(this));
    const updateAll = () => {
      this.entities.forEach((e) => e.update());
    };

    // Intepreter Movement Commands
    C4C.Interpreter.define("moveRight", (x_dist) => {
      this.parrot.x += x_dist;
      console.log('moving right...')
      updateAll();
      this.interactionsManager.checkInteractions(
        this.entities.filter((e) => e.alive)
        );
      });
      
      C4C.Interpreter.define("moveLeft", (x_dist) => {
        this.parrot.x -= x_dist;
        updateAll();
        console.log('moving left...')
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

    //Define interactions

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

    this.interactionsManager.addInteraction(
      [Parrot, Barrier],
      (p, _) => {
        this.gameOver(p);
      }
    );

    this.interactionsManager.addInteraction(
      [Parrot, Cannonball],
      (p, _) => {
        this.gameOver(p);
      }
    );

    this.interactionsManager.addInteraction(
      [Parrot, Emitter],
      (p, _) => {
        this.gameOver(p);
      }
    );
  }

  gameOver(p){
    p.destroy();
    this.splash = this.add.sprite(450,450,"gameOver");

    this.entities.forEach((e) => e.destroy(true));
    this.tiles.forEach((row) => row.forEach((t) => t.destroy(true)));
    
    C4C.Editor.Window.close();
    this.buttons = new Buttons(this);
  }

  update() {
    // update visuals, and keep track if whether all entities are done.

    this.doneVisualUpdate = true; // assume viz updates are done.
    let numEntitiesDone=0;

    this.entities.forEach((entity) => {
      let isEntityDone = entity.visualUpdate();
      this.doneVisualUpdate &= isEntityDone;  // if *any* entity is not done, this.doneVisualUpdate will be false.
      numEntitiesDone+=isEntityDone?1:0;
      // if(!isEntityDone){
      //   console.log(entity)
      // }
    });

    console.log("done visual update? "+this.doneVisualUpdate)

    // wait until all entities are done with their visual updates
    //malso check that 1 second has passed.
    if (this.doneVisualUpdate && Date.now() - this.lastUpdate > 1000) {
      // if so, run the next line of code.
      const programText = C4C.Editor.getText();
      const res = C4C.Interpreter.stepRun(programText, [this.loc]);
      this.loc = res[1];
      this.interactionsManager.checkInteractions(
        this.entities.filter((e) => e.alive)
      );
      this.lastUpdate = Date.now();
      this.doneVisualUpdate = false;
    }
  }

  loadScene(){

    if(this.splash !== null){
      this.splash.destroy();
    }

    this.entities.forEach((e) => e.destroy(true));
    this.tiles.forEach((row) => row.forEach((t) => t.destroy(true)));

    // Set tile layout
    this.tiles = [];
    this.entities = [];

    GenerateSceneFromLevelData(this.levelJSONs[this.level],this,TILE_SIZE);

    for (let x = 4; x < 20; x++) {
      if (Math.random() < 0.5) {
        this.entities.push(new PieceOfMap(x, 0, TILE_SIZE));
      } else {
        this.entities.push(new Treasure(x, 0, TILE_SIZE));
      }
    }

    this.entities.forEach((e) => e.initialize(this));

    // Create some interface to running the interpreter:
    this.buttons = new Buttons(this);
  }
}
