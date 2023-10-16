import Phaser from "phaser";
import Physics from "phaser";
import Entity from "entity";
import treeImg from "../assets/tree.png";

/** 
 * 
 * Class representing a tree object
*/
export default class Tree extends Entity{
    constructor(x, y, texture, w, h, depth = 1) {
        super(x, y, texture);
        this.texture = treeImg;
        this.w = w;
        this.h = h;
        this.depth = depth;
    }

}