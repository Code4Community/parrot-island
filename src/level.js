// @ts-check

import Emitter from "./Emitter";
import Parrot from "./Parrot";
import PieceOfMap from "./PieceOfMap";
import Treasure from "./Treasure";
import Tree from "./Tree";
import Entity from "./entity";
import MovingEntity from "./movingEntity";

/**
 * @param {LevelData} levelData - the level data.
 * @param {number} tileSize
 */
export const GenerateSceneFromLevelData = (levelData, scene, tileSize) =>{
    for(let y = 0; y < levelData.height; y++){
        let row = [];
        for(let x = 0; x < levelData.height; x++){
            
            let texture = "";

            switch(levelData.tiles[y][x]){
                case 1: texture = "grass"; break;
                case 2: texture = "sand";  break;
                case 3: texture = "stone"; break;
                case 4: texture = "tree"; 
                    scene.entities.push(new Tree(x,y,tileSize));
                break;
                default: texture = "water"; break;
            }

            let tile = scene.add.sprite(
                x * tileSize + tileSize / 2,
                y * tileSize + tileSize / 2,
                texture
              );

            tile.width = tileSize;
            tile.displayWidth = tileSize;
            tile.height = tileSize;
            tile.displayHeight = tileSize;
            row.push(tile);
        }
        scene.tiles.push(row);  
    }
    
    for(var i = 0; i < levelData.entities.length; i++){
        let data = levelData.entities[i];
        var entity;
        
        switch(data.texture){
            case "parrot":
                entity = new Parrot(data.x, data.y, data.size);
                scene.parrot = entity;
            break;
            case "mapPiece":            
                entity = new PieceOfMap(data.x, data.y, data.size);
            break;
            case "treasure":
                entity = new Treasure(data.x, data.y, data.size);
            break;
            case "cannon":
                entity = new Emitter(data.x, data.y, data.size, data.vx, data.vy, 4, scene);
            break;
            default:
                entity = new Entity(data.x, data.y, data.texture, data.size);
        }

        scene.entities.push(entity);

    }
}

/**
 *
 * @typedef {{
 *      name: string,
 *      width: number,
 *      height: number, 
 *      tiles: number[][],    // indexed by [y][x]
 *      entities: {
 *                  x : number,
 *                  y : number,
 *                  texture: string,
 *                  size : number,
 *                  vx: number,
 *                  vy: number
 *                }[], //
 * }} LevelData
 */
