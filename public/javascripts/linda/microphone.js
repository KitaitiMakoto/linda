Linda.Microphone = function(options) {
    options = options || {};
    this.init(options);
    this.decibelsRange = options.decibelsRange || {min: -100, max: -50};
    this.whisperRange = options.whisperRange || {lower: 200, upper: 255};
    this.realtime = null;
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
Linda.Microphone.prototype.startListening = function(navigator) {
    var self = this;
    navigator.getUserMedia(
        {audio: true},
        function(stream) {
            var con = new AudioContext();
            var input = con.createMediaStreamSource(stream);
            var analyser = con.createAnalyser();
            analyser.maxDecibels = self.decibelsRange.max;
            analyser.minDecibels = self.decibelsRange.min;
            input.connect(analyser);

            var fsDivN = con.sampleRate / analyser.fftSize;
            var requestID = requestAnimationFrame(function(timestamp) {
                var freqDomain = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(freqDomain);
                var max = {vol: 0, freq: 0};
                for (var i = 0, l = freqDomain.length; i < l; i++) {
                    var value = freqDomain[i];
                    var frequency = i * fsDivN;

                    if (frequency < 100 || 20000 < frequency) {
                        continue;
                    }
                    if (max.vol < value) {
                        max.vol = value;
                        max.freq = frequency;
                    }
                }
                self.dispatchInput(max, timestamp);
                self.log(self.realtime);
                requestID = requestAnimationFrame(arguments.callee);
            });
        },
        function(error) {
            alert(error);
        }
    );
};
Linda.Microphone.prototype.log = function(message) {
    console.log(message);
};
