Linda.Spiral = function(options) {
    options = options || {};
    this.image = options.image;
    this.thickness = options.thickness || 24;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.shape = new Shape();
};
Linda.Spiral.prototype.draw = function(additionalAngle) {
    this.clear()
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
Linda.Spiral.prototype.animate = function(rotation, duration) {
    var scope = this;
    return new Promise(function(resolve, reject) {
        var startedAt = null;
        var requestID = requestAnimationFrame(function(timestamp) {
            if (! startedAt) {
                startedAt = timestamp;
            }
            var progress = (timestamp - startedAt) / duration;
            var additional = rotation * progress;
            scope.draw(additional);
            if (progress > 1) {
                cancelAnimationFrame(requestID);
                resolve(scope);
            } else {
                requestID = requestAnimationFrame(arguments.callee);
            }
        });
    });
};
Linda.Spiral.prototype.clear = function() {
    return this.shape.graphics.clear();
};
