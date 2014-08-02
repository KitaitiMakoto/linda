document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var longSide = Math.max(canvas.width, canvas.height);
    var shortSide = Math.min(canvas.width, canvas.height);
    var origin = {x: canvas.width / 2, y: canvas.height /2}
    var stage = new Stage(canvas);
    var triangle = new Shape();

    var base = shortSide * 0.5;
    var height = shortSide * 0.6;

    triangle.graphics
        .beginStroke("#ffffff")
        .setStrokeStyle(12)
        .moveTo(- base / 2, height / 2)
        .lineTo(base / 2, height / 2)
        .lineTo(0, - height / 2)
        .closePath()
        .endStroke();
    triangle.shadow = new Shadow("#999999", 3, -3, 24);
    triangle.set(origin);
    stage.addChild(triangle);

    stage.update();
});
