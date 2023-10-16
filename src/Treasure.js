import Phaser from "phaser";
import Physics from "phaser";
import Entity from "entity";
import treasureImg from "../assets/treasure.png";

/** 
 * 
 * Class representing a treasure object
*/
export default class Treasure extends Entity{
    constructor(x, y, texture, w, h, depth = 1) {
        super(x, y, texture);
        this.texture = treasureImg;
        this.w = w;
        this.h = h;
        this.depth = depth;
    }

}