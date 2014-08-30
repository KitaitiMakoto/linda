Linda.Spiral = function(options) {
    options = options || {};
    this.image = options.image;
    this.thickness = options.thickness || 24;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.shape = new Shape();
};
Linda.Spiral.prototype.draw = function(additionalAngle) {
    this.shape.graphics
        .clear()
        .beginBitmapStroke(this.image)
        .setStrokeStyle(this.thickness);
    // stolen from http://stackoverflow.com/questions/6824391/drawing-a-spiral-on-an-html-canvas-using-javascript
    for (i = 0; i < 720; i++) {
        var angle = 0.1 * i;
        var x = (1 + angle) * Math.cos(angle + additionalAngle) * 12;
        var y = (1 + angle) * Math.sin(angle + additionalAngle) * 12;
        this.shape.graphics.lineTo(this.x + x, this.y + y);
    }
};
