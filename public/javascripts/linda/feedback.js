Linda.Feedback = function(element, container) {
    this.element = element;
    this.container = container;
    this.initialRadius = this.radius = 31.25 / 2;
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
    this.element.style.width = this.element.style.height = radius * 2 + "vmin";
};

Linda.Feedback.Microphone = function(element, container) {
    Linda.Feedback.call(this, element, container);
};
Linda.Feedback.Microphone.prototype = Object.create(Linda.Feedback.prototype);
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

Linda.Feedback.Microphone.prototype.start = function() {
    var self = this;
    this.state = "expanding";
    this.requestID = requestAnimationFrame(function(timestamp) {
        if (! self.lastTimestamp) {
            self.lastTimestamp = timestamp;
        }
        self.setRadius(self.radius + (timestamp - self.lastTimestamp) / 1000 * 3);
        self.lastTimestamp = timestamp;
        self.requestID = requestAnimationFrame(arguments.callee);
    });
    return this;
};
