document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas);
    var shortSide = Math.min(canvas.width, canvas.height);
    var longSide = Math.max(canvas.width, canvas.height);
    var circles = [new Shape(), new Shape(), new Shape()];

    var expandCircle = function(circle, startRadius, endRadius, duration) {
        var start = null;
        var requestID = null;
        var step = function(timestamp) {
            if (start === null) {
                start = timestamp;
            }
            var progress = timestamp - start;
            if (progress > duration) {
                cancelAnimationFrame(requestID);
                return;
            }
            var radius = startRadius + (endRadius - startRadius) * (progress / duration)
            circle.graphics
                .clear()
                .beginStroke("#ffffff")
                .setStrokeStyle(3)
                .drawCircle(0, 0, radius)
                .endStroke();
            circle.set({alpha: 1 - (progress / duration) - 0.2});
            requestID = requestAnimationFrame(step);
        };
        requestID = requestAnimationFrame(step);
    };

    circles.forEach(function(circle) {
        stage.addChild(circle);
    });

    var run = function() {
        circles.forEach(function(circle, index) {
            Tween.get(circle).wait(index * 400).call(function() {
                expandCircle(circle, shortSide * 0.1 / 2, longSide * 2 / 2, 4000);
            });
        });
    };
    setInterval(run, 5000);

    Ticker.addEventListener("tick", stage);
});
