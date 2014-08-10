document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas);
    var shortSide = Math.min(canvas.width, canvas.height);
    var longSide = Math.max(canvas.width, canvas.height);
    var circles = [new Shape(), new Shape(), new Shape()];
    var circle = new Shape();

    var radius = shortSide * 0.1 / 2;
    var scaleTo = (longSide * 2 / 2) / radius;

    var run = function() {
        circles.forEach(function(circle, i) {
            circle.graphics
                .clear()
                .beginStroke("#cccccc")
                .setStrokeStyle(1)
                .drawCircle(0, 0, radius)
                .endStroke();
            circle.set({alpha: 0})
            stage.addChild(circle);
            Tween.get(circle)
                .wait(1000 + i * 500)
                .to({x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1}, 0)
                .to({scaleX: scaleTo, scaleY: scaleTo, alpha: -0.8}, 4000)
                .wait(1000);
        });
    }

    setInterval(run, 5000);
    Ticker.addEventListener("tick", stage);
});
