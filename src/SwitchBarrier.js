import Entity from "./entity";

/**
 * Class representing a barrier to player movement that toggles on switch interactions
*/
export default class SwitchBarrier extends Entity {
    constructor(x, y, size, scene, status = 0) {
        if (status == 0){
            super(x, y, "activatedSwitchBarrier", size);
            this.defaultSprite = "activatedSwitchBarrier";
            this.notDefaultSprite =  "deactivatedSwitchBarrier";
            this.defaultStatus = 0;
        } else {
            super(x, y, "deactivatedSwitchBarrier", size);
            this.defaultSprite = "deactivatedSwitchBarrier";
            this.notDefaultSprite = "activatedSwitchBarrier";
            this.defaultStatus = 1;
        }
        this.fadingAway = false;
        this.scene = scene;
        this.currentSprite = status;
    }

    update() {
        if (this.scene.switchValue == true && this.currentSprite == this.defaultStatus) {
            this.currentSprite = 1 - this.currentSprite;
            this.sprite.setTexture(this.notDefaultSprite);
        } else if (this.scene.switchValue == false && this.currentSprite == 1 - this.defaultStatus) {
            this.currentSprite = 1 - this.currentSprite;
            this.sprite.setTexture(this.defaultSprite);
        }
    }
}
