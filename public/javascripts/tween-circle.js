cj = createjs;

document.addEventListener("DOMContentLoaded", function() {
    var stageElem = document.getElementById("stage");
    stageElem.width = window.innerWidth;
    stageElem.height = window.innerHeight;
    var stage = new cj.Stage(stageElem);
    var circles = [];
    var circleCount = 12;
    var delay = 1 / circleCount;
    var centerPoint = {x: stageElem.width / 2, y:stageElem.height / 2};

    for (var i = 0; i < circleCount; i++) {
        var circle = new cj.Shape();
        var graphics = circle.graphics;
        graphics.setStrokeStyle(3);
        graphics.beginStroke("#113355");
        graphics.drawCircle(0, 0, (i + 1) * 9);

        circle.x = stageElem.width * Math.random();
        circle.y = stageElem.height * Math.random();

        cj.Tween.get(circle).to(centerPoint, 1500, cj.Ease.bounceOut);
        circles.push(circle);
        stage.addChild(circle);
    }
    stage.addEventListener("stagemouseup", function(event) {
        circles.forEach(function(circle, i) {
            cj.Tween.get(circle).to({x: stage.mouseX, y: stage.mouseY}, (0.5 + i * delay) * 1500, cj.Ease.bounceOut)
        });
    });

    cj.Ticker.addEventListener("tick", stage);
});
