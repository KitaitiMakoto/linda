Linda.Spiral = function(images, options) {
    options = options || {};
    this.images = images;
    this.thickness = options.thickness || 24;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.expandingRate = options.expandingRate || (this.thickness / 3);
    this.unit = options.unit || 12;
    this.shape = new Shape();
};
Linda.Spiral.constructors = [];
Linda.Spiral.prototype.beginDrawing = function() {
    return this.clear()
        .beginBitmapStroke(this.image)
        .setStrokeStyle(this.thickness);
};
Linda.Spiral.prototype.clear = function() {
    return this.shape.graphics.clear();
};
Linda.Spiral.prototype.animate = function(rotation, duration) {
    var constructors = Linda.Spiral.constructors;
    var shapeConstructor = constructors[Math.floor(Math.random() * constructors.length)];
    this.draw = shapeConstructor.draw;
    this.image = this.images[Math.floor(Math.random() * this.images.length)];
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
Linda.Spiral.prototype.rotate = function(coord, angle) {
    return {
        x: coord.x * Math.cos(angle) - coord.y * Math.sin(angle),
        y: coord.x * Math.sin(angle) + coord.y * Math.cos(angle)
    };
};
Linda.Spiral.prototype.translate = function(coord) {
    return {
        x: coord.x + this.x,
        y: coord.y + this.y
    }
};
