navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

canvas = document.getElementById("stage");
var WIDTH = canvas.width;
var HEIGHT = canvas.height;

navigator.getUserMedia(
    {audio: true},
    function(stream) {
        var acon = new AudioContext();
        var input = acon.createMediaStreamSource(stream);
        var analyser = acon.createAnalyser();
        analyser.maxDecibels = -80;
        analyser.minDecibels = -90;
        input.connect(analyser);

        var ccon = canvas.getContext("2d");

        var barWidth = WIDTH / analyser.frequencyBinCount;
        var requestID = null;
        var fsDivN = acon.sampleRate / analyser.fftSize;
        requestID = requestAnimationFrame(function(timestamp) {
            var freqDomain = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(freqDomain);
            ccon.clearRect(0, 0, WIDTH, HEIGHT);
            for (var i = 0; i < freqDomain.length; i++) {
                var value = freqDomain[i];
                var percent = value / 255;
                var height = HEIGHT * percent;
                var offset = HEIGHT - height;
                var hue = i / analyser.frequencyBinCount * 360;
                var frequency = i * fsDivN;
                if (frequency < 100 || 20000 < frequency) {
                    continue;
                }
                ccon.fillStyle = "hsl(" + hue + ",100%, 50%)";
                ccon.fillRect(i * barWidth, offset, barWidth, height);

                if (i % 12 === 0) {
                    ccon.fillText(frequency, i * barWidth, i);
                }
            }

            requestID = requestAnimationFrame(arguments.callee);
        });
    },
    function(error) {
        alert(error);
    }
);
