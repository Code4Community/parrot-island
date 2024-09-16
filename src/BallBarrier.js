import Phaser from "phaser";
import Entity from "./entity";
import Barrier from "./Barrier";

/**
 * 
 * Class representing a tree object
*/
export default class BallBarrier extends Barrier {
    constructor(x, y, size) {
        super(x, y, "none", size);
        this.fadingAway = false;
    }

    update() {
    }
}