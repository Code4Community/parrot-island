import Phaser from "phaser";
import Entity from "./entity";
import MovingEntity from "./movingEntity";

/**
 * 
 * Class representing a tree object
*/
export default class SwitchBarrier extends Entity {
    constructor(x, y, size, scene) {
        super(x, y, "activatedSwitchBarrier", size);
        this.fadingAway = false;
        this.scene = scene;
        this.currentSprite = 0;
    }

    update() {
        if (this.scene.switchValue == true && this.currentSprite == 0) {
            this.currentSprite = 1;
            this.sprite.setTexture("deactivatedSwitchBarrier");
        } else if (this.scene.switchValue == false && this.currentSprite == 1) {
            this.currentSprite = 0;
            this.sprite.setTexture("ActivatedSwtichBarrier");
        }
    }
}
