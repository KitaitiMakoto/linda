document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var shortSide = Math.min(canvas.width, canvas.height);
    var stage = new Stage(canvas);
    stage.getMatrix()
        .translate(canvas.width / 2, canvas.height / 2)
        .decompose(stage);
    var circle = new Linda.Circle(stage, {radius: shortSide * 0.6 / 2});

    Ticker.addEventListener("tick", stage);

    circle
        .draw()
        .moveTo({x: -0.3, y: -0.1}, 1000, function() {
            this.moveBy({x: 0.15}, 100, function() {
                this.scaleTo({scaleX: 0.6, scaleY: 0.6}, 800, function() {

                    this.tweenTo({x: 0, y: 0, scaleX: 1, scaleY: 1}, 100);
                });
            });
        });
});
