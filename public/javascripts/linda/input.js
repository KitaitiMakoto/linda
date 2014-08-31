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
    this.inputting = false;
    this.pauseThreshold = options.pauseThreshold || 2000;
};
Linda.Input.prototype.startInputting = function(timestamp) {
    this.pausedAt = null;
    this.stoppedAt = null;
    if (! this.inputting) {
        this.startedAt = timestamp;
        this.inputting = true;
        this.fire("inputstart");
    }
};
Linda.Input.prototype.stopInputting = function(timestamp) {
    this.inputting = false;
    if (! this.pausedAt) {
        this.pausedAt = timestamp;
    } else if (! this.stoppedAt && timestamp - this.pausedAt > this.pauseThreshold) {
        this.stoppedAt = timestamp;
        this.fire("inputend");
    }
};
Linda.Input.prototype.fire = function(type) {
    window.dispatchEvent(new CustomEvent("linda." + type, {detail: {input: this}}));
};
