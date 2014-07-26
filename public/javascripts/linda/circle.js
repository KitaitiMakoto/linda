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
    var self = this;
    return new Promise(function(resolve, reject) {
        self.shape.graphics
            .beginStroke(self.color)
            .setStrokeStyle(12)
            .drawCircle(0, 0, self.radius)
            .endStroke()
            .beginFill(self.color)
            .drawCircle(0, 0, self.radius * 2 / 3)
            .endFill();
        self.shape.set({x: self.props.x, y: self.props.y});
        self.stage.addChild(self.shape);

        resolve(self);
    });
}
Linda.Circle.prototype.getTween = function() {
    return Tween.get(this.shape);
};
Linda.Circle.prototype.tweenTo = function(props, duration, ease) {
    var self = this;
    return new Promise(function(resolve, reject) {
        for (var prop in props) {
            switch (prop) {
            case "x":
                self.x = props.x;
                self.props.x = self.stage.canvas.width * self.x;
                break;
            case "y":
                self.y = props.y;
                self.props.y = self.stage.canvas.height * self.y;
                break;
            default:
                self.props[prop] = props[prop];
            }
        }
        self.getTween()
            .to(self.props, duration, ease)
            .call(function() {
                resolve(self);
            });
    });
};
Linda.Circle.prototype.moveTo = Linda.Circle.prototype.tweenTo;
Linda.Circle.prototype.moveBy = function(difference, duration, ease) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var newProps = {};
        for (var prop in difference) {
            switch (prop) {
            case "x":
            case "y":
                newProps[prop] = self[prop] + difference[prop];
                break;
            default:
                newProps[prop] = self.props[prop] + difference[prop];
            }
        }
        self.tweenTo(newProps, duration, ease)
            .then(function() {
                resolve(self);
            });
    });
};
Linda.Circle.prototype.scaleTo = Linda.Circle.prototype.tweenTo;
Linda.Circle.prototype.appear = function(duration, ease) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.tweenTo({alpha: 1}, duration, ease)
            .then(function() {
                resolve(self);
            });
    });
};
Linda.Circle.prototype.disappear = function(duration, ease) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.tweenTo({alpha: 0}, duration, ease)
            .then(function() {
                resolve(self);
            });
    });
};
