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
        if (! /iPhone|iPod|Android/.test(navigator.userAgent)) {
            var style = document.createElement("style");
            style.textContent = "#input-information p {top: 52% !important;}#input-information p.initial {top: calc((100vh - 80vmin) / 2) !important;}";
            document.getElementsByTagName("head")[0].appendChild(style);
        }
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
}).catch(function(error) {
    console.error(error);
    alert(error);
});
