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
    this.scene = scene

    //Button Hovering
    function enterButtonHoverState(btn) {
      btn.setStyle({ fill: "#bf0000" });
    }

    function enterButtonRestState(btn) {
      btn.setStyle({ fill: "#00007A" });
    }

    if(version == 0){

    // Run Button
    const runButton = scene.add
      .text(550 + 395, 200, "Run Code!", { fill: "#00007A", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {

        if(this.enabled){
          const programText = C4C.Editor.getText();
          this.saveCode();
        
          try{
            C4C.Interpreter.check(programText);
            
            scene.loadScene(true);
          
          }catch(err){
            alert("Oh No! Something is wrong with your code:\n\n\t" + err + "\n\nFix it and try again!");
            this.isUpdating = false;
            scene.loadScene();

          
          }finally{
            
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
          this.saveCode();
          // HERE'S THE IMPORTANT PART!!
          try {
            C4C.Interpreter.check(programText);
            alert("Your code looks good! Try running it to see if Polly reaches the goal!");
          } catch (err) {
            alert("Oh No! Something is wrong with your code:\n\n\t" + err + "\n\nFix it and try again!");
          } finally {
            C4C.Editor.Window.open();
            scene.loadScene();
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
        this.saveCode();
        C4C.Editor.Window.open();
        this.isUpdating = false;
        this.timeOfLastUpdate = Date.now();
        this.location = [0, [0]];
        scene.loadScene();
    })
    .on("pointerover", () => enterButtonHoverState(restartButton))
    .on("pointerout", () => enterButtonRestState(restartButton));

  }else{
    
    const continueText = scene.level != 6 ? "Continue": "Bonus!";
    const continueButton = scene.add
    .text(550+ 410, 400, continueText, { fill: "#00007A", fontSize: "30px" })
    .setInteractive()
    .on("pointerdown", () => {
        C4C.Editor.Window.open();
        window.location.replace(window.location.href.slice(0,-1) + scene.level);
    })
    .on("pointerover", () => enterButtonHoverState(continueButton))
    .on("pointerout", () => enterButtonRestState(continueButton));

  }
  }

  /**Save code for repeat visits */
  saveCode(){
    localStorage.setItem("level" + this.scene.level, C4C.Editor.getText());
  }
}
