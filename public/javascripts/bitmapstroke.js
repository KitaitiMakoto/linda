var canvas = document.getElementById("stage");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var stage = new Stage(canvas);
var origin = {x: canvas.width / 2, y: canvas.height / 2};

var imageUri = "images/bg_sea01.jpg";

var queue = new LoadQueue(false);
queue.on("fileload", function(event) {
    var circles = [];
    for (i = 0; i < 12; i++) {
        circles.push(new PrototypeCircle(event.result));
    }
    circles.forEach(function(circle, i) {
        stage.addChild(circle.shape);
        setTimeout(function(circle) {
            circle.tweenTo({radius: canvas.width * 2}, 6000);
        }, i * 400, circle);
    });
});
queue.loadFile(imageUri);

Ticker.on("tick", stage);

PrototypeCircle = function(image) {
    this.shape = new Shape();
    this.image = image;
};

PrototypeCircle.prototype.draw = function(radius) {
    this.shape.graphics
        .clear()
        .beginBitmapStroke(this.image)
        .setStrokeStyle(50)
        .drawCircle(origin.x, origin.y, radius)
        .endStroke();
};

PrototypeCircle.prototype.tweenTo = function(props, duration) {
    duration = duration || 2000;
    var shape = this;
    var startedAt = null;
    var requestID = null;
    var render = function(timestamp) {
        if (startedAt === null) {
            startedAt = timestamp;
        }
        var progress = timestamp - startedAt;
        var radius = props.radius * (progress / duration);
        shape.draw(radius);
        if (progress > duration) {
            cancelAnimationFrame(requestID);
            shape = null;
            startedAt = null;
            requestID = null;
            render = null;
        } else {
            requestID = requestAnimationFrame(render);
        }
    };
    requestID = requestAnimationFrame(render);
};
