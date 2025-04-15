import Phaser from "phaser";

import parrotImg from "../assets/polly.png";
import parrotImg2 from "../assets/polly2.png";
import grassImg from "../assets/grassNew.png";
import stoneImg from "../assets/stoneNew.png";
import treeImg from "../assets/treeNew2.png";
import treasureImg from "../assets/treasure.png";
import mapPieceImg from "../assets/pieceOfMap.png";
import waterImg from "../assets/waterNew.png";
import sandImg from "../assets/sandNew.png";
import cannonballImg from "../assets/cannonball.png"
import blankImg from "../assets/blank.png"
import gameOverImg from "../assets/loseSceneNew.png"
import gameWinImg from "../assets/GameWinNew.png"
import unloadedCannonImg from "../assets/unloadedCannon.png"
import loadedCannonImg from "../assets/loadedCannon.png"
import leftSwitchImg from "../assets/leftSwitch.png"
import rightSwitchImg from "../assets/rightSwitch.png"
import winScreenImg from "../assets/WinScreen.png"
import deactivatedSwitchBarrierImg from "../assets/switchOff.png"
import activatedSwitchBarrierImg from "../assets/switchOn.png"
import bgm from "../assets/zbgm.mp3"

import C4C from "c4c-lib";

import { GenerateSceneFromLevelData } from "../level.js";
import Buttons from "../Buttons";
import Entity from "../entity";
import Treasure from "../Treasure";
import PieceOfMap from "../PieceOfMap";
import InteractionsManager from "../interactions";
import Parrot from "../Parrot.js";
import Emitter from "../Emitter.js";
import Switch from "../Switch.js";
import SwitchBarrier from "../SwitchBarrier.js";

