import C4C from "c4c-lib";
/**
 * Class responsible for functionality of any main menu button
 */
export default class Buttons {
  constructor(scene, version = 0) {
    this.isUpdating = false;
    this.timeOfLastUpdate = Date.now();
    this.location = [0, [0]];
    this.enabled = true;

    //Button Hovering
    function enterButtonHoverState(btn) {
      btn.setStyle({ fill: "#ff0" });
    }

    function enterButtonRestState(btn) {
      btn.setStyle({ fill: "#00007A" });
    }

    if(version == 0){

    // Run Button
    const runButton = scene.add
      .text(550 + 410, 200, "Evaluate", { fill: "#00007A", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {

        if(this.enabled){
          const programText = C4C.Editor.getText();
          
          try{
            C4C.Interpreter.check(programText);
            this.isUpdating = true;
            this.timeOfLastUpdate = Date.now() - 500;
            this.enabled = false;
          
          }catch(err){
            alert("Oh No! Something is wrong with your code:\n\n\t" + err + "\n\nFix it and try again!");
            this.isUpdating = false;
            this.location = [0, [0]];
          
          }finally{
            scene.loadScene();
            C4C.Editor.Window.close();
            this.location = [0, [0]];
          }
        }
      })
      .on("pointerover", () => enterButtonHoverState(runButton))
      .on("pointerout", () => enterButtonRestState(runButton));

    // Editor Button
    const editorButton = scene.add
      .text(500+ 410, 250, "Toggle Editor", {
        fill: "#00007A",
        fontSize: "30px",
      })
      .setInteractive()
      .on("pointerdown", () => {
        if(this.enabled){
          C4C.Editor.Window.toggle();
        }
      })
      .on("pointerover", () => enterButtonHoverState(editorButton))
      .on("pointerout", () => enterButtonRestState(editorButton));

    // Check Button
    const checkButton = scene.add
      .text(570+ 410, 300, "Check", { fill: "#00007A", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {

        if(this.enabled){
          const programText = C4C.Editor.getText();
          // HERE'S THE IMPORTANT PART!!
          try {
            C4C.Interpreter.check(programText);
          } catch (err) {
            alert("Oh No! Something is wrong with your code:\n\n\t" + err + "\n\nFix it and try again!");
          } finally {
            scene.loadScene();
            C4C.Editor.Window.open();
            console.log("Done handling");
          }
        }
      })
      .on("pointerover", () => enterButtonHoverState(checkButton))
      .on("pointerout", () => enterButtonRestState(checkButton));

    // Toggle Grid Button
    const gridButton = scene.add
      .text(510+ 410, 350, "Toggle Grid", { fill: "#00007A", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {
        var square_alpha = 0.7;
        var state = scene.tiles[0][0].alpha === square_alpha;
        for (var j = 0; j < 30; j++) {
          for (var i = j % 2; i < 30; i += 2) {
            scene.tiles[j][i].setAlpha(state ? 1 : square_alpha);
          }
        }
      })
      .on("pointerover", () => enterButtonHoverState(gridButton))
      .on("pointerout", () => enterButtonRestState(gridButton));

    //Restart Button
    const restartButton = scene.add
    .text(550+ 410, 400, "Restart", { fill: "#00007A", fontSize: "30px" })
    .setInteractive()
    .on("pointerdown", () => {
        C4C.Editor.Window.open();
        scene.loadScene();
        this.enabled = true;
    })
    .on("pointerover", () => enterButtonHoverState(restartButton))
    .on("pointerout", () => enterButtonRestState(restartButton));
  }else{
    const continueButton = scene.add
    .text(550+ 410, 400, "Continue", { fill: "#00007A", fontSize: "30px" })
    .setInteractive()
    .on("pointerdown", () => {
        C4C.Editor.Window.open();
        window.location.replace(window.location.href.slice(0,-1) + scene.level);
    })
    .on("pointerover", () => enterButtonHoverState(continueButton))
    .on("pointerout", () => enterButtonRestState(continueButton));
  }
  }
}
