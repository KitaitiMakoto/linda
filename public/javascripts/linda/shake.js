/**
 * Events
 *   * "linda.inputstart"(inhereted from Linda.Input)
 *   * "linda.inputend"(inhereted from Linda.Input)
 *   * "linda.inputready"
 */
Linda.Shake = function(options) {
    this.init(options);
    this.listener = Linda.Shake.createListener(this);
    var scope = this;
    setTimeout(function() {
	scope.fire("inputready");
    });
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
