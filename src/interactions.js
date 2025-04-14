import MovingEntity from "./movingEntity";
import Parrot from "./Parrot";

/**Defines when interactions between entities in a defined interaction occur.*/
export default class InteractionsManager {
    constructor() {
        this.interactions = [];
    }

    addInteraction(classes, callback) {
        this.interactions.push(({ classes, callback }));
    }

    checkInteractions(entities) {
        for (let i = 0; i < entities.length; i++) {
            for (let j = 0; j < i; j++) {
                const e1 = entities[i];
                const e2 = entities[j];
                for (const interaction of this.interactions) {
                    const [c1, c2] = interaction.classes;
                    if (e1 instanceof c1 && e2 instanceof c2) {
                        
                        //Stationary case
                        if(e1.x == e2.x && e1.y == e2.y){
                            interaction.callback(e1, e2);
                        }

                        //Moving case
                        if(e1 instanceof Parrot && e2 instanceof MovingEntity 
                            && e1.getPosOnLastTick()[0] == e2.x
                            && e1.getPosOnLastTick()[1] == e2.y
                            && e1.x == e2.getPosOnLastTick()[0]
                            && e1.y == e2.getPosOnLastTick()[1]){

                                interaction.callback(e1,e2);
                        }

                    } else if (e1 instanceof c2 && e2 instanceof c1) {
                        
                        //Stationary case
                        if(e1.x == e2.x && e1.y == e2.y){
                            interaction.callback(e2, e1);
                        }

                        // //Moving case
                        if(e1 instanceof MovingEntity && e2 instanceof Parrot 
                            && e1.getPosOnLastTick()[0] == e2.x
                            && e1.getPosOnLastTick()[1] == e2.y
                            && e1.x == e2.getPosOnLastTick()[0]
                            && e1.y == e2.getPosOnLastTick()[1]){

                                interaction.callback(e2,e1);
                        }
                    }
                }
            }
        }
    }
}