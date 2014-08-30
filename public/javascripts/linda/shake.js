Linda.Shake = function(options) {
    this.init(options);
    this.listener = Linda.Shake.createListener(this);
};
Linda.Shake.createListener = function(scope) {
    return function(event) {
        scope.startInputting(event.timeStamp);
        scope.stopInputting(event.timeStamp);
        setTimeout(function() {
            scope.stopInputting(new Date);
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
