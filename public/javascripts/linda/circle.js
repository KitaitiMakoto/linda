Linda.Circle = function(options) {
    options = options || {};
    this.radius = options.radius || 0;
    this.color = options.color || "#000000";
    this.thickness = options.thickness || 6;
    this.alpha = options.alpha || 1;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.shape = new Shape();
};
Linda.Circle.prototype = Linda.Shape.prototype;
Linda.Circle.prototype.draw = function() {
    this.shape.graphics
        .clear()
        .beginStroke(this.color)
        .setStrokeStyle(this.thickness)
        .drawCircle(this.x, this.y, this.radius);
    this.shape.set({x: this.x, y: this.y, alpha: this.alpha});
}
