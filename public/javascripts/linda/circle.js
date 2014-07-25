if (typeof Linda === "undefined") {
    Linda = {};
}

Linda.Circle = function(stage, options) {
    this.stage = stage;
    this.color = options.color || "#ffffff";
    this.radius = options.radius;
    this.position = options.position || {x: 0, y:0};
    this.scaleX = 1;
    this.scaleY = 1;
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
Linda.Circle.prototype.moveBy = function(difference, duration, callback) {
    for (var prop in difference) {
        this.position[prop] += difference[prop];
    }
    var tween = Tween.get(this.shape).to({x: this.position.x, y: this.position.y}, duration);
    if (callback) {
        tween.call(callback, null, this);
    }
};
Linda.Circle.prototype.scaleTo = function(scale, duration, callback) {
    for (var dimension in scale) {
        this[dimension] = scale[dimension];
    }
    var tween = Tween.get(this.shape).to({scaleX: this.scaleX, scaleY: this.scaleY}, duration);
    if (callback) {
        tween.call(callback, null, this);
    }
};
