import Phaser from "phaser";
import Physics from "phaser";


/** 
 * 
 * Class representing a game object that interacts with another game object. 
 * i.e. anything that isn't background
*/
export default class Entity {
    
    /**construct an entity
        * @param x - x position in tiles 
        * @param y - y position in tiles
        * @param texture - sprite image
        * @param w - width in pixels
        * @param h - height in pixels
        * @param depth - sprite layer TODO: necessary?
    */
    constructor(x, y, texture, w, h, depth = 1){
        this.x = x;
        this.y = y;

        this.texture = texture; 
        
        this.w = w;
        this.h = h;

        this.depth = depth;
    }

    //Tile Collision || must be exactly on the tile
    isColliding(x,y) {
        return this.x == x && this.y == y;
    }

    //Overload in subclass
    update(){

    }
}


