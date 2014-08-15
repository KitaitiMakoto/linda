Linda.Shape = function() {};
Linda.Shape.prototype.tweenTo = function(props, duration) {
    duration = duration || 1000;
    var startProps = {};
    for (var prop in props) {
        var startProp = this[prop]
        if (props[prop] === startProp) {
            continue;
        }
        startProps[prop] = startProp;
    }

    var shape = this;
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
                shape[prop] = startProps[prop];
            }
            startedAt = null;
            requestID = null;
            return;
        }
        for (var prop in startProps) {
            var startProp = startProps[prop];
            shape[prop] = startProp + (props[prop] - startProp) * (progress / duration);
        }
        shape.draw();
        requestID = requestAnimationFrame(render);
    };
    requestID = requestAnimationFrame(render);
};
