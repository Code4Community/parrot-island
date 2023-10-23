import Entity from "./entity";

/** 
 * Class representing a treasure object
*/
export default class Treasure extends Entity {
    constructor(x, y, size) {
        super(x, y, "treasure", size, 1);
    }
}