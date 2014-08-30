document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas);
    var shortSide = Math.min(canvas.width, canvas.height)
    var longSide = Math.max(canvas.width, canvas.height);
    var expandCircles = function(numCircles, prepare) {
        var startRadius = shortSide * 0.1 / 2;
        var circles = [];
        for (i = 0; i < numCircles; i++) {
            circles.push(new PrototypeCircle(startRadius));
        }
        var expandTo = longSide * 2 / 2;
        var duration = 4000;
        circles.forEach(function(circle, index) {
            if (prepare) {
                prepare(circle, index);
            }
            stage.addChild(circle.shape);
            setTimeout(function() {
                circle.expandTo(expandTo, duration);
            }, index * 400 + 200);
        });
    };

    Ticker.addEventListener("tick", stage);

    var input = new Linda.Shake({pauseThreshold: 1000});
    window.addEventListener("linda.inputend", function(event) {
	input.stopListening();
	expandCircles(3, function(circle) {
	    circle.alpha = 0.8;
	});
	setTimeout(function() {
	    input.startListening()
	}, 5000);
    });
    input.startListening();
});

function PrototypeCircle(options) {
    options = options || {};
    this.radius = options.radius || 0;
    this.color = options.color || "#ffffff";
    this.lineWidth = options.lineWidth || 3;
    this.alpha = options.alpha || 1;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.shape = new Shape();
    this.start = null;
    this.requestID = null;
}

PrototypeCircle.prototype.expandTo = function(radius, duration) {
    var startRadius = this.radius;
    var startAlpha = this.alpha;
    var self = this;
    var render = function(timestamp) {
        if (self.start === null) {
            self.start = timestamp;
        }
        var progress = timestamp - self.start;
        if (progress > duration) {
            cancelAnimationFrame(self.requestID);
            self.radius = startRadius;
            self.alpha = startAlpha;
            self.start = null;
            self.requestID = null;
            return;
        }
        self.radius = startRadius + (radius - startRadius) * (progress / duration)
        self.alpha = startAlpha - (progress / duration);
        self.draw();
        self.requestID = requestAnimationFrame(render);
    };
    this.requestID = requestAnimationFrame(render);
};

PrototypeCircle.prototype.draw = function() {
    this.shape.graphics
        .clear()
        .beginStroke(this.color)
        .setStrokeStyle(this.lineWidth)
        .drawCircle(this.x, this.y, this.radius)
        .endStroke();
    // this.shape.set({alpha: this.alpha});

    return this;
};

function PrototypeShakeSensor() {
    this.count = 0;
    this.intervalThresold = 1000;
}

PrototypeShakeSensor.prototype.startListening = function(callback) {
    this.then = callback;
    var self = this;
    window.addEventListener("shake", function(event) {
        var lastCount = ++self.count;
        setTimeout(function() {
            if (self.count === lastCount) {
                self.stopInputting();
            }
        }, self.intervalThresold);
    });
};

PrototypeShakeSensor.prototype.start = function() {
    this.count = 0;
};

PrototypeShakeSensor.prototype.stop = function() {
    if (this.then) {
        this.then(this.count);
    }
    this.count = 0;
};
