document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var shortSide = Math.min(canvas.width, canvas.height);
    var stage = new Stage(canvas);
    var circle = new Linda.Circle(stage, {radius: shortSide * 0.6 / 2, position: {x: canvas.width / 2, y: canvas.height / 2}});

    Ticker.addEventListener("tick", stage);

    circle.draw();
    circle.moveTo({x: 150, y: 150}, 1000);
});
