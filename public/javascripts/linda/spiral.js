Linda.Spiral = function(image, options) {};
Linda.Spiral.constructors = [];
Linda.Spiral.createShape = function(image, options, constructor) {
    if (! constructor) {
        var constructors = Linda.Spiral.constructors;
        constructor = constructors[Math.floor(Math.random() * constructors.length)];
    }
    return new constructor(image, options);
};
Linda.Spiral.prototype.init = function(image, options) {
    options = options || {};
    this.image = image;
    this.thickness = options.thickness || 24;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.shape = new Shape();
};
Linda.Spiral.prototype.beginDrawing = function() {
    return this.clear()
        .beginBitmapStroke(this.image)
        .setStrokeStyle(this.thickness);
};
Linda.Spiral.prototype.clear = function() {
    return this.shape.graphics.clear();
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
            var gradient = additional;
            scope.draw(additional, gradient);
            if (progress > 1) {
                cancelAnimationFrame(requestID);
                resolve(scope);
            } else {
                requestID = requestAnimationFrame(arguments.callee);
            }
        });
    });
};
