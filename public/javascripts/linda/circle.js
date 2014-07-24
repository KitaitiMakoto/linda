if (typeof Linda === "undefined") {
    Linda = {};
}

Linda.Circle = Object.create(Function);
Linda.Circle.prototype.draw = function() {
    this.shape.graphics
        .beginStroke(this.color)
        .setStrokeStyle(12)
        .drawCircle(0, 0, this.radius)
        .endStroke()
        .beginFill(this.color)
        .drawCircle(0, 0, this.radius * 2 / 3)
        .endFill();
    this.shape.set(this.origin);
    this.stage.addChild(this.shape);

    return this;
}
