document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas);
    var shortSide = Math.min(canvas.width, canvas.height)
    var longSide = Math.max(canvas.width, canvas.height);

window.canvas = canvas;
bg = new Image();
bg.src = "images/bg_sea01.jpg";

// bg.onload = function() {
//     var b = new Shape();
//     var m = new Matrix2D();
//     m.translate(-canvas.width / 2, -canvas.height / 2);
//     b.set({x:0, y:0});
//     stage.addChild(b);
//     b.graphics
//         .beginBitmapFill(bg, "repeat", m)
//         .drawCircle(0, 0, 400);
// };

    Ticker.addEventListener("tick", stage);

    var circles = [];
    for (var i = 0; i < 12; i++) {
        circles.push(new Linda.Circle({radius: shortSide * 0.1 / 2, thickness: 60}));
    }
    circles.forEach(function(circle, index) {
        setTimeout(function() {
            stage.addChild(circle.shape);
            circle.tweenTo({radius: longSide * 2 / 2});
        }, index * 300);
    });
});
