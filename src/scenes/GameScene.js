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
import gameWinImg from "../assets/gameWin.png"
import unloadedCannonImg from "../assets/unloadedCannon.png"
import loadedCannonImg from "../assets/loadedCannon.png"

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
import { levels } from "../levels.js";
import BallBarrier from "../BallBarrier.js";
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
    
    //Set the level based on query string
    this.level = 1;
    
    var name = "level"
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(window.location.href);

    if (!results || !results[2]){
      this.level = 1;
    }else{
      this.level = decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    document.getElementById("dropdownMenuButton").firstChild.data = "Level " + this.level;

    //this.levelJSONs = [level1JSON, level1JSON, level2JSON, level3JSON];
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
    this.load.image("gameWin", gameWinImg);
    this.load.image("unloadedCannon", unloadedCannonImg);
    this.load.image("loadedCannon", loadedCannonImg);
  }

  // Create Scene
  create() {
    // Initialize editor window
    C4C.Editor.Window.init(this);
    C4C.Editor.Window.open();
    C4C.Editor.setText(`moveLeft\nmoveLeft`);

    const canvas = document.querySelector('canvas')

    this.levelEditData = levels['level1'];
    this.currentTile = 0;
    this.editorEnabled = false;
    // Level editor
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

    const levelDropdown = document.querySelector('.dropdown-menu')

    // levelDropdown.addEventListener('change', (e) => {
    for (const child of levelDropdown.children) {
      child.addEventListener('click', (e) => {
        const newLevelName = (child.children[0].dataset.value)
        //GenerateSceneFromLevelData(levels[newLevelName], this, TILE_SIZE)
      })
    }
    // })

    let NumTilesX = 30;
    let NumTilesY = 30;
    this.tiles = [];
    this.entities = [];

    this.splash = null;
    // this.parrot = new Parrot(0, 0, TILE_SIZE);
    // this.entities.push(this.parrot);
    // this.entities.push(new Emitter(12,3, 30, 1, 0, this));
    // this.entities.push(new Emitter(18, 10, 30, 0, -1, this));

    //GenerateSceneFromLevelData(levels['level2'],this,TILE_SIZE);
    // for (let x = 4; x < 20; x++) {
    //   if (Math.random() < 0.5) {
    //     this.entities.push(new PieceOfMap(x, 0, TILE_SIZE));
    //   } else {
    //     this.entities.push(new Treasure(x, 0, TILE_SIZE));
    //   }
    // }

    this.doneVisualUpdate = true;

    this.doneVisualUpdate = true;

    //this.entities.forEach((e) => e.initialize(this));
    this.loadScene();
    const updateAll = () => {
      this.entities.forEach((e) => e.update());
    };

    // Intepreter Movement Commands
    C4C.Interpreter.define("moveRight", () => {
      this.parrot.x += 1;
      console.log('moving right...')
      updateAll();
      this.interactionsManager.checkInteractions(
        this.entities.filter((e) => e.alive)
        );
      });
      
      C4C.Interpreter.define("moveLeft", () => {
        this.parrot.x -= 1;
        updateAll();
        console.log('moving left...')
      this.interactionsManager.checkInteractions(
        this.entities.filter((e) => e.alive)
      );
    });

    C4C.Interpreter.define("moveDown", () => {
      this.parrot.y += 1;
      updateAll();
      this.interactionsManager.checkInteractions(
        this.entities.filter((e) => e.alive)
      );
    });

    C4C.Interpreter.define("moveUp", () => {
      this.parrot.y -= 1;
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
        pieceOfMap.destroy(this);
      }
    );

    this.interactionsManager.addInteraction(
      [Parrot, Treasure],
      (_, treasure) => {
        treasure.destroy(this);
        this.gameWin(p);

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

    this.interactionsManager.addInteraction(
      [Cannonball, BallBarrier],
      (c, _) => {
        c.destroy(this);
      }
    );
  }

  gameOver(p){
    p.destroy(this);
    this.splash = this.add.sprite(450,450,"gameOver");

    this.entities.forEach((e) => e.destroy(this));
    
    console.log(this.entities.length);
    this.tiles.forEach((row) => row.forEach((t) => t.destroy(this)));
    
    C4C.Editor.Window.close();
    this.buttons = new Buttons(this);
  }
  gameWin(p){
    p.destroy(this);
    this.splash = this.add.sprite(300,300,"gameWin");

    this.entities.forEach((e) => e.destroy(this));
    this.tiles.forEach((row) => row.forEach((t) => t.destroy(this)));
    
    C4C.Editor.Window.close();
    this.buttons = new Buttons(this);
  }

  update() {

    /* This code runs through the code in the C4C program editor one step at a time. this.buttons.isUpdating is a member of the
       instance of buttons that is activated when the evaluate button is pressed. At that time, this.buttons.timeOfLastUpdate is
       also set to Date.now() - 1000, meaning the first statement will evaluate immediately. this.buttons.location[1][0] will 
       cease to be zero when the program is complete, at which point this.buttons.isUpdating will be se to false to stop
       the evaluation of lines, and the location will be reset to [0, [0]], which denotes the first line of the program.
    */
    // if (this.buttons.isUpdating) {
    //   if (Date.now() - this.buttons.timeOfLastUpdate > 1000) {
    //     const programText = C4C.Editor.getText();
    //     if (this.buttons.location[1][0] == 0) {
    //       this.buttons.location = C4C.Interpreter.stepRun(programText, this.buttons.location[1]);
    //       this.buttons.timeOfLastUpdate = Date.now();
    //     } else {
    //       this.buttons.isUpdating = false;
    //       this.buttons.location = [0, [0]];
    //     }
    //   }
    // }

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

    //console.log("done visual update? "+this.doneVisualUpdate)
    console.log(this.entities.length);

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
      this.splash.destroy(this);
    }

    this.entities.forEach((e) => e.destroy(this));
    this.tiles.forEach((row) => row.forEach((t) => t.destroy(this)));

    // Set tile layout
    this.tiles = [];
    this.entities = [];

    GenerateSceneFromLevelData(levels['level' + this.level],this,TILE_SIZE);

    this.entities.forEach((e) => e.initialize(this));

    // Create some interface to running the interpreter:
    this.buttons = new Buttons(this);
  }
}
