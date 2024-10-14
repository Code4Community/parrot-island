import C4C from "c4c-lib";
/**
 * Class responsible for functionality of any main menu button
 */
export default class Buttons {
  constructor(scene) {
    this.isUpdating = false;
    this.timeOfLastUpdate = Date.now();
    this.location = [0, [0]];

    //Button Hovering
    function enterButtonHoverState(btn) {
      btn.setStyle({ fill: "#ff0" });
    }

    function enterButtonRestState(btn) {
      btn.setStyle({ fill: "#00007A" });
    }
    // Run Button
    const runButton = scene.add
      .text(550 + 410, 200, "Evaluate", { fill: "#00007A", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {
        this.isUpdating = true;
        this.timeOfLastUpdate = Date.now() - 500;
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
        C4C.Editor.Window.toggle();
      })
      .on("pointerover", () => enterButtonHoverState(editorButton))
      .on("pointerout", () => enterButtonRestState(editorButton));

    // Check Button
    const checkButton = scene.add
      .text(570+ 410, 300, "Check", { fill: "#00007A", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {
        const programText = C4C.Editor.getText();
        // HERE'S THE IMPORTANT PART!!
        try {
          C4C.Interpreter.check(programText);
        } catch (err) {
          alert("Caught something: " + err);
        } finally {
          console.log("Done handling");
        }
      })
      .on("pointerover", () => enterButtonHoverState(checkButton))
      .on("pointerout", () => enterButtonRestState(checkButton));

    // Help Button
    const helpButton = scene.add
      .text(580+ 410, 350, "Help", { fill: "#00007A", fontSize: "30px" })
      .setInteractive()
      .on("pointerdown", () => {
        scene.entities.forEach((entity) => {
          entity.update();
        });
      })
      .on("pointerover", () => enterButtonHoverState(helpButton))
      .on("pointerout", () => enterButtonRestState(helpButton));

    // Toggle Grid Button
    const gridButton = scene.add
      .text(510+ 410, 400, "Toggle Grid", { fill: "#00007A", fontSize: "30px" })
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
    .text(550+ 410, 450, "Restart", { fill: "#00007A", fontSize: "30px" })
    .setInteractive()
    .on("pointerdown", () => {
        C4C.Editor.Window.open();
        scene.loadScene();
    })
    .on("pointerover", () => enterButtonHoverState(restartButton))
    .on("pointerout", () => enterButtonRestState(restartButton));
  }
}
