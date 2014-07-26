Linda.Circle = function(stage, options) {
    this.stage = stage;
    this.color = options.color || "#ffffff";
    this.radius = options.radius;
    this.shape = options.shape || new Shape();
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.props = {
        x: this.x * this.stage.canvas.width,
        y: this.y * this.stage.canvas.height,
        scaleX: 1,
        scaleY: 1
    }
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
    this.shape.set({x: this.props.x, y: this.props.y});
    this.stage.addChild(this.shape);

    return this;
}
Linda.Circle.prototype.getTween = function() {
    return Tween.get(this.shape);
};
Linda.Circle.prototype.tweenTo = function(props, duration, callback) {
    for (var prop in props) {
        switch (prop) {
        case "x":
            this.x = props.x;
            this.props.x = this.stage.canvas.width * this.x;
            break;
        case "y":
            this.y = props.y;
            this.props.y = this.stage.canvas.height * this.y;
            break;
        default:
            this.props[prop] = props[prop];
        }
    }
    var tween = this.getTween().to(this.props, duration);
    if (callback) {
        tween.call(callback, null, this);
    }
};
Linda.Circle.prototype.moveTo = Linda.Circle.prototype.tweenTo;
Linda.Circle.prototype.moveBy = function(difference, duration, callback) {
    var newProps = {};
    for (var prop in difference) {
        switch (prop) {
        case "x":
        case "y":
            newProps[prop] = this[prop] + difference[prop];
            break;
        default:
            newProps[prop] = this.props[prop] + difference[prop];
        }
    }
    this.tweenTo(newProps, duration, callback);
};
Linda.Circle.prototype.scaleTo = Linda.Circle.prototype.tweenTo;
