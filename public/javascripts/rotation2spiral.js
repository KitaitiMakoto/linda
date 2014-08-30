document.addEventListener("DOMContentLoaded", function(event) {
    event.target.getElementById("linda").addEventListener("load", function() {
        var canvas = event.target.getElementById("stage");
        var stage = Linda.initializeStage(canvas, false);
        var origin = {x: canvas.width / 2, y: canvas.height / 2};
        var queue = new LoadQueue();
        queue.addEventListener("fileload", function(event) {
            var image = event.result;
            var spiral = new Shape();
            var rotation = 24 * Math.PI;
            var duration = 6000;
            var startedAt = null;
            var requestID = null;
            var rotateSpiral = function(timestamp) {
                if (! startedAt) {
                    startedAt = timestamp;
                }
                var progress = (timestamp - startedAt) / duration;
                var additionalAngle = rotation * progress;
                spiral.graphics
                    .clear()
                    .beginBitmapStroke(image)
                    .setStrokeStyle(24);
                // stolen from http://stackoverflow.com/questions/6824391/drawing-a-spiral-on-an-html-canvas-using-javascript
                for (i = 0; i < 720; i++) {
                    var angle = 0.1 * i;
                    var x = (1 + angle) * Math.cos(angle + additionalAngle) * 12;
                    var y = (1 + angle) * Math.sin(angle + additionalAngle) * 12;
                    spiral.graphics.lineTo(origin.x + x, origin.y + y);
                }
                if (progress > 1) {
                    startedAt = null;
                    cancelAnimationFrame(requestID);
                    window.dispatchEvent(new CustomEvent("linda.animationend"));
                } else {
                    requestID = requestAnimationFrame(arguments.callee);
                }
            };
            stage.addChild(spiral);

            Ticker.addEventListener("tick", stage);

            var inputConstructor = /sense=shake/.test(location.search) ? Linda.Shake : Linda.Rotation;
            var input = new inputConstructor({pauseThreshold: 1000});
            window.addEventListener("linda.inputend", function(event) {
                input.stopListening();
                rotateSpiral();
            });
            window.addEventListener("linda.animationend", function(event) {
                spiral.graphics.clear();
                input.startListening();
            });
            input.startListening();
        });
        queue.loadFile("images/bg_sea01.jpg");
    });
});
