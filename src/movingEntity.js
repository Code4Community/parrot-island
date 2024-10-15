import Phaser from "phaser";
import Physics from "phaser";

import Entity from './entity'

/**
 * Class representing a game object that interacts with another game object and has movement. 
*/
export default class MovingEntity extends Entity {
    
    /** 
        * @description construct a MovingEntity
        * @param x x position in tiles 
        * @param y y position in tiles
        * @param texture sprite image
        * @param w width in pixels
        * @param h height in pixels
        * @param depth sprite layer TODO: necessary?
        * @param vx x velocity in pixels / frame
        * @param vy y velocity in pixels / frame
        * @param depth - sprite layer TODO: necessary?
    */
    constructor(x, y, texture, size, vx = 0, vy = 0, depth = 1) {
        super(x, y, texture, size, depth);

        this.vx = vx;
        this.vy = vy;
        this.EPSILON=0.1;
        this.fadingAway = false;
    }

    /**
     * @description Tile Collision - x,y in tiles must match exactly
     * @param {number} x - x position of other object in tiles
     * @param {number} y - y position of other object in tiles
    */
    isColliding(x,y) {
        return this.x == x && this.y == y;
    }

    /**
     * @description Rectangular collision - takes subtile pixels into account, collision range
     * @param {number} x - x position of other object in pixels (including subpixels)
     * @param {number} y - y position of other object in pixels (including subpixels)
     * @param {number} w - width of other object in pixels
     * @param {number} h - height of other object in pixels
    */
    isColliding(x,y,w,h){
        return (this.x + this.subX < x + w)         
            && (this.x + this.subX + this.w > x)
            && (this.y + this.subY < y + h)         
            && (this.y + this.subY + this.h > y);
    }
    /**
     * @description Entity collision - x,y in tiles must match exactly
     * @param {Entity} E - the entity to test collision against
    */
    isColliding(E){
        return this.isColliding(E.x, E.y);
    }

    update() {
        super.update()
        if (this.alive) {
            this.moveTo(this.x + this.vx, this.y + this.vy)
        }
    }

    visualUpdate() {
        if (this.fadingAway) {
            if (this.deathVel === undefined) {
                this.deathVel = [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5]
            } else {
                const [vx, vy] = this.deathVel;
                this.sprite.scale *= 0.95
                this.sprite.x += vx;
                this.sprite.y += vy;

                this.sprite?.setX(this.sprite.x);
                this.sprite?.setY(this.sprite.y);
                this.sprite?.setScale(this.sprite.scale);
            }
        } else {
            let currentVisX = this.sprite.x
            let currentVisY = this.sprite.y
            let targetVisX = this.x * this.size + this.size / 2
            let targetVisY = this.y * this.size + this.size / 2
            this.sprite?.setX(currentVisX + (targetVisX - currentVisX) * 0.1)
            this.sprite?.setY(currentVisY + (targetVisY - currentVisY) * 0.1)
            // true if entity has reached final position
            return Math.abs(currentVisX-targetVisX)<this.EPSILON && Math.abs(currentVisY-targetVisY)<this.EPSILON
        }
    }

    destroy(scene) {
        super.destroy(scene);
        this.fadingAway = true;
    }

    /**
     * 
     * @param {number} newX
     * @param {number} newY 
     */
    moveTo(newX, newY) {
        super.moveTo(newX, newY)
    }

    peekAt(scene, xOffset, yOffset) {
        let checkX = this.x + xOffset;
        let checkY = this.y + yOffset;
        let maxTilesX = scene.tiles[0].length;
        let maxTilesY = scene.tiles.length;

        if (checkX < 0 || checkX >= maxTilesX || checkY < 0 || checkY >= maxTilesY) {
            return [];
        }
        else{
            // console.log("FOUND ",scene.tiles[checkY][checkX].texture.key);
            return scene.tiles[checkY][checkX].texture.key;
        }
    }

    getPosOnNextTick() {
        return [this.x + this.vx, this.y + this.vy];
    }

    /*
    * collidable entities are [rock, water]
    */
    canMove(scene, xOffset, yOffset) {
        let collisionBlocks = ["stone", "water", "tree"];
        let blockName = this.peekAt(scene, xOffset, yOffset);

        scene.entities.forEach(e => {
            if(e.texture == "cannonball" || e.texture == "activatedSwitchBarrier"){

                if(e.x == xOffset && e.y == yOffset){
                    return false;
                }

                if(e.getPosOnNextTick()[0] == xOffset && e.getPosOnNextTick()[1] == yOffset){
                    return false;
                }
            }
        });

        return !collisionBlocks.includes(blockName);
        
    }

}