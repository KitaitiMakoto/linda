document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var longSide = Math.max(canvas.width, canvas.height);
    var shortSide = Math.min(canvas.width, canvas.height);
    var origin = {x: canvas.width / 2, y: canvas.height /2}
    var stage = new Stage(canvas);
    var triangle = new Shape();

    triangle.graphics
        .beginStroke("#ffffff")
        .setStrokeStyle(12)
        .drawPolyStar(0, 0, shortSide * 0.6 / 2, 3, 0, -90);
    triangle.shadow = new Shadow("#999999", 3, -3, 24);
    triangle.set(origin);
    stage.addChild(triangle);

    stage.update();
});
