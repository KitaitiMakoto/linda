document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas);
    var shortSide = Math.min(canvas.width, canvas.height);
    var longSide = Math.max(canvas.width, canvas.height);
    var circles = [new Shape(), new Shape(), new Shape()];
    circles.forEach(function(circle) {
        stage.addChild(circle);
    });

    var lineColor = "#ffffff";
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
                .beginStroke(lineColor)
                .setStrokeStyle(3)
                .drawCircle(0, 0, radius)
                .endStroke();
            circle.set({alpha: 1 - (progress / duration) - 0.2});
            requestID = requestAnimationFrame(step);
        };
        requestID = requestAnimationFrame(step);
    };

    var startRadius = shortSide * 0.1 / 2;
    var endRadius = longSide * 2 / 2;
    var run = function() {
        circles.forEach(function(circle, index) {
            Tween.get(circle).wait(index * 400).call(function() {
                expandCircle(circle, startRadius, endRadius, 4000);
            });
        });
    };
    setInterval(run, 5000);

    Ticker.addEventListener("tick", stage);

    var controls = new Vue({
        el: "#controls",
        data: {
        },
        methods: {
            updateBackgroundColor: function(event) {
                canvas.style.backgroundColor = event.target.value;
            },
            updateLineColor: function(event) {
                lineColor = event.target.value;
                run();
            },
            updateStartRadius: function(event) {
                startRadius = shortSide * event.target.value / 2;
                run();
            },
            updateEndRadius: function(event) {
                endRadius = longSide * event.target.value / 2;
                run();
            }
        }
    });
});
