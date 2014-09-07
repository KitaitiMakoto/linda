document.addEventListener("DOMContentLoaded", function() {
    importComponents();
});

function importComponents() {
    var loader = document.getElementById("linda-loader");
    if (! ("import" in loader)) {
        alert("お使いのブラウザーはHTML Importsの機能をサポートしていません");
        return;
    }
    loader.addEventListener("load", function() {
        init();
    });
}

function init() {

Linda.Spiral.prototype.animateWithoutPromise = function(rotation, duration) {
    var scope = this;
    var startedAt = null;
    var requestID = requestAnimationFrame(function(timestamp) {
        if (! startedAt) {
            startedAt = timestamp;
        }
        var progress = (timestamp - startedAt) / duration;
        var additional = rotation * progress;
        var gradient = additional;
        scope.draw(additional, gradient);
        if (progress > 1) {
            cancelAnimationFrame(requestID);
        } else {
            requestID = requestAnimationFrame(arguments.callee);
        }
    });
};

    var image = new Image();
    image.addEventListener("load", function(event) {
        run(event.target);
    });
    image.addEventListener("error", function(event) {
        alert("画像の読み込みに失敗しました。");
    });
    image.src = "images/bg_sea01.jpg";
}

function run(image) {
    var canvas = document.getElementById("stage");
    var app = new Linda(canvas);
    var circle = new Linda.SpiralCircle(
        image,
        {
            x: canvas.width / 2,
            y: canvas.height / 2
        }
    );

if (/image=cover/.test(location.search)) {
    var ratio = canvas.height / image.height;
    circle.shape.getMatrix()
        .scale(ratio, ratio)
        .decompose(circle.shape);
    circle.x /= ratio;
    circle.y /= ratio;
}

    app.stage.addChild(circle.shape);
    Ticker.addEventListener("tick", app.stage);
    circle.animateWithoutPromise(48 * Math.PI, 24000);
}
