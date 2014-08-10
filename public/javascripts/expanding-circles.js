document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas);
    var shortSide = Math.min(canvas.width, canvas.height);
    var longSide = Math.max(canvas.width, canvas.height);
    var circles = [new Shape(), new Shape(), new Shape()];
    var circle = new Shape();

    var scaleTo = (longSide * 1.5 / 2) / (shortSide * 0.5 / 2);

    var run = function() {
        circles.forEach(function(circle, i) {
            setTimeout(function() {
                circle.graphics
                    .beginStroke("#cccccc")
                    .setStrokeStyle(2)
                    .drawCircle(0, 0, shortSide * 0.5 / 2)
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
