Linda.Feedback = function(element) {
    this.element = element;
    this.radius = 0;
    this.startedAt = null;
    var self = this;
    addEventListener("linda.listeningstart", function() {
        self.start();
    });
    addEventListener("linda.inputend", function() {
        self.stop();
    });
};
Linda.Feedback.prototype.constructor = Linda.Feedback;
Linda.Feedback.prototype.setRadius = function(radius) {
    this.radius = radius;
    this.element.style.width = this.element.style.height = radius * 2 + "vmin";
};

Linda.Feedback.Microphone = function(element) {
    this.requestID = null;
    Linda.Feedback.call(this, element);
};
Linda.Feedback.Microphone.SPEED = 6;// vmin/s
Linda.Feedback.Microphone.prototype = Object.create(Linda.Feedback.prototype);
Linda.Feedback.Microphone.prototype.constructor = Linda.Feedback.Microphone;
Linda.Feedback.Microphone.prototype.start = function() {
    if (this.requestID) {
        return;
    }
    this.radius = 0;
    this.restart();
};
Linda.Feedback.Microphone.prototype.restart = function() {
    var scope = this;
    var lastTimestamp;
    this.requestID = requestAnimationFrame(function(timestamp) {
        if (! lastTimestamp) {
            lastTimestamp = timestamp;
        }
        var radius = scope.radius;
        var diff = Linda.Feedback.Microphone.SPEED * (timestamp - lastTimestamp) / 1000;
        scope.setRadius(radius + diff);
        lastTimestamp = timestamp;
        scope.requestID = requestAnimationFrame(arguments.callee);
    });
};
Linda.Feedback.Microphone.prototype.stop = function() {
    cancelAnimationFrame(this.requestID);
    this.requestID = null;
}
