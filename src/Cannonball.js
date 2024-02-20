import Phaser from "phaser";
import Physics from "phaser";
import movingEntity from "./movingEntity";

/** 
 * 
 * Class representing a cannonball object
*/
export default class Cannonball extends movingEntity{
    constructor(x, y, size, vx = 0, vy = 0){
        super(x, y, "cannonball", size, vx, vy);
    }

}