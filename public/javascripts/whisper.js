navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

var realtimeLog = document.getElementById("realtime-log");

var thresholds = {
    min: 200,
    max: 255,
    dur: 6000
};

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
            whisper.updateRealtime(max, timestamp);
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
    realtimeLog.innerHTML = text;
}

var statusContainer = document.getElementById("status");
var whisper = {
    startedAt: null,
    endedAt: null,
    realtime: null,
    status: "notWhispering",
    updateRealtime: function(max, timestamp) {
        if (max.vol <= thresholds.min) {
            this.endWhispering(timestamp);
            this.realtime = "too quiet";
        } else if (thresholds.min < max.vol && max.vol < thresholds.max) {
            this.realtime = "whispering(" + max.freq + " Hz, " + max.vol + ")";
            this.endedAt = null;
            if (this.status === "notWhispering") {
                this.startedAt = timestamp;
                this.status = "whispering"
                window.dispatchEvent(new CustomEvent("linda.inputstart"));
            }
        } else {
            this.endWhispering(timestamp);
            this.realtime = "too loud";
        }
        log(this.realtime);
    },
    endWhispering: function(timestamp) {
            if (! this.endedAt) {
                this.endedAt = timestamp;
            }
            if (timestamp - this.endedAt > thresholds.dur) {
                window.dispatchEvent(new CustomEvent("linda.inputend"));
                this.status = "notWhispering";
            }
    }
};
window.addEventListener("linda.inputstart", function(event) {
    statusContainer.innerHTML = "whisper starts";
});
window.addEventListener("linda.inputend", function(event) {
    statusContainer.innerHTML = "whisper ends("+(whisper.endedAt - whisper.startedAt)+" ms)";
});
