document.addEventListener("DOMContentLoaded", function(event) {
    event.target.getElementById("linda").addEventListener("load", function() {
        var canvas = event.target.getElementById("stage");
        var stage = Linda.initializeStage(canvas, false);
        var imageUri = "images/bg_sea01.jpg";
        var origin = {x: canvas.width / 2, y: canvas.height / 2};
        var queue = new LoadQueue();
        queue.addEventListener("fileload", function(event) {
            var image = event.result;
            var triangle = new Shape();
            stage.addChild(triangle);

            Ticker.addEventListener("tick", stage);

            var unit = 12;
            var coord = {x: -unit, y: 0};
            var pos = translate(coord, origin)
            triangle.graphics
                .clear()
                .beginBitmapStroke(image)
                .setStrokeStyle(24)
                .moveTo(origin.x, origin.y)
                .lineTo(pos.x, pos.y)
            for (i = 0; i < 720; i++) {
                var direction = i % 4;// 0 => left, 1 => down, 2 => right, 3 => up
                var length = unit * (i + 1) * 2;
                switch(direction) {
                case 0:
                    coord.x -= length;
                    break;
                case 1:
                    coord.y -= length;
                    break;
                case 2:
                    coord.x += length;
                    break;
                case 3:
                    coord.y += length;
                    break;
                }
                pos = translate(coord, origin);
                triangle.graphics.lineTo(pos.x, pos.y);
            }
        });
        queue.loadFile(imageUri);
    });
});
function translate(coord, origin) {
    return {
        x: coord.x + origin.x,
        y: coord.y + origin.y
    };
}
