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
    var match;
    if (/input=shake/.test(location.search)) {
        Linda.Microphone.available = function() {return false};
    }
    return Promise.all([
	Linda.init(
            document.getElementById("stage"),
            {},
            {whisperRange: {lower: 120, upper: 255}, controls: document.getElementById("microphone-controls")}
        ),
	Linda.Splash.run()
    ]);
}).then(function(app) {
    app = app[0];
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
