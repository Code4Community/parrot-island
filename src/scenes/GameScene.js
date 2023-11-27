import Phaser from "phaser";
import Physics from "phaser";

import parrotImg from "../assets/parrot.png";
import grassImg from "../assets/grass.png";
import stoneImg from "../assets/stone.png";
import treeImg from "../assets/tree.png";
import treasureImg from "../assets/treasure.png";
import mapPieceImg from "../assets/pieceOfMap.png";

import C4C from "c4c-lib";

import { IslandTiles } from "./WorldGen.js";

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
        this.entities = []
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
        this.load.image("water", stoneImg);
    }

    // Create Scene
    create() {
        // Initialize editor window
        C4C.Editor.Window.init(this);
        // C4C.Editor.Window.open();
        C4C.Editor.setText(`moveRight(1)\nmoveRight(1)\nmoveRight(1)\nmoveDown(1)\nmoveDown(1)\nmoveUp(1)\nmoveUp(1)\nmoveRight(1)\nmoveRight(1)\nmoveRight(1)`);

		let NumTilesX=30
		let NumTilesY=30

        // Set tile layout
        this.tiles = []
		this.textureGrid = IslandTiles(NumTilesX, NumTilesY);

        for (let y = 0; y < 30; y++) {
            let row = [];
            for (let x = 0; x < 30; x++) {
                let texture = this.textureGrid[y][x]
                let tile = this.add.sprite(
                    x * TILE_SIZE + TILE_SIZE / 2,
                    y * TILE_SIZE + TILE_SIZE / 2,
                    texture
                );
                tile.width = TILE_SIZE;
                tile.displayWidth = TILE_SIZE;
                tile.height = TILE_SIZE;
                tile.displayHeight = TILE_SIZE;
                row.push(tile);
            }
            this.tiles.push(row);
        }

        this.parrot = new Parrot(0, 0, TILE_SIZE);
        this.entities.push(this.parrot)

		for (let x = 4; x < 20; x++) {
			if (Math.random() < 0.5) {
				this.entities.push(new PieceOfMap(x, 0, TILE_SIZE));
			} else {
				this.entities.push(new Treasure(x, 0, TILE_SIZE));
			}
		}

        // this.treasure = new Treasure(8, 4, TILE_SIZE)
        // this.entities.push(this.treasure)

		// for (let i = 0; i < 20; i++) {
		// 	for (let j = 0; j < 20; j++) {
		// 		const tree = new Tree(i, j, TILE_SIZE);
		// 		this.entities.push(tree)
		// 	}
		// }

        this.entities.forEach(e => e.initialize(this))

		this.interactionsManager = new InteractionsManager();

		// this.interactionsManager.addInteraction([Tree, Tree], (t1, t2) => {
		// 	t1.destroy();
		// 	t2.destroy();
		// })

		this.interactionsManager.addInteraction([Parrot, PieceOfMap], (_, pieceOfMap) => {
			pieceOfMap.destroy();
		})

		this.interactionsManager.addInteraction([Parrot, Treasure], (_, treasure) => {
			treasure.destroy();
		})

		// Define new function and store it in the symbol "alert-hello". This
		// function can now be called from our little language.
		C4C.Interpreter.define("alertHello", () => {
			alert("hello");
		});

		const updateAll = () => {
        	this.entities.forEach(e => e.update())
		}

		//Intepreter Movement Commands
		C4C.Interpreter.define("moveRight", (x_dist) => {
			this.parrot.x += x_dist
            updateAll()
		});

		C4C.Interpreter.define("moveLeft", (x_dist) => {
			this.parrot.x -= x_dist;
            updateAll()
		});

		C4C.Interpreter.define("moveDown", (y_dist) => {
			this.parrot.y += y_dist;
            updateAll()
		});

		C4C.Interpreter.define("moveUp", (y_dist) => {
			this.parrot.y -= y_dist;
            updateAll()
		});

		let n = 0;

		// Create some interface to running the interpreter:
		// Run Button
		const runButton = this.add
			.text(550, 100, "Evaluate", { fill: "#fff", fontSize: "30px" })
			.setInteractive()
			.on("pointerdown", () => {
				const programText = C4C.Editor.getText();
				// HERE'S THE IMPORTANT PART!!
				// if (n % 2 === 0) {
				// 	this.interactionsManager.checkInteractions(this.entities.filter(e => e.alive));
				// } else {
				// 	C4C.Interpreter.run(programText);
				// }
				// n++;
			})
			.on("pointerover", () => enterButtonHoverState(runButton))
			.on("pointerout", () => enterButtonRestState(runButton));

		// Editor Button
		const editorButton = this.add
			.text(500, 200, "Toggle Editor", {
				fill: "#fff",
				fontSize: "30px",
			})
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
                this.entities.forEach(entity => {
                    entity.update()
                })
			})
			.on("pointerover", () => enterButtonHoverState(helpButton))
			.on("pointerout", () => enterButtonRestState(helpButton));
    }

	lastUpdate = Date.now()

	loc = 0;

    update() {
		if (Date.now() - this.lastUpdate > 1000) {
			const programText = C4C.Editor.getText();
			const res = C4C.Interpreter.stepRun(programText, [this.loc])
			this.loc = res[1]
			this.interactionsManager.checkInteractions(this.entities.filter(e => e.alive));
			this.lastUpdate = Date.now();
		}
		this.entities.forEach(entity => {
			entity.visualUpdate()
		})
    }
}
