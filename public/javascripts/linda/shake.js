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
    this.fire("listeningstart");
    window.addEventListener("shake", this.listener);
};
Linda.Shake.prototype.stopListening = function() {
    window.removeEventListener("shake", this.listener);
};


console.warn("FIXME");
addEventListener("DOMContentLoaded", function() {
    var shakeCount = 0;
    var shakeGauge = document.querySelector("#shake-feedback p");
    var renderShakeGauge = function() {
        shakeGauge.style.height = (shakeCount / 12) * 100 + "%";
        shakeGauge.textContent = shakeCount === 0 ? "" : shakeCount + "回";
    };
    addEventListener("shake", function() {
        shakeCount++;
        renderShakeGauge();
    });
    addEventListener("linda.listeningstart", function() {
        shakeCount = 0;
        renderShakeGauge();
    });
});
