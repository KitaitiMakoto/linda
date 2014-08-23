var canvas = document.getElementById("stage");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var stage = new Stage(canvas)
var origin = {x: canvas.width / 2, y: canvas.height / 2};

var imageUri = "images/bg_sea01.jpg";
var backgroundImage = new Bitmap(imageUri);
var queue = new LoadQueue(false);
queue.loadFile({src: imageUri, data: backgroundImage});
queue.on("fileload", function(event) {
    backgroundImage.cache(0, 0, backgroundImage.width, backgroundImage.height);
    stage.addChild(backgroundImage);

    var circle = new PrototypeCircle(event.result);
    circle.draw(100);
    var circle2 = new PrototypeCircle(event.result);
    circle2.draw(200);
});

Ticker.on("tick", stage);

PrototypeCircle = function(image, options) {
    this.shape = new Shape();
    this.innerCircle = new Shape();
    this.bmp = new Bitmap(image);
    this.bmp.mask = this.shape;
    stage.addChild(this.shape);
    stage.addChild(this.bmp);
    setTimeout(function() {stage.addChild(this.innerCircle)}, 0);
};
PrototypeCircle.prototype.draw = function(radius) {
    radius = radius || {};
    this.bmp.mask.graphics
        .clear()
        .beginStroke(null)
        .setStrokeStyle(0)
        .drawCircle(origin.x, origin.y, radius);

    this.innerCircle.graphics
        .clear()
        .beginFill("#ffffff")
        .drawCircle(origin.x, origin.y, radius - 20)
        .endFill();
};
