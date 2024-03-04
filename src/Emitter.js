import Phaser from "phaser";
import Physics from "phaser";
import Entity from "./entity";
import MovingEntity from "./movingEntity";
import Cannonball from "./Cannonball";

/** 
 * 
 * Class representing an object that produces cannonballs
*/
export default class Emitter extends Entity{
    
    constructor(x, y, size, vx = 0, vy = 0, interval = 3, scene){
        super(x, y, "cannon", size);
        this.vx = vx;
        this.vy = vy;
        this.scene = scene;
        this.interval = interval;
        this.timer = 0;
    }

    update(){
        super.update();
        
        this.timer++;
        
        if(this.timer == this.interval){
            var cannonball = new Cannonball(this.x, this.y, this.size, this.vx, this.vy);
            cannonball.initialize(this.scene);
            this.scene.entities.push(cannonball);
            cannonball.update(this.scene);
            this.timer = 0;
        }
    }

}