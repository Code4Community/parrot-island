import Entity from "./entity";

/**
 * 
 * Class representing a tree object
*/
export default class Switch extends Entity {
    constructor(x, y, size, scene) {
        super(x, y, "leftSwitch", size);
        this.fadingAway = false;
        this.scene = scene;
        this.currentSprite = 0;
    }

    flipSwitch(scene) {
        scene.switchValue = !scene.switchValue;
    }

    update() {
        if (this.scene.switchValue == true && this.currentSprite == 0) {
            this.currentSprite = 1;
            this.sprite.setTexture("rightSwitch");
        } else if (this.scene.switchValue == false && this.currentSprite == 1) {
            this.currentSprite = 0;
            this.sprite.setTexture("leftSwitch");
        }
    }
}