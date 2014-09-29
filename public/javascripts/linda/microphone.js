/**
 * Events
 *   * "linda.inputstart"(inhereted from Linda.Input)
 *   * "linda.inputend"(inhereted from Linda.Input)
 *   * "linda.inputready"
 */
Linda.Microphone = function(navigator, options) {
    options = options || {};
    this.init(options);
    this.navigator = navigator;
    this.whisperRange = options.whisperRange || {lower: 120, upper: 255};
    this.listener = Linda.Microphone.createListener(this);
    this.initAudioContext(options.decibelsRange);
    this.initInput();
};
Linda.Microphone.available = function() {
    return !!(navigator.getUserMedia && AudioContext);
};
Linda.Microphone.createListener = function(scope) {
    return function(timestamp) {
        scope.analyser.getByteFrequencyData(scope.freqDomain);
        var max = {vol: 0, freq: 0};
        for (var i = 0, l = scope.freqDomain.length; i < l; i++) {
            var value = scope.freqDomain[i];
            var frequency = i * scope.fsDivN;

            if (frequency < 100 || 20000 < frequency) {
                continue;
            }
            if (max.vol < value) {
                max.vol = value;
                max.freq = frequency;
            }
        }
        arguments.callee.requestID = requestAnimationFrame(arguments.callee);
        scope.dispatchInput(max, timestamp);
    };
};
Linda.Microphone.createStreamHandler = function(scope) {
    return function(stream) {
        scope.analyser.context
            .createMediaStreamSource(stream)
            .connect(scope.analyser);
        scope.fire("inputready");
    };
};
Linda.Microphone.prototype = Object.create(Linda.Input.prototype);
Linda.Microphone.prototype.constructor = Linda.Microphone;
Linda.Microphone.prototype.dispatchInput = function(max, timestamp) {
    if (max.vol <= this.whisperRange.lower) {
        this.stopInputting(timestamp, {vol: max.vol, freq: max.freq, state: "too quiet"});
    } else if (this.whisperRange.lower < max.vol && max.vol < this.whisperRange.upper) {
        this.startInputting(timestamp, {vol: max.vol, freq: max.freq, state: "whispering"});
    } else {
        this.stopInputting(timestamp, {vol: max.vol, freq: max.freq, state: "tool loud"});
    }
};
Linda.Microphone.prototype.initAudioContext = function(decibelsRange) {
    decibelsRange = decibelsRange || {min: -100, max: -50};
    var con = new AudioContext();
    var analyser = this.analyser = con.createAnalyser();
    analyser.maxDecibels = decibelsRange.max;
    analyser.minDecibels = decibelsRange.min;
    this.freqDomain = new Uint8Array(analyser.frequencyBinCount);
    this.fsDivN = con.sampleRate / analyser.fftSize;
};
Linda.Microphone.prototype.handleStreamError = function(error) {
    alert(error);
};
Linda.Microphone.prototype.startListening = function() {
    this.fire("listeningstart");
    this.listener.requestID = requestAnimationFrame(this.listener);
};
Linda.Microphone.prototype.stopListening = function() {
    cancelAnimationFrame(this.listener.requestID);
};
Linda.Microphone.prototype.initInput = function() {
    this.navigator.getUserMedia(
        {audio: true},
        Linda.Microphone.createStreamHandler(this),
        this.handleStreamError
    );
};
