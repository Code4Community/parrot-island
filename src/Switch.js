import Phaser from "phaser";
import Entity from "./entity";
import MovingEntity from "./movingEntity";

/**
 * 
 * Class representing a tree object
*/
export default class Switch extends Entity {
    constructor(x, y, size) {
        super(x, y, "none", size);
        this.fadingAway = false;
    }

    flipSwitch(scene) {
        scene.switchValue = !scene.switchValue;
    }
}