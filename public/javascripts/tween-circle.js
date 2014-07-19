cj = createjs;

document.addEventListener("DOMContentLoaded", function() {
    var stageElem = document.getElementById("stage");
    stageElem.width = window.innerWidth;
    stageElem.height = window.innerHeight;
    var stage = new cj.Stage(stageElem);
    var circles = [];
    var circleCount = 20;
    var delay = 1 / circleCount;
    var centerPoint = {x: stageElem.width / 2, y:stageElem.height / 2};
    var movingCircles = circleCount;

    for (var i = 0; i < circleCount; i++) {
        var circle = new cj.Shape();
        var graphics = circle.graphics;
        graphics.setStrokeStyle(10);
        graphics.beginStroke("#113355");
        graphics.drawCircle(0, 0, (i + 1) * 3);

        circle.x = stageElem.width * Math.random();
        circle.y = stageElem.height * Math.random();
        circle.aplpha = 1 - i * 0.025;
        circle.compositeOperation = "lighter";

        cj.Tween.get(circle).to(centerPoint, 1500, cj.Ease.bounceOut);
        circles.push(circle);
        stage.addChild(circle);
    }
    stage.addEventListener("stagemouseup", function(event) {
        movingCircles = circleCount;
        circles.forEach(function(circle, i) {
            cj.Tween.removeTweens(circle);
            cj.Tween.get(circle)
                    .to({x: stage.mouseX, y: stage.mouseY}, (0.5 + i * delay) * 1500, cj.Ease.bounceOut)
                    .call(function() {movingCircles--;});
        });
    });

    cj.Ticker.addEventListener("tick", function() {
        if (movingCircles > 0) {
            stage.update();
        } else if (movingCircles > -1) {
            stage.update();
            movingCircles--;
        }
    });
});
