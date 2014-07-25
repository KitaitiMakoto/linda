document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var shortSide = Math.min(canvas.width, canvas.height);
    var stage = new Stage(canvas);
    var circle = new Linda.Circle(stage, {x: canvas.width / 2, y: canvas.height / 2, radius: shortSide * 0.6 / 2});

    Ticker.addEventListener("tick", stage);

    circle
        .draw()
        .moveTo({x: 150, y: 150}, 1000, function() {
            this.moveBy({x: 150}, 100, function() {
                this.scaleTo({scaleX: 0.6, scaleY: 0.6}, 800, function() {

                    this.tweenTo({x: canvas.width / 2, y: canvas.height / 2, scaleX: 1, scaleY: 1}, 100);
                });
            });
        });
});
