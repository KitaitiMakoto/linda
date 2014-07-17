document.addEventListener("DOMContentLoaded", function() {

    var canvas = document.getElementById("stage");
    var file = "images/view1_1.png";
    var queue = new createjs.LoadQueue(true);
    var stage = new createjs.Stage("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    queue.on("fileload", function(event) {
        var image = event.result;
        var bitmap = new createjs.Bitmap(image);
        console.info(stage.canvas);
console.info(stage.canvas.width, stage.canvas.height, image.width, image.height);
        var canvasAspect = stage.canvas.width / stage.canvas.height;
        var imageAspect = image.width / image.height;
        if (canvasAspect > imageAspect) {
            var scale = stage.canvas.height / image.height;
        } else {
            var scale = stage.canvas.width / image.width;
        }
        bitmap.scaleX = bitmap.scaleY = scale;
        bitmap.x = stage.canvas.width / 2;
        bitmap.regX = image.width / 2;
        stage.addChild(bitmap);
        stage.update();
    })
    queue.loadFile(file);
});
