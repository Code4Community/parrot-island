import Entity from "./entity";
import MovingEntity from "./movingEntity";

/** 
 * 
 * Class representing a treasure object
*/
export default class PieceOfMap extends MovingEntity {
    constructor(x, y, size) {
        super(x, y, "mapPiece", size);
    }
}