Linda.Shake = function(options) {
    this.init(options);
    this.active = false;
    this.listener = Linda.Shake.createListener(this);
};
Linda.Shake.createListener = function(scope) {
    return function(event) {
        scope.active = true;
        scope.start(event.timeStamp);
        scope.stop(event.timeStamp);
        setTimeout(function() {
            scope.stop(new Date);
        }, scope.pauseThreshold);
    };
};
Linda.Shake.prototype = Object.create(Linda.Input.prototype);
Linda.Shake.prototype.startListening = function() {
    window.addEventListener("shake", this.listener);
};
Linda.Shake.prototype.stopListening = function() {
    window.removeEventListener("shake", this.listener);
};