import Cannonball from "../Cannonball.js";
import Barrier from "../Barrier.js";
import { levels } from "../levels.js";

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
    
    //Set the level based on query string
    this.level = 1;
    
    var name = "level"
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(window.location.href);

    if (!results || !results[2]){
      this.level = 1;
        window.location.replace('./index.html?level=1');
    }else{
      this.level = decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    document.getElementById("dropdownMenuButton").firstChild.data = "Level " + this.level;

    if(localStorage.getItem("maxLevel") == null){
      localStorage.setItem("maxLevel", this.level);
    }

    if(this.level > localStorage.getItem("maxLevel")){
      alert("Oh, a cheater?!\nNice try buddy ;)");
      window.location.replace(window.location.href.slice(0,-1) + localStorage.getItem("maxLevel"));
    }

    const levelDropdown = document.querySelector('.dropdown-menu')
  
    for(var i = 1; i <= localStorage.getItem("maxLevel"); i++){
      let html = '<li><a href=\"./index.html?level=' + 
        (i) + '\" data-value=\"'+ (i) + '\">Level ' + (i) + '</a></li>';
      let div = document.createElement('div');
      div.innerHTML = html;
      levelDropdown.appendChild(div);
    }

  }

  //Load in images || TODO: move to own file
  preload() {
    this.load.image("parrot", parrotImg);
    this.load.image("parrot2", parrotImg2);
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
    this.load.image("winScreen", winScreenImg)
    this.load.image("unloadedCannon", unloadedCannonImg);
    this.load.image("loadedCannon", loadedCannonImg);
    this.load.image("leftSwitch", leftSwitchImg);
    this.load.image("rightSwitch", rightSwitchImg);
    this.load.image("deactivatedSwitchBarrier", deactivatedSwitchBarrierImg);
    this.load.image("activatedSwitchBarrier", activatedSwitchBarrierImg);

    this.load.audio('bgm', bgm);
  }

  // Create Scene
  create() {

    //start sound
    this.sound.unlock();
    this.sound.play('bgm', {loop: true});

    // Initialize editor window
    C4C.Editor.Window.init(this);
    C4C.Editor.Window.open();

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

      }
    })

    const levelDropdown = document.querySelector('.dropdown-menu')

    for (const child of levelDropdown.children) {
      child.addEventListener('click', (e) => {
        const newLevelName = (child.children[0].dataset.value)
      })
    }

    let NumTilesX = 30;
    let NumTilesY = 30;
    this.tiles = [];
    this.entities = [];

    this.splash = null;

    this.doneVisualUpdate = true;

    this.doneVisualUpdate = true;

    this.loadScene();

    this.buttons.enabled = true;

    const updateAll = () => {
      this.entities.forEach((e) => e.update());
      this.interactionsManager.checkInteractions(
        this.entities.filter((e) => e.alive)
      );
    };

    const updateSwitches = () => {
      this.entities.forEach((e) => updateIfSwitch(e));
    };

    function updateIfSwitch(entity) {
      if (entity.texture == "leftSwitch" || entity.texture == "rightSwitch" || entity.texture == "activatedSwitchBarrier" || entity.texture == "deactivatedSwitchBarrier") {
        entity.update();
      }
    }

    // Intepreter Function Definitions
    C4C.Interpreter.define("moveRight", () => {
      
      this.parrot.savePos();
      this.parrot.sprite.setFlipX(false);
      this.parrot.moveTo(this.parrot.x + 1, this.parrot.y);
      updateAll();
      updateSwitches();
      });
      
      C4C.Interpreter.define("moveLeft", () => { 
       
        this.parrot.savePos();
        this.parrot.sprite.setFlipX(true);
        this.parrot.moveTo(this.parrot.x - 1, this.parrot.y);
        updateAll();
      updateSwitches();
    });

    C4C.Interpreter.define("moveDown", () => {
      this.parrot.savePos();
      this.parrot.moveTo(this.parrot.x, this.parrot.y + 1);
      updateAll();
      updateSwitches();
    });

    C4C.Interpreter.define("moveUp", () => {
      this.parrot.savePos();
      this.parrot.moveTo(this.parrot.x, this.parrot.y - 1);
      updateAll();
      updateSwitches();
    });

    C4C.Interpreter.define("wait", () => {
      this.parrot.savePos();
      updateAll();
      updateSwitches();
    });

    C4C.Interpreter.define("random", () => {return Math.random() > 0.5});

    C4C.Interpreter.define("safeUp", () => { return this.parrot.canMove(this, 0, -1)});
    C4C.Interpreter.define("safeDown", () => {return this.parrot.canMove(this, 0, 1)});
    C4C.Interpreter.define("safeRight", () => {return this.parrot.canMove(this, 1, 0)});
    C4C.Interpreter.define("safeLeft", () => {return this.parrot.canMove(this, - 1, 0)});
    C4C.Interpreter.define("safeWait", () => {return this.parrot.canMove(this, 0, 0)});
    C4C.Interpreter.define("switch", () => {return this.switchValue});
    
    //Define interactions
    this.interactionsManager = new InteractionsManager();

    this.interactionsManager.addInteraction(
      [Parrot, PieceOfMap],
      (p, pieceOfMap) => {
        pieceOfMap.destroy(this);
        this.gameWin(p);
      }
    );

    this.interactionsManager.addInteraction(
      [Parrot, Treasure],
      (p, treasure) => {
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
      [Parrot, Switch],
      (p, s) => {
        if(p.saveX != s.x || p.saveY != s.y){
          s.flipSwitch(this);
        }
      }
    );

    this.interactionsManager.addInteraction(
      [Parrot, SwitchBarrier],
      (p, b) => {
        if (b.currentSprite == 0) {
          this.gameOver(p);
        }
      }
    );

    this.interactionsManager.addInteraction(
      [Cannonball, SwitchBarrier],
      (c, b) => {
        if (b.currentSprite == 0) {
          c.destroy(this);
        }
      }
    );

    this.interactionsManager.addInteraction(
      [Cannonball, Emitter],
      (c, _) => {
        c.destroy(this)
      }
    );

  }

  /**Call on player failure */
  gameOver(p){
    p.destroy(this);

    this.splash = this.add.sprite(300,300, "gameOver");
    this.splash.setDisplaySize(960, 540);
    
    this.destroyAll();
    
    C4C.Editor.Window.close();
    this.buttons = new Buttons(this);
    this.buttons.enabled = false;
  }

  /**Call on player success */
  gameWin(p){
    p.destroy(this);

    this.add.rectangle(0,0,3000, 1080, 0xDDFFFF)
    if (this.level == 6) {
      this.splash = this.add.sprite(450, 300, "winScreen");
      this.splash.setDisplaySize(960, 540);
    } else {
      this.splash = this.add.sprite(300,300, "gameWin");
      this.splash.setDisplaySize(960, 540);
    }
    this.destroyAll();

    C4C.Editor.Window.close();

    this.buttons = new Buttons(this, 1);
    this.buttons.enabled = false;

    //Update available levels
    if(this.level < 7){
      this.level++;
    }

    if(localStorage.getItem("maxLevel") < this.level){
      localStorage.setItem("maxLevel", this.level);
    }

    const levelDropdown = document.querySelector('.dropdown-menu')

    levelDropdown.innerHTML = "";

    for(let i = 1; i <= localStorage.getItem("maxLevel"); i++){
      let html = '<li><a href=\"./index.html?level=' + 
        (i) + '\" data-value=\"'+ (i) + '\">Level ' + (i) + '</a></li>';
      let div = document.createElement('div');
      div.innerHTML = html;
      levelDropdown.appendChild(div);
    }
  }

  /**Run each frame to update game state*/
  update() {

    if (this.buttons.isUpdating) {
      
      if (Date.now() - this.buttons.timeOfLastUpdate > 500) {
        const programText = C4C.Editor.getText();
        if (this.buttons.location[1][0] == 0) {
          this.buttons.location = C4C.Interpreter.stepRun(programText, this.buttons.location[1]);
          this.buttons.timeOfLastUpdate = Date.now();
        } else {
          this.buttons.isUpdating = false;
          this.buttons.location = [0, [0]];
          alert("Polly did everything you said but didn't reach the map! \nPress restart so she can try again!");
        }
      }
    }

    // update visuals, and keep track if whether all entities are done.

    this.doneVisualUpdate = true; // assume viz updates are done.
    let numEntitiesDone=0;

    this.entities.forEach((entity) => {
      let isEntityDone = entity.visualUpdate();
      if (entity.x > 29) {
        entity.destroy(this)
      }
      this.doneVisualUpdate &= isEntityDone;  // if *any* entity is not done, this.doneVisualUpdate will be false.
      numEntitiesDone+=isEntityDone?1:0;
    });
    

    // wait until all entities are done with their visual updates
    //malso check that 1 second has passed.
    if (this.doneVisualUpdate && Date.now() - this.lastUpdate > 1000) {
      // if so, run the next line of code.
      const programText = C4C.Editor.getText();
      const res = C4C.Interpreter.stepRun(programText, [this.loc]);
      this.loc = res[1];
      this.lastUpdate = Date.now();
      this.doneVisualUpdate = false;
    }
  }

  /**Run whenever refreshing the scene.*/
  loadScene(run=false){

    let programText = localStorage.getItem("level" + this.level);
    C4C.Editor.setText(programText == "" || programText == null ? "Code goes here!" : programText);

    this.switchValue = false;

    if(this.splash !== null){
      this.splash.destroy(this);
    }

    this.entities.forEach((e) => e.destroy(this));
    this.tiles.forEach((row) => row.forEach((t) => t.destroy(this)));

    // Set tile layout
    this.tiles = [];
    this.entities = [];
    

    GenerateSceneFromLevelData(levels['level' + this.level],this,TILE_SIZE);

    // Cannon randomness on levels 4 and 6
    if(this.level == 4 ){
      let rand = Math.random();
      if (rand<1/6){
        levels['level'+4].entities[2].interval=0;
        levels['level'+4].entities[3].interval=1;
        levels['level'+4].entities[4].interval=1;
        levels['level'+4].entities[5].interval=1;
        levels['level'+4].entities[6].interval=1;
        levels['level'+4].entities[7].interval=1;
      } else if (rand < 2/6) {
        levels['level'+4].entities[2].interval=1;
        levels['level'+4].entities[3].interval=0;
        levels['level'+4].entities[4].interval=1;
        levels['level'+4].entities[5].interval=1;
        levels['level'+4].entities[6].interval=1;
        levels['level'+4].entities[7].interval=1;
      } else if (rand < 3/6) {
        levels['level'+4].entities[2].interval=1;
        levels['level'+4].entities[3].interval=1;
        levels['level'+4].entities[4].interval=0;
        levels['level'+4].entities[5].interval=1;
        levels['level'+4].entities[6].interval=1;
        levels['level'+4].entities[7].interval=1;
      } else if (rand < 4/6) {
        levels['level'+4].entities[2].interval=1;
        levels['level'+4].entities[3].interval=1;
        levels['level'+4].entities[4].interval=1;
        levels['level'+4].entities[5].interval=0;
        levels['level'+4].entities[6].interval=1;
        levels['level'+4].entities[7].interval=1;
      } else if (rand < 5/6) {
        levels['level'+4].entities[2].interval=1;
        levels['level'+4].entities[3].interval=1;
        levels['level'+4].entities[4].interval=1;
        levels['level'+4].entities[5].interval=1;
        levels['level'+4].entities[6].interval=0;
        levels['level'+4].entities[7].interval=1;
      } else {
        levels['level'+4].entities[2].interval=1;
        levels['level'+4].entities[3].interval=1;
        levels['level'+4].entities[4].interval=1;
        levels['level'+4].entities[5].interval=1;
        levels['level'+4].entities[6].interval=1;
        levels['level'+4].entities[7].interval=0;
      }
  }

  if(this.level == 5){
    if(Math.random()<0.5){
      levels['level'+5].entities[3].interval=2;
      levels['level'+5].entities[4].interval=3;
      levels['level'+5].entities[5].interval=2;
      levels['level'+5].entities[6].interval=3;
    } else{
      levels['level'+5].entities[3].interval=2;
      levels['level'+5].entities[4].interval=2;
      levels['level'+5].entities[5].interval=3;
      levels['level'+5].entities[6].interval=2;
    }
}

    this.entities.forEach((e) => e.initialize(this));

    // Create some interface to running the interpreter:
    if(this.buttons == null){
      this.buttons = new Buttons(this);
    }

    if(!run){
    this.buttons.enabled = true;
    }else{
      
      this.buttons.isUpdating = true;
      this.buttons.timeOfLastUpdate = Date.now() - 500;
      this.buttons.enabled = false;

      C4C.Editor.Window.close();
    }
  }

  /**Call on close to clear entities + tiles*/
  destroyAll(){
    while(this.entities.length > 0){
      this.entities[0].destroy(this);
    }
    
    for(var i = 0 ; i < this.tiles.length; i++){
      for(var j = 0; j < this.tiles[i].length; j++){
        this.tiles[i][j].destroy(this);
      }
    }
  }
}
