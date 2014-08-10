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
            setTimeout(function() {
                circle.graphics
                    .clear()
                    .beginStroke("#cccccc")
                    .setStrokeStyle(1)
                    .drawCircle(0, 0, radius)
                    .endStroke();
                circle.set({x: 0, y: 0, scaleX: 1, scaleY: 1, alpha: 1})
                stage.addChild(circle);
                Tween.get(circle)
                    .to({scaleX: scaleTo, scaleY: scaleTo, alpha: -0.8}, 4000);
            }, 500 * i);
        });
    }

    setInterval(run, 5000);
    Ticker.addEventListener("tick", stage);
});
