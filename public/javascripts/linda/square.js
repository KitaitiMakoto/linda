Linda.Square = function(options) {
    options = options || {};
    this.length = options.length || 0;
    this.color = options.color || "#000000";
    this.thickness = options.thickness || 6;
    this.alpha = options.alpha || 1;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.shape = new Shape();
};
Linda.Square.prototype = Object.create(Linda.Shape.prototype);
Linda.Square.prototype.draw = function() {
    var halfLength = this.length / 2;
    this.shape.graphics
        .clear()
        .beginStroke(this.color)
        .setStrokeStyle(this.thickness)
        .rect(this.x - halfLength, this.y - halfLength, this.length, this.length);
    this.shape.set({x: this.x, y: this.y, alpha: this.alpha});
}
