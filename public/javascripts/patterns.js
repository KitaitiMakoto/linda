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
        .then(function(circle) {
            return circle.moveTo({x: -0.3, y: -0.1}, 1000);
        }).then(function(circle) {
            return circle.moveBy({x: 0.15}, 100);
        }).then(function(circle) {
            return circle.scaleTo({scaleX: 0.6, scaleY: 0.6}, 800);
        }).then(function(circle) {
            return circle.tweenTo({x: 0, y: 0, scaleX: 1, scaleY: 1}, 100);
        }).then(function(circle) {
            return circle.disappear(100);
        }).then(function(circle) {
            return circle.appear(100);
        }).then(function(circle) {
            return circle.disappear(100);
        }).then(function(circle) {
            return circle.appear(100);
        });
});
