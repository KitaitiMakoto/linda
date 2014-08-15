document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas);
    var shortSide = Math.min(canvas.width, canvas.height)
    var longSide = Math.max(canvas.width, canvas.height);

    Ticker.addEventListener("tick", stage);

    var circles = [];
    for (var i = 0; i < 12; i++) {
        circles.push(new Linda.Circle({radius: shortSide * 0.1 / 2, thickness: 8}));
    }
    circles.forEach(function(circle, index) {
        setTimeout(function() {
            stage.addChild(circle.shape);
            circle.tweenTo({radius: longSide * 2 / 2});
        }, index * 100);
    });
});
