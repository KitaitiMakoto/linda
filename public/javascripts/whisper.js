navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

var logContainer = document.getElementById("status");

var thresholds = {min: 200, max: 255};

navigator.getUserMedia(
    {audio: true},
    function(stream) {
        var con = new AudioContext();
        var input = con.createMediaStreamSource(stream);
        var analyser = con.createAnalyser();
        analyser.maxDecibels = -50;
        analyser.minDecibels = -100;
        input.connect(analyser);

        var fsDivN = con.sampleRate / analyser.fftSize;
        var startedAt = null;
        var requestID = requestAnimationFrame(function(timestamp) {
            if (! startedAt) {
                startedAt = timestamp;
            }
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
            if (max.vol <= thresholds.min) {
                log("too quiet");
            } else if (thresholds.min < max.vol && max.vol < thresholds.max) {
                log("whispering("+max.freq+" Hz, "+max.vol+")");
            } else {
                log("too loud");
            }
            requestID = requestAnimationFrame(arguments.callee);
        });
    },
    function(error) {
        alert(error);
    }
);

var min = document.getElementById("min");
var minValue = document.getElementById("min-value");
var max = document.getElementById("max");
var maxValue = document.getElementById("max-value");
min.addEventListener("change", function(event) {
    var value = Math.min(event.target.value, maxValue.value);
    thresholds.min = min.value = minValue.value = value;
});
max.addEventListener("change", function(event) {
    var value = Math.max(event.target.value, minValue.value);
    thresholds.max = max.value = maxValue.value = value;
});

function log(text) {
    logContainer.innerHTML = text;
}
