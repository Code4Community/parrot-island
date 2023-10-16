import Phaser from "phaser";
import Physics from "phaser";
import Entity from "entity";
import mapPieceImg from "../assets/pieceOfMap.png";

/** 
 * 
 * Class representing a treasure object
*/
export default class PieceOfMap extends Entity{
    constructor(x, y, texture, w, h, depth = 1) {
        super(x, y, texture);
        this.texture = mapPieceImg;
        this.w = w;
        this.h = h;
        this.depth = depth;
    }

}