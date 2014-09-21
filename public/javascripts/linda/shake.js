/**
 * Events
 *   * "linda.inputstart"(inhereted from Linda.Input)
 *   * "linda.inputend"(inhereted from Linda.Input)
 *   * "linda.inputready"
 */
Linda.Shake = function(options) {
    options = options || {};
    this.init(options);
    this.accelerationThreshold = options.accelerationThreshold || 20;
    this.listener = Linda.Shake.createListener(this);
    this.lastAcceleration = {x: 0, y: 0, z: 0};
    var scope = this;
    setTimeout(function() {
        scope.fire("inputready");
    });
};
Linda.Shake.createListener = function(scope) {
    return function(event) {
        var acc = event.accelerationIncludingGravity;
        var diff;
        var maxDiff = ["x", "y", "z"].reduce(function(prev, prop) {
            diff = Math.abs(acc[prop] - scope.lastAcceleration[prop]);
            return Math.max(prev, diff);
        }, 0);
        scope.lastAcceleration = {x: acc.x, y: acc.y, z: acc.z};
        if (maxDiff < scope.accelerationThreshold) {
            return;
        }
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
    window.addEventListener("devicemotion", this.listener);
};
Linda.Shake.prototype.stopListening = function() {
    window.removeEventListener("devicemotion", this.listener);
};


console.warn("FIXME");
addEventListener("DOMContentLoaded", function() {
    var shakeCount = 0;
    var shakeGauge = document.querySelector("#shake-feedback p");
    var renderShakeGauge = function() {
        shakeGauge.style.height = (shakeCount / 12) * 100 + "%";
        shakeGauge.textContent = shakeCount === 0 ? "" : shakeCount + "回";
    };
    addEventListener("linda.inputsensingstart", function() {
        shakeCount++;
        renderShakeGauge();
    });
    addEventListener("linda.listeningstart", function() {
        shakeCount = 0;
        renderShakeGauge();
    });
});
