navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

canvas = undefined;
stage = undefined;
origin = undefined;
PrototypeCircle = function(image) {
    this.shape = new Shape();
    this.image = image;
};
PrototypeCircle.prototype.draw = function(radius) {
    this.shape.graphics
        .clear()
        .beginBitmapStroke(this.image)
        .setStrokeStyle(50)
        .drawCircle(origin.x, origin.y, radius)
        .endStroke();
};
PrototypeCircle.prototype.tweenTo = function(props, number, duration) {
    duration = duration || 2000;
    var shape = this;
    var startedAt = null;
    var requestID = null;
    var render = function(timestamp) {
        if (startedAt === null) {
            startedAt = timestamp;
        }
        var progress = timestamp - startedAt;
        var radius = props.radius * (progress / duration);
        //shape.draw(radius);

        var graphics = shape.shape.graphics.clear();
        for (var i = 0; i < number; i++) {
            var r = radius - i * 120;
            if (r < 0) {
                continue;
            }
            graphics
                .beginBitmapStroke(shape.image)
                .setStrokeStyle(50)
                .drawCircle(origin.x, origin.y, r)
                .endStroke();
        }

        if (progress > duration) {
            cancelAnimationFrame(requestID);
            shape = null;
            startedAt = null;
            requestID = null;
            render = null;
            window.dispatchEvent(new CustomEvent("linda.animationend"));
        } else {
            requestID = requestAnimationFrame(arguments.callee);
        }
    };
    requestID = requestAnimationFrame(render);
};

function initControls() {
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

    window.addEventListener("linda.inputstart", function(event) {
        statusContainer.innerHTML = "whisper starts";
    });
    window.addEventListener("linda.inputend", function(event) {
        statusContainer.innerHTML = "whisper ends("+(whisper.stoppedAt - whisper.startedAt)+" ms)";
    });
    whisper.log = function(text) {
        realtimeLog.innerHTML = text;
    }
}

function initStage() {
    canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stage = new Stage(canvas);
    origin = {x: canvas.width / 2, y: canvas.height / 2};

    Ticker.on("tick", stage);
}

whisper = new Linda.Microphone(window.navigator);
initStage();
initControls();
window.addEventListener("linda.inputready", function() {
    var imageUri = "images/bg_sea01.jpg";

    var queue = new LoadQueue(false);
    queue.on("fileload", function(event) {
	var image = event.result
        window.addEventListener("linda.inputstart", function(event) {
            var circle = new PrototypeCircle(image);
            stage.addChild(circle.shape);
            circle.tweenTo({radius: canvas.width * 2}, 1, 6000);
        });
        whisper.startListening();
    });

    queue.loadFile(imageUri);
});