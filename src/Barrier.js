import Entity from "./entity";

/**
 * Class representing a barrier to player movement
*/
export default class Barrier extends Entity {
    constructor(x, y, size) {
        super(x, y, "none", size);
        this.fadingAway = false;
    }

    update() {
    }
}