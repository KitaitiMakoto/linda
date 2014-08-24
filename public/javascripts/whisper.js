navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

var realtimeLog = document.getElementById("realtime-log");

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

var statusContainer = document.getElementById("status");
var whisper = new Linda.Microphone();
whisper.log = function(text) {
    realtimeLog.innerHTML = text;
}
whisper.startListening(navigator);
window.addEventListener("linda.inputstart", function(event) {
    statusContainer.innerHTML = "whisper starts";
});
window.addEventListener("linda.inputend", function(event) {
    statusContainer.innerHTML = "whisper ends("+(whisper.stoppedAt - whisper.startedAt)+" ms)";
});
