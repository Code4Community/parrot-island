import Entity from "./entity";

/** 
 * 
 * Class representing a treasure object
*/
export default class PieceOfMap extends Entity{
    constructor(x, y, size) {
        super(x, y, "mapPiece", size, 1);
    }
}