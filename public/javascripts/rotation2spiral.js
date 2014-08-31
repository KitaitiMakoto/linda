document.addEventListener("DOMContentLoaded", function(event) {
    event.target.getElementById("linda").addEventListener("load", function() {
        var canvas = event.target.getElementById("stage");
        var stage = Linda.initializeStage(canvas, false);
        var origin = {x: canvas.width / 2, y: canvas.height / 2};
        var queue = new LoadQueue();
        queue.addEventListener("fileload", function(event) {
            var image = event.result;
            var rotation = 24 * Math.PI;
            var duration = 6000;
            var spiral = new Linda.SpiralCircle({
                x: origin.x,
                y: origin.y,
                image: image
            });
            stage.addChild(spiral.shape);

            Ticker.addEventListener("tick", stage);

            var inputConstructor = /sense=shake/.test(location.search) ? Linda.Shake : Linda.Rotation;
            var input = new inputConstructor({pauseThreshold: 1000});
            window.addEventListener("linda.inputend", function(event) {
                input.stopListening();
                spiral
                    .animate(rotation, duration)
                    .then(function(spiral) {
                        spiral.clear();
                        startListening();
                    });
            });
            input.startListening();
        });
        queue.loadFile("images/bg_sea01.jpg");
    });
});
