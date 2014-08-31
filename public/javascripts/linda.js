navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

Linda = function(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.stage = new Stage(canvas);
};
Linda.init = function(canvas, shapeOptions, inputOptions) {
    var app = new Linda(canvas);
    shapeOptions = shapeOptions || {};
    if (! ("x" in shapeOptions)) {
        shapeOptions.x = canvas.width / 2;
    }
    if (! ("y" in shapeOptions)) {
        shapeOptions.y = canvas.height / 2;
    }
    return Promise.all([app.initImage(), app.initInput(inputOptions)])
        .then(function(results) {
            var shapeConstructor = [Linda.SpiralCircle, Linda.SpiralSquare][Math.floor(Math.random() * 2)];
            app.shape = Linda.Spiral.createShape(results[0], shapeOptions);
            app.stage.addChild(app.shape.shape);
            app.input = results[1];
            return app;
        });
};
Linda.prototype.run = function() {
    var rotation = 24 * Math.PI;
    var duration = 6000;
    var app = this;
    addEventListener("linda.inputend", function() {
        app.input.stopListening();
        app.shape
            .animate(rotation, duration)
            .then(function(shape) {
                shape.clear();
                app.input.startListening();
            });
    });
    Ticker.addEventListener("tick", this.stage);
    this.input.startListening();
};
Linda.prototype.initImage = function() {
    return new Promise(function(resolve, reject) {
        var uris = JSON.parse(document.getElementById("image-uris").textContent);
        if (! uris) {
            return reject(new Error("image-uris not found"));
        }
        var uri = uris[Math.floor(Math.random() * uris.length)];
        var image = new Image();
        image.addEventListener("load", function(event) {
            resolve(event.target);
        });
        image.addEventListener("error", function(event) {
            reject(new Error(event.srcElement.src + " not found"));
        });
        image.addEventListener("abort", function(event) {
            reject(new Error("request for " + event.srcElement.src + " aborted"));
        });
        image.src = uri;
    });
};
Linda.prototype.initInput = function(options) {
    return new Promise(function(resolve, reject) {
        if (Linda.Microphone.available()) {
            var input = new Linda.Microphone(navigator, options);
        } else {
            var input = new Linda.Shake();
        }
        addEventListener("linda.inputready", function() {
            resolve(input);
        });
    });
};

// Obsolete
Linda.initializeStage = function(canvasElem, translate) {
    if (arguments.length < 2) {
        translate = true;
    }
    canvasElem.width = window.innerWidth;
    canvasElem.height = window.innerHeight;
    var stage = new Stage(canvasElem);
    if (translate) {
        stage.getMatrix()
            .translate(canvasElem.width / 2, canvasElem.height / 2)
            .decompose(stage);
    }
    return stage;
};
