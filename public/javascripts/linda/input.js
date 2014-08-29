/**
 * Events
 *   * "linda.inputstart"
 *   * "linda.inputend"
 */
Linda.Input = function(options) {
    this.init(options);
};
Linda.Input.prototype.init = function(options) {
    options = options || {};
    this.startedAt = null;
    this.pausedAt = null;
    this.stoppedAt = null;
    this.state = "not inputting";
    this.pauseThreshold = options.pauseThreshold || 2000;
};
Linda.Input.prototype.start = function(timestamp) {
    this.pausedAt = null;
    this.stoppedAt = null;
    if (this.state === "not inputting") {
        this.startedAt = timestamp;
        this.state = "inputting";
        this.fire("inputstart");
    }
};
Linda.Input.prototype.stop = function(timestamp) {
    this.state = "not inputting";
    if (! this.pausedAt) {
        this.pausedAt = timestamp;
    } else if (! this.stoppedAt && timestamp - this.pausedAt > this.pauseThreshold) {
        this.stoppedAt = timestamp;
        this.fire("inputend");
    }
};
Linda.Input.prototype.fire = function(type) {
    window.dispatchEvent(new CustomEvent("linda." + type), {detail: {input: this}});
};
