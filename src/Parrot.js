import MovingEntity from "./movingEntity";

/**
 * 
 * Class representing a tree object
*/
export default class Parrot extends MovingEntity {
    constructor(x, y, size) {
        super(x, y, "parrot", size);
    }
}
