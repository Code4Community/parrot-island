import C4C from "c4c-lib";
/**
 * Class responsible for functionality of any main menu button
 */
export default class Buttons {
  constructor(scene) {
    //Button Hovering
    function enterButtonHoverState(btn) {
      btn.setStyle({ fill: "#ff0" });
    }

    function enterButtonRestState(btn) {
      btn.setStyle({ fill: "#fff" });
    }
    // Run Button
    const runButton = scene.add
      .text(550, 100, "Evaluate", { fill: "#fff", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {
        const programText = C4C.Editor.getText();
        // HERE'S THE IMPORTANT PART!!
        C4C.Interpreter.run(programText);
      })
      .on("pointerover", () => enterButtonHoverState(runButton))
      .on("pointerout", () => enterButtonRestState(runButton));

    // Editor Button
    const editorButton = scene.add
      .text(500, 200, "Toggle Editor", {
        fill: "#fff",
        fontSize: "30px",
      })
      .setInteractive()
      .on("pointerdown", () => {
        C4C.Editor.Window.toggle();
      })
      .on("pointerover", () => enterButtonHoverState(editorButton))
      .on("pointerout", () => enterButtonRestState(editorButton));

    // Check Button
    const checkButton = scene.add
      .text(570, 300, "Check", { fill: "#fff", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {
        const programText = C4C.Editor.getText();
        // HERE'S THE IMPORTANT PART!!
        try {
          C4C.Interpreter.check(programText);
        } catch (err) {
          console.log("Caught something: " + err);
        } finally {
          console.log("Done handling");
        }
      })
      .on("pointerover", () => enterButtonHoverState(checkButton))
      .on("pointerout", () => enterButtonRestState(checkButton));

    // Help Button
    const helpButton = scene.add
      .text(580, 400, "Help", { fill: "#fff", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {
        scene.entities.forEach((entity) => {
          entity.update();
        });
      })
      .on("pointerover", () => enterButtonHoverState(helpButton))
      .on("pointerout", () => enterButtonRestState(helpButton));

      // Help Button
    const gridButton = scene.add
    .text(580, 500, "Toggle Grid", { fill: "#fff", fontSize: "30px" })
    .setInteractive()
    .on("pointerdown", () => {
      for(var j = 0; j < 30; j++){
        for(var i = j%2; i < 30; i+=2){
          for(var k = 0; k < scene.tiles[j][i].length; k++){
            var state = scene.tiles[j][i][k].alpha === 0.8;
            scene.tiles[j][i][k].setAlpha(state ? 1 : 0.8);
          }
        }
      }
    })
    .on("pointerover", () => enterButtonHoverState(gridButton))
    .on("pointerout", () => enterButtonRestState(gridButton));
  }
}
