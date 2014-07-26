Linda.Circle = function(stage, options) {
    this.stage = stage;
    this.color = options.color || "#ffffff";
    this.radius = options.radius;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.shape = options.shape || new Shape();
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
    this.shape.set({x: this.x, y: this.y});
    this.stage.addChild(this.shape);

    return this;
}
Linda.Circle.prototype.getTween = function() {
    return Tween.get(this.shape);
};
Linda.Circle.prototype.tweenTo = function(props, duration, callback) {
    for (var prop in props) {
        this[prop] = props[prop];
    }
    var tween = this.getTween().to(props, duration);
    if (callback) {
        tween.call(callback, null, this);
    }
};
Linda.Circle.prototype.moveTo = Linda.Circle.prototype.tweenTo;
Linda.Circle.prototype.moveBy = function(difference, duration, callback) {
    for (var prop in difference) {
        this[prop] += difference[prop];
    }
    this.tweenTo({x: this.x, y: this.y}, duration, callback);
};
Linda.Circle.prototype.scaleTo = Linda.Circle.prototype.tweenTo;
