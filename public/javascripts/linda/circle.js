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
Linda.Circle.prototype.draw = function() {
    this.shape.graphics
        .clear()
        .beginStroke(this.color)
        .setStrokeStyle(this.thickness)
        .drawCircle(this.x, this.y, this.radius);
    this.shape.set({x: this.x, y: this.y, alpha: this.alpha});
}
Linda.Circle.prototype.tweenTo = function(props, duration) {
    duration = duration || 1000;
    var startProps = {};
    for (var prop in props) {
        var startProp = this[prop]
        if (props[prop] === startProp) {
            continue;
        }
        startProps[prop] = startProp;
    }

    var circle = this;
    var startedAt = null;
    var requestID = null;
    var render = function(timestamp) {
        if (startedAt === null) {
            startedAt = timestamp;
        }
        var progress = timestamp - startedAt;
        if (progress > duration) {
            cancelAnimationFrame(requestID);
            for (var prop in startProps) {
                circle[prop] = startProps[prop];
            }
            startedAt = null;
            requestID = null;
            return;
        }
        for (var prop in startProps) {
            var startProp = startProps[prop];
            circle[prop] = startProp + (props[prop] - startProp) * (progress / duration);
        }
        circle.draw();
        requestID = requestAnimationFrame(render);
    };
    requestID = requestAnimationFrame(render);
};
