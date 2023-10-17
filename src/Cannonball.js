import Phaser from "phaser";
import Physics from "phaser";
import movingEntity from "movingEntity";
import cannonballImg from "../assets/cannonball.png";

/** 
 * 
 * Class representing a cannonball object
*/
export default class Cannonball extends movingEntity{
    constructor(x, y, texture, w, h, vx = 0, vy = 0, depth = 1){
        super(x, y, texture, w, h, vx, vy, depth);
        this.texture = cannonballImg;
    }

}