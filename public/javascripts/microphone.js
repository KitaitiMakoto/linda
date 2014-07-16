navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

if (navigator.getUserMedia) {

    var recorder;

    navigator.getUserMedia(

	{ audio: true },

	function(stream) {

	    var audioContext = new AudioContext();
	    var mediaStreamSource = audioContext.createMeidaStreamSource(stream);
	    var filter = audioContext.createBiquadFilter();

	    mediaStreamSource.connect(filter);
	    filter.type = 'lowpass';
	    filter.frequency.value = 1000;
	    var delay = audioContext.createDelay(1.0);
	    filter.connect(delay);
	    delay.connect(audioContext.destination);

	},

	function(error) {

	    alert(error);

	}

    );

}
