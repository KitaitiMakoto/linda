Linda.SpiralCircle = function(image, options) {
    this.init(image, options);
};
Linda.SpiralCircle.prototype = Object.create(Linda.Spiral.prototype);
Linda.SpiralCircle.prototype.draw = function(additionalAngle) {
    this.beginDrawing();
    // stolen from http://stackoverflow.com/questions/6824391/drawing-a-spiral-on-an-html-canvas-using-javascript
    for (i = 0; i < 720; i++) {
        var angle = 0.1 * i;
        var x = (1 + angle) * Math.cos(angle + additionalAngle) * 12;
        var y = (1 + angle) * Math.sin(angle + additionalAngle) * 12;
        this.shape.graphics.lineTo(this.x + x, this.y + y);
    }
};
