document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas);
    var shortSide = Math.min(canvas.width, canvas.height)
    var longSide = Math.max(canvas.width, canvas.height);

    Ticker.addEventListener("tick", stage);

    var square = new Linda.Square({radius: shortSide * 0.3 / 2});
    stage.addChild(square.shape);
    square.draw();
    square.tweenTo({radius: longSide * 2 / 2, alpha: 0});
});
