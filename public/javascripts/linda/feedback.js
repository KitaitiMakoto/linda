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
Linda.Feedback.Microphone.SPEED = 10;// vmin/s
Linda.Feedback.Microphone.prototype = Object.create(Linda.Feedback.prototype);
Linda.Feedback.Microphone.prototype.constructor = Linda.Feedback.Microphone;
Linda.Feedback.Microphone.prototype.start = function() {
    if (this.requestID) {
        return;
    }
    var scope = this;
    this.requestID = requestAnimationFrame(function(timestamp) {
        if (! scope.startedAt) {
            scope.startedAt = timestamp;
        }
        scope.setRadius(Linda.Feedback.Microphone.SPEED * (timestamp - scope.startedAt) / 1000);
        scope.requestID = requestAnimationFrame(arguments.callee);
    });
};
Linda.Feedback.Microphone.prototype.stop = function() {
    cancelAnimationFrame(this.requestID);
    this.startedAt = null;
    this.requestID = null;
}
