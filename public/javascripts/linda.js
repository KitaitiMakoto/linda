Linda = function(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.stage = new Stage(canvas);
    var self = this;
    Object.keys(Linda.transition).forEach(function(eventName) {
        addEventListener("linda." + eventName, function() {
            self.state.set(Linda.transition[eventName]);
        });
    });
};
Linda.transition = {
    "inputready":        "waiting",
    "listeningstart":    "listening",
    "inputstart":        "inputting",
    "inputend":          "animating",
    "inputsensingstart": "active",
    "inputsensingstop":  "inactive"
};
Linda.init = function(canvas, animationOptions, inputOptions) {
    location.hash = "application";
    var app = new Linda(canvas);
    app.state = app.initState();
    app.initMenu();
    animationOptions = animationOptions || {};
    if (! ("x" in animationOptions)) {
        animationOptions.x = canvas.width / 2;
    }
    if (! ("y" in animationOptions)) {
        animationOptions.y = canvas.height / 2;
    }
    return Promise.all([app.initImages(), app.initInput(inputOptions)])
        .then(function(results) {
            app.animation = new Linda.Animation(animationOptions);
            app.stage.addChild(app.animation.shape);
            var levels = Object.keys(app.animation.images);
            results[0].forEach(function(images, index) {
                images.forEach(function(image) {
                    app.animation.addImage(image.src, levels[index]);
                });
            });
            app.input = results[1];
            var feedbackCircle = document.querySelector("#clip"); // TODO: should not specify selector here
            var feedbackConstructor = app.input.constructor === Linda.Microphone ? "Microphone" : "Shake";
            app.input.feedback = new Linda.Feedback[feedbackConstructor](feedbackCircle, document.getElementById("input-information"));
            return app;
        });
};
Linda.prototype.run = function() {
    var rotation = 24 * Math.PI;
    var duration = 6000;
    var app = this;
    addEventListener("linda.inputend", function(event) {
        var radius = event.detail.input.feedback.radius
        var level;
        if (radius < 25) {
            level = "low";
        } else if (radius < 34.375) {
            level = "mid";
        } else {
            level = "high";
        }
        app.input.stopListening();
        app.animation
            .animate(level)
            .then(function(animation) {
                animation.clear();
                app.input.startListening();
            });
    });
    Ticker.addEventListener("tick", this.stage);
    app.input.startListening();
};
Linda.prototype.initImages = function() {
    var uriMap = JSON.parse(document.getElementById("image-uris").textContent);
    var scope = this;
    return Promise.all(Object.keys(uriMap).map(function(level) {
        var uris = uriMap[level];
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
Linda.prototype.initState = function() {
    var state = new Linda.State();
    new Linda.State.View(document.getElementById("guide"), state);
    return state;
};
Linda.prototype.initMenu = function() {
    var link = document.querySelector("#application a");
    var self = this;
    addEventListener("hashchange", function(event) {
        if (location.hash === "#menu") {
            self.input.stopListening();
        }
        if (location.hash === "#application") {
            if (! self.input) {
                return;
            }
            self.input.pausedAt = null;
            self.input.startListening();
        }
    });
    this.state.observers.push(function(state, oldState) {
        if (state === "animating") {
            link.classList.add("disabled");
        }
        if (state === "listening") {
            link.classList.remove("disabled");
        }
    });
    var menu = document.getElementById("menu");
    var additionalImage = menu.querySelector("input");
    additionalImage.addEventListener("click", function(event) {
        alert("追加した画像はサーバーにはアップロードされません");
        additionalImage.removeEventListener("click", arguments.callee);
    });
    additionalImage.addEventListener("change", function(event) {
        var file = event.target.files[0]; // SPECIFICATION: Only one file is acceptable
        self.animation.loadImage(file)
            .then(function() {
                self.animation.useLastImage = true;
                location.hash = "#application";
            });
        additionalImage.value = null;
    });
};
Linda.prototype.showInput = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
        var inputId;
        switch(self.input.constructor) {
        case Linda.Microphone:
            inputId = "microphone";
            break;
        case Linda.Shake:
            inputId = "shake";
            break;
        default:
            reject(new Error("Unknown input"));
            return;
        }
        var p = document.getElementById(inputId);
        new Linda.State.View(p, self.state);
        p.hidden = false;
        var listener = function(event) {
            var target = event.target;
            resolve(self);
            target.removeEventListener("transitionend", listener);
            target.removeEventListener("webkitTransitionEnd", listener);
        };
        ["transitionend", "webkitTransitionEnd"].forEach(function(eventName) {
            p.addEventListener(eventName, listener);
        });
        setTimeout(function() {
            p.setAttribute("class", "completed");
        }, 2000);
    }).then(function(app) {
        return app;
    });
};
Linda.prototype.adaptImage = function(image) {
    var stageCanvas = this.stage.canvas;
    return Linda.adaptImage(image, stageCanvas.width, stageCanvas.height);
};
Linda.adaptImage = function(image, width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var workspace = new Stage(canvas);
    var bitmap = new Bitmap(image);
    var aspectRatio = width / height;
    var imageAspectRatio = image.width / image.height;
    if (imageAspectRatio < aspectRatio) {
        var scale = width / image.width;
    } else {
        var scale = height / image.height;
    }
    bitmap.scaleX = bitmap.scaleY = scale;
    bitmap.x = (canvas.width - bitmap.scaleX * image.width) / 2;
    bitmap.y = (canvas.height - bitmap.scaleY * image.height) / 2;
    workspace.addChild(bitmap);
    workspace.update();
    var adaptedImage = new Image();
    adaptedImage.src = canvas.toDataURL();
    return adaptedImage;
};
