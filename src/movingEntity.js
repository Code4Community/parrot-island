import Phaser from "phaser";
import Physics from "phaser";

const TILE_SIZE = GameScene.TILE_SIZE;
var subX = 0;
var subY = 0;

/**
 * Class representing a game object that interacts with another game object and has movement. 
*/
export default class MovingEntity extends Entity{
    
    /** 
        * @description construct a MovingEntity
        * @param x x position in tiles 
        * @param y y position in tiles
        * @param texture sprite image
        * @param w width in pixels
        * @param h height in pixels
        * @param depth sprite layer TODO: necessary?
        * @param vx x velocity in pixels / frame
        * @param vy y velocity in pixels / frame
        * @param depth - sprite layer TODO: necessary?
    */
    constructor(x, y, texture, w, h, vx = 0, vy = 0, depth = 1){
        super(x, y, texture, w, h, depth);

        this.vx = vx;
        this.vy = vy;
    }

    /**
     * @description Tile Collision - x,y in tiles must match exactly
     * @param {number} x - x position of other object in tiles
     * @param {number} y - y position of other object in tiles
    */
    isColliding(x,y) {
        return this.x == x && this.y == y;
    }

    /**
     * @description Rectangular collision - takes subtile pixels into account, collision range
     * @param {number} x - x position of other object in pixels (including subpixels)
     * @param {number} y - y position of other object in pixels (including subpixels)
     * @param {number} w - width of other object in pixels
     * @param {number} h - height of other object in pixels
    */
    isColliding(x,y,w,h){
        return (this.x + this.subX < x + w)         
            && (this.x + this.subX + this.w > x)
            && (this.y + this.subY < y + h)         
            && (this.y + this.subY + this.h > y);
    }
    /**
     * @description Entity collision - x,y in tiles must match exactly
     * @param {Entity} E - the entity to test collision against
    */
    isColliding(E){
        return this.isColliding(E.x, E.y);
    }

    //Update position
    update(){
        subX = (x*TILE_SIZE + vx)%TILE_SIZE;
        x = floor((x*TILE_SIZE + vx)/TILE_SIZE);

        subY = (y*TILE_SIZE + vy)%TILE_SIZE;
        y = floor((y*TILE_SIZE + vy)/TILE_SIZE);
    }
}