import Phaser from "phaser";
import Entity from "./entity";

/**
 * 
 * Class representing a tree object
*/
export default class Barrier extends Entity {
    constructor(x, y, size) {
        super(x, y, "none", size);
        this.fadingAway = false;
    }

    update() {
        /*this.x += Math.floor(Math.random() * 3) - 1
        this.y += Math.floor(Math.random() * 3) - 1

        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }*/
    }
}