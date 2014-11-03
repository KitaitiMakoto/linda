Linda.Feedback = function(element, container) {
    this.element = element;
    this.container = container;
    this.radius = 0;
    this.state = "stopped";// stopped, expanding, paused
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
        }
    });
};
Linda.Feedback.prototype.constructor = Linda.Feedback;
Linda.Feedback.prototype.setRadius = function(radius) {
    this.radius = radius;
    this.element.style.width = this.element.style.height = radius * 2 + "vmin";
};

Linda.Feedback.Microphone = function(element, container) {
    this.requestID = null;
    this.lastTimestamp = null;
    Linda.Feedback.call(this, element, container);
};
Linda.Feedback.Microphone.prototype = Object.create(Linda.Feedback.prototype);
Linda.Feedback.Microphone.prototype.rewind = function() {
    this.lastTimestamp = null;
    this.setRadius(0);
    return this;
};
Linda.Feedback.Microphone.prototype.start = function() {
    var self = this;
    this.state = "expanding";
    this.container.classList.remove("paused");
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
Linda.Feedback.Microphone.prototype.pause = function() {
    this.stop();
    this.state = "paused";
    this.container.classList.add("paused");
    return this;
};
Linda.Feedback.Microphone.prototype.stop = function() {
    cancelAnimationFrame(this.requestID);
    this.lastTimestamp = null;
    this.state = "stopped";
    return this;
};
