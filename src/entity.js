// @ts-check
import Phaser from "phaser";

/** 
 * Class representing a game object that interacts with another game object. 
 * i.e. anything that isn't background
*/
export default class Entity {
    
    /**
     * @description Construct an entity
     * 
     * @param {number} x - x position in tiles 
     * @param {number} y - y position in tiles
     * @param {string} texture - sprite image
     * @param {number} size - size (width and height) in pixels
     * @param {number} depth - sprite layer TODO: necessary?
    */
    constructor(x, y, texture, size, depth = 1) {
        this.x = x;
        this.y = y;
        this.prevX = x;
        this.prevY = y;

        this.texture = texture; 

        this.size = size;

        this.depth = depth;

        this.alive = true;
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

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    initialize(scene) {
        this.sprite = scene.add.sprite(
            this.x * this.size + this.size / 2,
            this.y * this.size + this.size / 2, 
            this.texture,
        )

        this.sprite.width = this.size;
        this.sprite.height = this.size;
        this.sprite.displayWidth = this.size;
        this.sprite.displayHeight = this.size;
    }

    update() {

    }

    visualUpdate() {
        this.sprite?.setX(this.x * this.size + this.size / 2)
        this.sprite?.setY(this.y * this.size + this.size / 2)
        return true;
    }

    destroy(scene) {
        this.alive = false;
        // @ts-ignore
        this.sprite.setVisible(false);
        this.sprite.destroy();
        scene.entities.splice(scene.entities.indexOf(this),1);
    }

    /**
     * 
     * @param {number} newX
     * @param {number} newY 
     */
    moveTo(newX, newY) {
        this.prevX = this.x
        this.x = newX
        this.prevY = this.y
        this.y = newY
    }
}