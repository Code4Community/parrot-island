import Phaser from "phaser";
import Physics from "phaser";


export default class entity{
    constructor(x,y,texture,w,h,depth = 1){
        this.x = x;
        this.y = y;
        this.texture = texture; 
        this.w = w;
        this.h = h;
        this.depth = depth;
    }

    isColliding(x,y) {

        //TODO: to tile collision
        return (this.x + this.w >= x && this.x <= x + w && this.y + this.h >= y && this.y <= y + h);
    }

    collide(){

    }
}