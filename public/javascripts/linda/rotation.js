/**
 * Events
 *   * "linda.inputstart"(inhereted from Linda.Input)
 *   * "linda.inputend"(inhereted from Linda.Input)
 *   * "linda.inputready"
 */
Linda.Rotation = function(options) {
    this.init(options);
    this.listener = Linda.Rotation.createListener(this);
    this.fire("inputready");
};
Linda.Rotation.createListener = function(scope) {
    return function(event) {
        var rotationRate = Math.abs(event.rotationRate.gamma);
        if (rotationRate > 6) {
            scope.startInputting(event.timeStamp);
            scope.stopInputting(event.timeStamp);
            setTimeout(function() {
                scope.stopInputting(new Date);
            }, scope.pauseThreshold);
        }
    };
};
Linda.Rotation.prototype = Object.create(Linda.Input.prototype);
Linda.Rotation.prototype.startListening = function() {
    this.fire("listeningstart");
    window.addEventListener("devicemotion", this.listener);
};
Linda.Rotation.prototype.stopListening = function() {
    window.removeEventListener("devicemotion", this.listener);
};
