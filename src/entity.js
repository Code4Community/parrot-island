// @ts-check
import Phaser from "phaser";
import Physics from "phaser";


/** 
 * Class representing a game object that interacts with another game object. 
 * i.e. anything that isn't background
*/
export default class Entity{
    
    /**
     * @description Construct an entity
     * 
     * @param {number} x - x position in tiles 
     * @param {number} y - y position in tiles
     * @param {string} texture - sprite image
     * @param {number} w - width in pixels
     * @param {number} h - height in pixels
     * @param {number} depth - sprite layer TODO: necessary?
    */
    constructor(x, y, texture, w, h, depth = 1) {
        this.x = x;
        this.y = y;

        this.texture = texture; 
        
        this.w = w;
        this.h = h;

        this.depth = depth;
    }

    /**
     * @description Determines whether this is at the tile with
     * coordinates x and y. Must be exactly on the tile.
     * 
     * @param {number} x - the x coordinate of the tile
     * @param {number} y - the y coordinate of the tile
     */
    isColliding(x, y) {
        return this.x == x && this.y == y;
    }
}