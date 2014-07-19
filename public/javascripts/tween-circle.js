cj = createjs;

document.addEventListener("DOMContentLoaded", function() {
    var stageElem = document.getElementById("stage");
    var stage = new cj.Stage(stageElem);
    var circle = new cj.Shape();
    var graphics = circle.graphics;

    graphics.setStrokeStyle(10);
    graphics.beginStroke("#113355");
    graphics.drawCircle(0, 0, 20);

    circle.x = stageElem.width * Math.random();
    circle.y = stageElem.height * Math.random();
    cj.Tween.get(circle).to({x: stageElem.width / 2, y: stageElem.height / 2}, 1500, cj.Ease.bouseOut)

    stage.addChild(circle);
    stage.addEventListener("stagemouseup", function(event) {
        cj.Tween.get(circle).to({x: stage.mouseX, y: stage.mouseY}, 1500, cj.Ease.bounseOut)
    });

    cj.Ticker.addEventListener("tick", stage);
});
