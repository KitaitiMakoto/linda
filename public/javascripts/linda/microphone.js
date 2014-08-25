Linda.Microphone = function(navigator, options) {
    options = options || {};
    this.init(options);
    this.navigator = navigator;
    this.whisperRange = options.whisperRange || {lower: 200, upper: 255};
    this.realtime = null;
    this.listener = Linda.Microphone.createListener(this);
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    var decibelsRange = options.decibelsRange || {min: -100, max: -50};
    this.analyser.maxDecibels = decibelsRange.max;
    this.analyser.minDecibels = decibelsRange.min;
    this.fsDivN = this.audioContext.sampleRate / this.analyser.fftSize;
    this.getUserMedia();
};
Linda.Microphone.createListener = function(scope) {
    return function(timestamp) {
        var freqDomain = new Uint8Array(scope.analyser.frequencyBinCount);
        scope.analyser.getByteFrequencyData(freqDomain);
        var max = {vol: 0, freq: 0};
        for (var i = 0, l = freqDomain.length; i < l; i++) {
            var value = freqDomain[i];
            var frequency = i * scope.fsDivN;

            if (frequency < 100 || 20000 < frequency) {
                continue;
            }
            if (max.vol < value) {
                max.vol = value;
                max.freq = frequency;
            }
        }
        scope.dispatchInput(max, timestamp);
        scope.log(scope.realtime);
        scope.requestID = requestAnimationFrame(arguments.callee);
    };
};
Linda.Microphone.createStreamHandler = function(scope) {
    return function(stream) {
        var input = scope.audioContext.createMediaStreamSource(stream);
        input.connect(scope.analyser);
    };
};
Linda.Microphone.prototype = Object.create(Linda.Input.prototype);
Linda.Microphone.prototype.dispatchInput = function(max, timestamp) {
    if (max.vol <= this.whisperRange.lower) {
        this.stop(timestamp);
        this.realtime = "too quiet";
    } else if (this.whisperRange.lower < max.vol && max.vol < this.whisperRange.upper) {
        this.start(timestamp);
        this.realtime = "whispering(" + max.freq + " Hz, " + max.vol + ")";
    } else {
        this.stop(timestamp);
        this.realtime = "too loud";
    }
};
Linda.Microphone.prototype.handleStreamError = function(error) {
    alert(error);
};
Linda.Microphone.prototype.startListening = function() {
    this.requestID = requestAnimationFrame(this.listener);
};
Linda.Microphone.prototype.stopListening = function() {
    cancelAnimationFrame(this.requestID);
};
Linda.Microphone.prototype.getUserMedia = function() {
    this.navigator.getUserMedia(
        {audio: true},
        Linda.Microphone.createStreamHandler(this),
        this.handleStreamError
    );
};
Linda.Microphone.prototype.log = function(message) {
    console.log(message);
};
