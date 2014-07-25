if (typeof Linda === "undefined") {
    Linda = {};
}

Linda.Circle = function(stage, options) {
    this.stage = stage;
    this.color = options.color || "#ffffff";
    this.radius = options.radius;
    this.position = options.position || {x: 0, y:0}
    this.shape = options.shape || new  Shape();
};
Linda.Circle.prototype.draw = function() {
    this.shape.graphics
        .beginStroke(this.color)
        .setStrokeStyle(12)
        .drawCircle(0, 0, this.radius)
        .endStroke()
        .beginFill(this.color)
        .drawCircle(0, 0, this.radius * 2 / 3)
        .endFill();
    this.shape.set(this.position);
    this.stage.addChild(this.shape);

    return this;
}
Linda.Circle.prototype.moveTo = function(position, duration, callback) {
    this.position = position;
    var tween = Tween.get(this.shape).to(position, duration);
    if (callback) {
        tween.call(callback, null, this);
    }
};
Linda.Circle.prototype.moveBy = function(difference) {
    for (var prop in difference) {
        this.position[prop] += difference[prop];
    }
    Tween.get(this.shape).to({x: this.position.x, y: this.position.y}, 100);
};
