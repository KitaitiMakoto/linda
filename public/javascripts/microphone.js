navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

if (navigator.getUserMedia) {

    navigator.getUserMedia(

        { audio: true },

        function(stream) {

            var audioContext = new AudioContext();
            var mediaStreamSource = audioContext.createMediaStreamSource(stream);
            var filter = audioContext.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 1000;

            analyser = audioContext.createAnalyser();
            analyser.fftSize = 1024;
            analyser.smoothingTimeContent = 0.9;

            mediaStreamSource.connect(filter);
            filter.connect(analyser);

            var freqContext = document.getElementById("frequency").getContext("2d");
            var tdContext = document.getElementById("timedomain").getContext("2d");
            var data = new Uint8Array(256);
            window.setInterval(function() {

                analyser.getByteFrequencyData(data);

                freqContext.fillStyle = "#ffffff";
                freqContext.fillRect(0, 0, 256, 256);
                for (var i = 0; i < 256; i++) {
                    freqContext.fillStyle = "#000000";
                    freqContext.fillRect(i, 256 - data[i], 1, data[i]);
                }

                analyser.getByteTimeDomainData(data);
                tdContext.fillStyle = "#ffffff";
                tdContext.fillRect(0, 0, 256, 256);
                for (var i = 0; i < 256; i++) {
                    tdContext.fillStyle = "#000000";
                    tdContext.fillRect(i, 256 - data[i], 1, data[i]);
                }

            }, 100);

        },

        function(error) {

            alert(error);

        }

    );

}
