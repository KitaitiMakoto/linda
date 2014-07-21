document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var longSide = Math.max(canvas.width, canvas.height);
    var shortSide = Math.min(canvas.width, canvas.height);
    var origin = {x: canvas.width / 2, y: canvas.height /2}
    var stage = new Stage(canvas);
    var circle = new Shape();

    circle.graphics
        .beginStroke("#ffffff")
        .setStrokeStyle(12)
        .drawCircle(0, 0, shortSide * 0.6 / 2)
        .endStroke()
        .beginFill("#ffffff")
        .drawCircle(0, 0, shortSide * 0.4 / 2)
        .endFill();
    circle.set(origin);
    stage.addChild(circle);

    Ticker.setFPS(20);
    var waiting = true;
    Ticker.addEventListener("tick", function() {
        var tween = Tween.get(circle);
        switch (circle.scaleX) {
        case 1:
            if (waiting) {
                tween
                    .wait(1000)
                    .call(function() {
                        waiting = false;
                    });
            } else {
                tween.to({scaleX: 0.9, scaleY: 0.9}, 300, Ease.lenear);
            }
            break;
        case 0.9:
            tween.to({scaleX: 1.3, scaleY: 1.3}, 100, Ease.lenear);
            break;
        case 1.3:
            tween
                .to({scaleX: 1, scaleY: 1}, 1000, Ease.bounceOut)
                .call(function() {
                    waiting = true;
                });
            break;
        }
        stage.update();
    });
    stage.update()
});
