document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var longSide = Math.max(canvas.width, canvas.height);
    var shortSide = Math.min(canvas.width, canvas.height);
    var origin = {x: canvas.width / 2, y: canvas.height /2}
    var stage = new Stage(canvas);
    var circle = new Shape();

    circle.graphics
        .beginStroke("#ffffff")
        .setStrokeStyle(12)
        .drawCircle(0, 0, shortSide * 0.6 / 2)
        .endStroke()
        .beginFill("#ffffff")
        .drawCircle(0, 0, shortSide * 0.4 / 2)
        .endFill();
    circle.shadow = new Shadow("#999999", 6, 10, 24);
    circle.set(origin);
    stage.addChild(circle);

    Tween.get(circle).wait(500).to({scaleX: 0.9, scaleY: 0.9}, 300, Ease.lenear).call(function() {
        Tween.get(circle).to({scaleX: 1.3, scaleY: 1.3}, 100, Ease.lenear).call(function() {
            Tween.get(circle).to({scaleX: 1, scaleY: 1}, 1000, Ease.bounceOut);
        });
    });

    Ticker.addEventListener("tick", stage);
    stage.update()
});
