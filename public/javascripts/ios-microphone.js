navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

var mic = document.getElementById("microphone");
mic.addEventListener("change", function(event) {
    var fileList = event.target.files;
    var audioFile = null;
    for (var i = 0; i < fileList.length; i++) {
        var file = fileList[i];
        if (file.type.indexOf("audio/") === 0) {
            audioFile = file;
            break;
        }
    }
    if (! audioFile) {
        return;
    }
    var reader = new FileReader();
    reader.addEventListener("load", function(event) {
        var audioContext = new AudioContext();
        audioContext.decodeAudioData(

            event.target.result,

            function(buffer) {
                alert("OK");
            },

            function(error) {
                alert(error);
            }

        );
    });

    reader.readAsArrayBuffer(audioFile);
});
