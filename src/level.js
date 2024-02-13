// @ts-check

import Entity from "./entity";

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
                case 4: texture = "tree"; break;
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
        let entity = new Entity(data.x, data.y, data.texture, data.size);
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
 *                  size : number
 *                }[], //
 * }} LevelData
 */
