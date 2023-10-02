import Phaser from "phaser";
import Physics from "phaser";

/** 
 * Class representing a game object that interacts with another game object and has movement. 
*/
export default class MovingEntity {
    
    /** 
        construct a MovingEntity
      * @param x, @param y - position in tiles
      * @param texture - sprite image
      * @param w,h - size in pixels
      * @param spd - speed in tiles
      * @param vdir - velocity direction where 5 is stationary TODO: do we need diagonal velocity?
      * 7  8  9
      * 4 [5] 6
      * 1  2  3
      * depth - sprite layer TODO: necessary?
    */
    constructor(x, y, texture, w, h, spd = 0, vdir = 5, depth = 1){
        super(x, y, texture, w, h, depth);
        this.spd = spd;
        this.vdir = vdir;
        
        this.depth = depth;
    }

    //Tile Collision || must be exactly on the tile
    isColliding(x,y) {
        return this.x == x && this.y == y;
    }

    //Update position
    update(){

    }
}