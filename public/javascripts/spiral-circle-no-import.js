(new Promise(function(resolve, reject) {
    if (document.readyState !== "loading") {
        resolve();
    } else {
        document.addEventListener("DOMContentLoaded", function() {
            resolve();
        })
    }
})).then(function() {
    return new Promise(function(resolve, reject) {
        var image = new Image();
        image.addEventListener("load", function(event) {
            resolve(event.target);
        });
        image.addEventListener("error", function(event) {
            reject(new Error(event));
        });
        image.src = "images/bg_sea01.jpg";
    });
}).then(function(image) {
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
    circle.animate(48 * Math.PI, 24000);
}).catch(function(error) {
    console.error(error);
    alert(error);
});
