Linda.Spiral = function(image, options) {};
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
