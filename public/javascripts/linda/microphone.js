Linda.Microphone = function(navigator, options) {
    options = options || {};
    this.init(options);
    this.navigator = navigator;
    this.whisperRange = options.whisperRange || {lower: 200, upper: 255};
    this.listener = Linda.Microphone.createListener(this);
    this.initAudioContext(options.decibelsRange);
    this.getUserMedia();
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
        scope.dispatchInput(max, timestamp);
        scope.requestID = requestAnimationFrame(arguments.callee);
    };
};
Linda.Microphone.createStreamHandler = function(analyser) {
    return function(stream) {
        analyser.context
            .createMediaStreamSource(stream)
            .connect(analyser);
    };
};
Linda.Microphone.prototype = Object.create(Linda.Input.prototype);
Linda.Microphone.prototype.dispatchInput = function(max, timestamp) {
    if (max.vol <= this.whisperRange.lower) {
        this.stop(timestamp);
        var realtimeState = "too quiet";
    } else if (this.whisperRange.lower < max.vol && max.vol < this.whisperRange.upper) {
        this.start(timestamp);
        var realtimeState = "whispering(" + max.freq + " Hz, " + max.vol + ")";
    } else {
        this.stop(timestamp);
        var realtimeState = "too loud";
    }
    this.log(realtimeState);
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
    this.requestID = requestAnimationFrame(this.listener);
};
Linda.Microphone.prototype.stopListening = function() {
    cancelAnimationFrame(this.requestID);
};
Linda.Microphone.prototype.getUserMedia = function() {
    this.navigator.getUserMedia(
        {audio: true},
        Linda.Microphone.createStreamHandler(this.analyser),
        this.handleStreamError
    );
};
Linda.Microphone.prototype.log = function(message) {
    console.log(message);
};
