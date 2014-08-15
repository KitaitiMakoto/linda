Linda.Triangle = function(options) {
    options = options || {};
    this.radius = options.radius || 0;
    this.color = options.color || "#000000";
    this.thickness = options.thickness || 6;
    this.alpha = options.alpha || 1;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.shape = new Shape();
};
Linda.Triangle.prototype = Object.create(Linda.Shape.prototype);
Linda.Triangle.prototype.draw = function() {
    this.shape.graphics
        .clear()
        .beginStroke(this.color)
        .setStrokeStyle(this.thickness)
        .drawPolyStar(0, 0, this.radius, 3, 0, -90)
        .closePath()
        .endStroke();
    this.shape.set({x: this.x, y: this.y, alpha: this.alpha});
};
