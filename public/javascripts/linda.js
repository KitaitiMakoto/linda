navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

Linda = function(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.stage = new Stage(canvas);
};
Linda.init = function(canvas, animationOptions, inputOptions) {
    var app = new Linda(canvas);
    animationOptions = animationOptions || {};
    if (! ("x" in animationOptions)) {
        animationOptions.x = canvas.width / 2;
    }
    if (! ("y" in animationOptions)) {
        animationOptions.y = canvas.height / 2;
    }
    return Promise.all([app.initImages(), app.initInput(inputOptions)])
        .then(function(results) {
            app.shape = new Linda.Animation(results[0], animationOptions);
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
    app.input.startListening();
};
Linda.prototype.initImages = function() {
    var uris = JSON.parse(document.getElementById("image-uris").textContent);
    return Promise.all(uris.map(function(uri) {
        return new Promise(function(resolve, reject) {
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
    }));
};
Linda.prototype.initInput = function(options) {
    return new Promise(function(resolve, reject) {
        addEventListener("linda.inputready", function(event) {
            resolve(event.detail.input);
        });
        if (Linda.Microphone.available()) {
            new Linda.Microphone(navigator, options);
        } else {
            new Linda.Shake(options);
        }
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
