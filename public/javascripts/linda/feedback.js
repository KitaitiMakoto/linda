Linda.Feedback = function(element, container) {
    this.element = element;
    this.container = container;
    this.initialRadius = this.radius = 15.625;
    this.state = "stopped";// stopped, expanding, paused
    this.requestID = null;
    this.lastTimestamp = null;
    var self = this;
    addEventListener("linda.listeningstart", function() {
        if (self.state !== "paused") {
            self.rewind();
        }
    });
    addEventListener("linda.inputstart", function() {
        if (self.state !== "expanding") {
            self.start();
        }
    });
    addEventListener("linda.inputend", function() {
        self.stop();
    });
    addEventListener("hashchange", function() {
        if (location.hash === "#menu") {
            self.pause();
        } else {
            self.container.classList.remove("paused");
        }
    });
};
Linda.Feedback.prototype.constructor = Linda.Feedback;
Linda.Feedback.prototype.setRadius = function(radius) {
    this.radius = radius;
    this.element.setAttribute("r", radius + "%");
    var circles = document.getElementById("feedback-circles");//TODO: cache it
    var value = "circle(" + radius + "% at 50% 50%);";
    circles.setAttribute("style", "-webkit-clip-path: " + value + "; clip-path: " + value + ";");
};
Linda.Feedback.prototype.start = function() {
    var self = this;
    this.state = "expanding";
    this.requestID = requestAnimationFrame(function(timestamp) {
        if (! self.lastTimestamp) {
            self.lastTimestamp = timestamp;
        }
        self.drawCurrentFrame(timestamp);
        self.lastTimestamp = timestamp;
        self.requestID = requestAnimationFrame(arguments.callee);
    });
    return this;
};
Linda.Feedback.prototype.pause = function() {
    this.stop();
    this.state = "paused";
    this.container.classList.add("paused");
    return this;
};
Linda.Feedback.prototype.stop = function() {
    cancelAnimationFrame(this.requestID);
    this.lastTimestamp = null;
    this.state = "stopped";
    return this;
};
Linda.Feedback.prototype.rewind = function() {
    this.lastTimestamp = null;
    this.setRadius(this.initialRadius);
    return this;
};

Linda.Feedback.Microphone = function(element, container) {
    Linda.Feedback.call(this, element, container);
    this.expandingDuration = 6000; //milliseconds
};
Linda.Feedback.Microphone.prototype = Object.create(Linda.Feedback.prototype);
Linda.Feedback.Microphone.prototype.constructor = Linda.Feedback.Microphone;
Linda.Feedback.Microphone.prototype.drawCurrentFrame = function(timestamp) {
    var ratio = (timestamp - this.lastTimestamp) / this.expandingDuration;
    var radius = this.radius + (50 - this.initialRadius) * ratio;
    if (radius > 50) {
        return;
    }
    this.setRadius(radius);
};

Linda.Feedback.Shake = function(element, container) {
    Linda.Feedback.call(this, element, container);
    this.expandingDuration = 6000; //milliseconds
};
Linda.Feedback.Shake.prototype = Object.create(Linda.Feedback.prototype);
Linda.Feedback.Shake.prototype.constructor = Linda.Feedback.Shake;
Linda.Feedback.Shake.prototype.drawCurrentFrame = function(timestamp) {
    console.warn("This is mock implementation");
    var ratio = (timestamp - this.lastTimestamp) / this.expandingDuration;
    var radius = this.radius + (50 - this.initialRadius) * ratio;
    if (radius > 50) {
        return;
    }
    this.setRadius(radius);
};
