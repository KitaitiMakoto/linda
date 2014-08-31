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

            var angle = 1/5  * Math.PI;
	    var shape = new Linda.SpiralSquare({
		x: origin.x,
		y: origin.y,
		image: image
	    });
	    stage.addChild(shape.shape);
	    shape.draw(angle);
        });
        queue.loadFile(imageUri);
    });
});
function rotate(coord, angle) {
    return {
        x: coord.x * Math.cos(angle) - coord.y * Math.sin(angle),
        y: coord.x * Math.sin(angle) + coord.y * Math.cos(angle)
    };
}
function translate(coord, origin) {
    return {
        x: coord.x + origin.x,
        y: coord.y + origin.y
    };
}
