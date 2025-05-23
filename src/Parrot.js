import MovingEntity from "./movingEntity";

/**
 * Class representing the player object
*/
export default class Parrot extends MovingEntity {
    
    constructor(x, y, size) {
        super(x, y, "parrot", size);
        this.t = 0;
        this.saveX = x;
        this.saveY = y;
    }

    visualUpdate(){
        super.visualUpdate();

        if(this.t == 0){
            if(this.texture == "parrot"){
                this.sprite.setTexture("parrot2");
                this.texture = "parrot2";
            }else{
                this.sprite.setTexture("parrot");
                this.texture = "parrot";
            }
        }

        this.t++;
        this.t%=15;
    }
    
    savePos(){
        this.saveX = this.x;
        this.saveY = this.y;
    }

    getPosOnLastTick() {
        return [this.saveX, this.saveY];
    }
    
}
