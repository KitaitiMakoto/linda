Promise.delay = function(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, duration);
    });
};

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
        Linda.init(document.getElementById("stage")),
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
    }).then(function() {
	return app.showInput();
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
    var liTemplate = images.querySelector("template");
    var appendItem = function(image, callback) {
        var li = document.importNode(liTemplate.content, true);
        var img = li.querySelector("img");
        img.src = image.src
        img.style.height = "1em";
        var radio = li.querySelector("input");
        var label = li.querySelector("label");
        callback(li, label, radio);
        imageList.appendChild(li);
    };
    app.animation.images.forEach(function(image, index) {
        appendItem(image, function(li, label, radio) {
            radio.value = index;
            radio.checked = index === 0;
        });
    });
    var input = images.querySelector("input");
    input.addEventListener("change", function(event) {
        [].forEach.call(event.target.files, function(file) {
            var reader = new FileReader();
            reader.addEventListener("load", function(e) {
                var image = new Image();
                image.src = e.target.result;
                app.animation.images.push(image);
                appendItem(image, function(li, label, radio) {
                    radio.value = app.animation.images.length - 1;
                    radio.checked = true;
                    var text = document.createTextNode(file.name);
                    label.appendChild(text);
                });
                input.value = null;
            });
            reader.readAsDataURL(file);
        });
    });

    var patterns = animation.querySelector("#animation ul");
    var buttonTemplate = patterns.querySelector("template");
    Object.keys(Linda).filter(function(prop) {
        return Linda.Animation.patterns.indexOf(Linda[prop]) !== -1;
    }).forEach(function(patternName) {
        var pattern = Linda[patternName];
        var li = document.importNode(buttonTemplate.content, true);
        var button = li.querySelector("button");
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
                    app.animation.getImage = Linda.Animation.prototype.getImage;
                });
        });
        patterns.appendChild(li);
    });

    document.getElementById("development").hidden = false;
}).catch(function(error) {
    console.error(error);
    alert(error);
});
