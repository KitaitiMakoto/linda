Linda.Animation = function(images, options) {
    options = options || {};
    this.images = images;
    this.thickness = options.thickness || 24;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.expandingRate = options.expandingRate || (this.thickness / 3);
    this.unit = options.unit || 12;
    this.shape = new Shape();
};
Linda.Animation.patterns = [];
Linda.Animation.prototype.beginDrawing = function() {
    return this.clear()
        .beginBitmapStroke(this.image)
        .setStrokeStyle(this.thickness);
};
Linda.Animation.prototype.clear = function() {
    return this.shape.graphics.clear();
};
Linda.Animation.prototype.getDrawFunction = function() {
    var patterns = Linda.Animation.patterns;
    var pattern = patterns[Math.floor(Math.random() * patterns.length)];
    return pattern.draw;
};
Linda.Animation.prototype.getImage = function() {
    var images = this.images;
    return images[Math.floor(Math.random() * images.length)];
};
Linda.Animation.prototype.animate = function(rotation, duration) {
    this.draw = this.getDrawFunction();
    this.image = this.getImage();
    this.rotation = rotation;
    var scope = this;
    return new Promise(function(resolve, reject) {
        var startedAt = null;
        var requestID = requestAnimationFrame(function(timestamp) {
            if (! startedAt) {
                startedAt = timestamp;
            }
            var progress = (timestamp - startedAt) / duration;
            var gradient = scope.rotation * progress;
            scope.draw(progress, gradient);
            if (progress > 1) {
                cancelAnimationFrame(requestID);
                resolve(scope);
            } else {
                requestID = requestAnimationFrame(arguments.callee);
            }
        });
    });
};
Linda.Animation.prototype.rotate = function(coord, angle) {
    return {
        x: coord.x * Math.cos(angle) - coord.y * Math.sin(angle),
        y: coord.x * Math.sin(angle) + coord.y * Math.cos(angle)
    };
};
Linda.Animation.prototype.translate = function(coord) {
    return {
        x: coord.x + this.x,
        y: coord.y + this.y
    }
};
