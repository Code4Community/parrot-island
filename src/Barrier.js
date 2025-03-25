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
    }
}