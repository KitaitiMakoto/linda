Linda.Feedback = function(element) {
    this.element = element;
    this.radius = 0;
    this.paunsed = false;
    var self = this;
    addEventListener("linda.listeningstart", function() {
        if (self.paused) {
            self.paused = false;
        } else {
            self.rewind();
        }
        self.start();
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

Linda.Feedback.Microphone = function(element) {
    this.requestID = null;
    this.lastTimestamp = null;
    Linda.Feedback.call(this, element);
};
Linda.Feedback.Microphone.prototype = Object.create(Linda.Feedback.prototype);
Linda.Feedback.Microphone.prototype.rewind = function() {
    this.lastTimestamp = null;
    this.setRadius(0);
    return this;
};
Linda.Feedback.Microphone.prototype.start = function() {
    var self = this;
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
    this.paused = true;
    this.stop();
    return this;
};
Linda.Feedback.Microphone.prototype.stop = function() {
    cancelAnimationFrame(this.requestID);
    this.lastTimestamp = null;
    return this;
};
