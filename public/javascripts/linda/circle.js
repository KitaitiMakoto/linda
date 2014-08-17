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
Linda.Circle.prototype = Object.create(Linda.Shape.prototype);
Linda.Circle.prototype.draw = function() {


var m = new Matrix2D();
m.translate(-canvas.width / 2, -canvas.height / 2)
    .scale(bg.width / canvas.width, 1);

    this.shape.graphics
        .clear()
        .beginBitmapFill(bg, "no-repeat", m)
        .drawCircle(this.x, this.y, this.radius + this.thickness / 2)
        .beginFill("#ffffff")
        .drawCircle(this.x, this.y, this.radius - this.thickness / 2);
    ;
    this.shape.set({x: this.x, y: this.y, alpha: this.alpha});
}
