import Entity from "./entity";
import Cannonball from "./Cannonball";

/** 
 * 
 * Class representing an object that produces cannonballs
*/
export default class Emitter extends Entity{
    
    constructor(x, y, size, vx = 0, vy = 0, interval = 3, scene, timer = 0){
        super(x, y, "unloadedCannon", size);
        this.vx = vx;
        this.vy = vy;
        this.scene = scene;
        this.interval = interval;
        this.timer = timer;
    }

    initialize(scene) {
        this.sprite = scene.add.sprite(
            this.x * this.size + this.size / 2,
            this.y * this.size + this.size / 2, 
            this.texture,
        )

        this.sprite.width = this.size;
        this.sprite.height = this.size;
        this.sprite.displayWidth = this.size;
        this.sprite.displayHeight = this.size;
        if (this.vx < 0) {
            this.sprite.setRotation(Math.PI);
        } else if (this.vy != 0) {
            this.sprite.setRotation(Math.sign(this.vy) * Math.PI/2);
        }
    }
    

    update(){
        
        this.timer++;

        if (this.timer == this.interval - 1) {
            this.sprite.setTexture("loadedCannon");
        }
        
        if(this.timer == this.interval){
            this.sprite.setTexture("unloadedCannon");
            var cannonball = new Cannonball(this.x, this.y, this.size, this.vx, this.vy);
            cannonball.initialize(this.scene);
            if (this.vx > 0) {
                cannonball.sprite.setRotation(Math.PI);
            } else if (this.vy != 0) {
                cannonball.sprite.setRotation(Math.sign(this.vy) * -1 * Math.PI/2);
            }
            this.scene.entities.push(cannonball);
            cannonball.update(this.scene);
            this.timer = 0;
        }
    }

}