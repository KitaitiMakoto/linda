window.addEventListener("DOMContentLoaded", function() {
    var linda = document.getElementById("linda");
    linda.addEventListener("load", function() {
        var canvas = document.getElementById("stage");
        var stage = Linda.initializeStage(canvas, false);
        var origin = {x: canvas.width / 2, y: canvas.height / 2};
        var spiral = new Shape();
        var queue = new LoadQueue();
        queue.on("fileload", function(event) {
            stage.addChild(spiral);

            var rotation = 24*Math.PI;
            var startedAt = null;
            var duration = 6000;

            Ticker.addEventListener("tick", stage);

            var requestID = requestAnimationFrame(function(timestamp) {
                if (! startedAt) {
                    startedAt = timestamp;
                }
                var progress = (timestamp - startedAt) / duration;
                var additional = rotation * progress;
                spiral.graphics
                    .clear()
                    .beginBitmapStroke(event.result)
                    .setStrokeStyle(24);
                for (i=0; i< 720; i++) {
                    angle = 0.1 * i;
                    x=(1+angle)*Math.cos(angle+additional)*12;
                    y=(1+angle)*Math.sin(angle+additional)*12;
                    spiral.graphics.lineTo(origin.x + x, origin.y + y);
                }
                if (progress > 1) {
                    cancelAnimationFrame(requestID);
                } else {
                    requestID = requestAnimationFrame(arguments.callee);
                }
            });
        });
        queue.loadFile("images/bg_sea01.jpg");
    });
});
