Linda.Microphone = function(options) {
    options = options || {};
    this.init(options);
    this.whisperRange = options.whisperRange || {lower: 200, upper: 255};
    this.realtime = null;
};
Linda.Microphone.prototype = Object.create(Linda.Input.prototype);
Linda.Microphone.prototype.updateRealtime = function(max, timestamp) {
    if (max.vol <= thresholds.min) {
        this.stop(timestamp);
        this.realtime = "too quiet";
    } else if (thresholds.min < max.vol && max.vol < thresholds.max) {
        this.start(timestamp);
        this.realtime = "whispering(" + max.freq + " Hz, " + max.vol + ")";
    } else {
        this.stop(timestamp);
        this.realtime = "too loud";
    }
    log(this.realtime);
};
