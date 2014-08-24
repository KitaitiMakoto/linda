navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

var realtimeLog = document.getElementById("realtime-log");

navigator.getUserMedia(
    {audio: true},
    function(stream) {
        var con = new AudioContext();
        var input = con.createMediaStreamSource(stream);
        var analyser = con.createAnalyser();
        analyser.maxDecibels = whisper.decibelsRange.max;
        analyser.minDecibels = whisper.decibelsRange.min;
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
            whisper.dispatchInput(max, timestamp);
            log(whisper.realtime);
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
    whisper.whisperRange.lower = min.value = minValue.value = value;
});
max.addEventListener("change", function(event) {
    var value = Math.max(event.target.value, minValue.value);
    whisper.whisperRange.upper = max.value = maxValue.value = value;
});

function log(text) {
    realtimeLog.innerHTML = text;
}

var statusContainer = document.getElementById("status");
var whisper = new Linda.Microphone();
window.addEventListener("linda.inputstart", function(event) {
    statusContainer.innerHTML = "whisper starts";
});
window.addEventListener("linda.inputend", function(event) {
    statusContainer.innerHTML = "whisper ends("+(whisper.stoppedAt - whisper.startedAt)+" ms)";
});
