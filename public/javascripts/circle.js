document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var longSide = Math.max(canvas.width, canvas.height);
    var shortSide = Math.min(canvas.width, canvas.height);
    var origin = {x: canvas.width / 2, y: canvas.height /2}
    var stage = new Stage(canvas);
    var outerCircle = new Shape();
    var innerCircle = new Shape();

    [outerCircle, innerCircle].forEach(function(circle) {
	circle.graphics.beginStroke("#ffffff");
	circle.shadow = new Shadow("#999999", 6, 10, 24);
	circle.set(origin);
	stage.addChild(circle);
    });

    outerCircle.graphics.setStrokeStyle(12);
    outerCircle.graphics.drawCircle(0, 0, shortSide * 0.6 / 2);

    var radius = shortSide * 0.4 / 2;
    innerCircle.graphics.setStrokeStyle(radius);
    innerCircle.graphics.drawCircle(0, 0, radius / 2);

    stage.update();
});
