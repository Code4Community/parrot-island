import Entity from "./entity";
import MovingEntity from "./movingEntity";

/** 
 * Class representing a piece of map object
*/
export default class PieceOfMap extends Entity {
    constructor(x, y, size) {
        super(x, y, "mapPiece", size);
    }
}