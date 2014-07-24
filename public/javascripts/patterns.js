document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var shortSide = Math.min(canvas.width, canvas.height);
    var stage = new Stage(canvas);
    var circle = Object.create(Linda.Circle.prototype, {
        stage: {value: stage},
        shape: {value: new Shape()},
        color: {value: "#ffffff"},
        radius: {value:  shortSide * 0.6 / 2},
        position: {value: {x: canvas.width / 2, y: canvas.height / 2}}
    });
    circle.draw();

    stage.update();
});
