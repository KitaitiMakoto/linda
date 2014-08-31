window.addEventListener("DOMContentLoaded", function() {
    var linda = document.getElementById("linda");
    linda.addEventListener("load", function() {
        var canvas = document.getElementById("stage");
        var stage = Linda.initializeStage(canvas, false);
        var origin = {x: canvas.width / 2, y: canvas.height / 2};
        var queue = new LoadQueue();
        queue.on("fileload", function(event) {
            var rotation = 24*Math.PI;
            var startedAt = null;
            var duration = 6000;

            Ticker.addEventListener("tick", stage);

            var spiral = new Linda.Spiral({
                x: origin.x,
                y: origin.y,
                image: event.result
            });
            stage.addChild(spiral.shape);
            spiral.animate(rotation, duration);
        });
        queue.loadFile("images/bg_sea01.jpg");
    });
});
