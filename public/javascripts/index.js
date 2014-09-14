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
    if (location.search.indexOf("env=development") !== -1) {
        var devArea = document.getElementById("development")
        var ul = devArea.querySelector("ul");
        Object.keys(Linda).filter(function(prop) {
            return Linda.Animation.patterns.indexOf(Linda[prop]) !== -1;
        }).forEach(function(prop) {
            var li = document.createElement("li");
            var button = document.createElement("button");
            button.textContent = prop;
            li.appendChild(button);
            ul.appendChild(li);
            button.addEventListener("click", function(event) {
                var origFunc = Linda.Animation.prototype.getDrawFunction;
                Linda.Animation.prototype.getDrawFunction = function() {

                    return Linda[prop].draw;
                };
                var rotation = 24 * Math.PI;
                var duration = 6000;
                window.app.shape.animate(rotation + Math.random(), duration + Math.random() * 100)
                    .then(function() {
                        Linda.Animation.prototype.getDrawFunction = origFunc;
                    });
            });
        });
        devArea.hidden = false;
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
    if (location.search.indexOf("env=development" !== -1)) {
        window.app = app;
    }
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
}).catch(function(error) {
    console.error(error);
    alert(error);
});
