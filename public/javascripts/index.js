(new Promise(function(resolve, reject) {
    if (document.readyState !== "loading") {
        resolve();
    } else {
        document.addEventListener("DOMContentLoaded", function() {
            resolve();
            document.removeEventListener("DOMContentLoaded", arguments.callee);
        });
    }
})).then(function() {
    return new Promise(function(resolve, reject) {
        if (/chrome|safari/i.test(navigator.userAgent)) {
            resolve();
        } else {
            reject(new Error("サポートしていないブラウザーです。Google ChromeまたはSafariをお使いください。"));
        }
    });
}).then(function() {
    if (/input=shake/.test(location.search)) {
        Linda.Microphone.available = function() {return false};
    }
    return Promise.all([
	Linda.init(
            document.getElementById("stage"),
            {},
            {controls: document.getElementById("microphone-controls")}
        ),
	Linda.Splash.run()
    ]);
}).then(function(appAndSplash) {
    var app = appAndSplash[0];
    var promise = new Promise(function(resolve, reject) {
        var listener = function(event) {
            ["transitionend", "webkitTransitionEnd"].forEach(function(eventName) {
                event.target.removeEventListener(eventName, listener);
                resolve(app);
            });
            delete listener;
        };
        ["transitionend", "webkitTransitionEnd"].forEach(function(eventName) {
            app.stage.canvas.addEventListener(eventName, listener);
        });
    });
    document.querySelector("body").classList.remove("uninitialized");
    return promise;
}).then(function(app) {
    app.run();
    return app;
}).then(function(app) {
    if (location.search.indexOf("env=development") === -1) {
        return app;
    }
    var images = document.getElementById("images");
    var imageList = images.querySelector("ul");
    app.animation.images.forEach(function(image, index) {
        var li = document.createElement("li");
        var label = document.createElement("label");
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "image";
        radio.value = index;
        radio.checked = index === 0;
        label.appendChild(radio);
        var text = document.createTextNode(image.src);
        label.appendChild(text);
        li.appendChild(label);
        imageList.appendChild(li);
    });
    var input = images.querySelector("input");
    input.addEventListener("change", function(event) {
        [].forEach.call(event.target.files, function(file) {
            var reader = new FileReader();
            reader.addEventListener("load", function(e) {
                var image = new Image();
                image.src = e.target.result;
                app.animation.images.push(image);
                var li = document.createElement("li");
                var label = document.createElement("label");
                var radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "image";
                radio.value = app.animation.images.length - 1;
                label.appendChild(radio);
                var text = document.createTextNode(file.name);
                label.appendChild(text);
                li.appendChild(label);
                imageList.appendChild(li);
                input.value = null;
            });
            reader.readAsDataURL(file);
        });
    });

    var animation = document.getElementById("animation");
    var patterns = animation.querySelector("ul");
    Object.keys(Linda).filter(function(prop) {
        return Linda.Animation.patterns.indexOf(Linda[prop]) !== -1;
    }).forEach(function(patternName) {
        var pattern = Linda[patternName];
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = patternName;
        button.addEventListener("click", function() {
            var rotation = 24 * Math.PI;
            var duration = 6000;
            app.animation.getDrawFunction = function() {
                return pattern.draw;
            }
            app.animation.getImage = function() {
                var radio = images.querySelector('input[name="image"]:checked');
                return app.animation.images[radio.value];
            }
            app.animation
                .animate(rotation + Math.random(), duration + Math.random() * 100)
                .then(function() {
                    app.animation.getDrawFunction = Linda.Animation.prototype.getDrawFunction;
                });
        });
        li.appendChild(button);
        patterns.appendChild(li);
    });

    document.getElementById("development").hidden = false;
}).catch(function(error) {
    console.error(error);
    alert(error);
});
