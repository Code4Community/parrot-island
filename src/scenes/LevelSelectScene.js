import Phaser from "phaser";
import Physics from "phaser";

import grassImg from "../assets/grass.png";

import { IslandTiles } from "./WorldGen.js";

function enterButtonHoverState(btn) {
    btn.setStyle({ fill: "#ff0" });
}

function enterButtonRestState(btn) {
    btn.setStyle({ fill: "#fff" });
}

const TILE_SIZE = 30;
const NumTilesX = 30;
const NumTilesY = 30;

export default class GameScene extends Phaser.Scene {

    preload(){
        this.load.image("grass", grassImg);
        this.load.image("stone", stoneImg);
    }

    create(){
        //Initialize tiles and tile texture
        this.tiles = []
        this.textureGrid = IslandTiles(NumTilesX, NumTilesY);

        //populate tiles
        for (let y = 0; y < NumTilesY; y++){
            row = []
            for (let x = 0; x < NumTilesX; x++){
                let texture = this.textureGrid;
                let tile = this.add.sprite(
                    x * TILE_SIZE + TILE_SIZE / 2,
                    y * TILE_SIZE + TILE_SIZE / 2,
                    texture)
                tile.width = TILE_SIZE;
                tile.displayWidth = TILE_SIZE;
                tile.height = TILE_SIZE;
                tile.displayHeight = TILE_SIZE;
                row.push(tile)
            }
            this.tiles.push(row);
        }

        
    }
}