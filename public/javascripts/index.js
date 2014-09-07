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
        if (/chrome/i.test(navigator.userAgent)) {
            resolve();
        } else {
            reject(new Error("user agent not chromium or chrome"));
        }
    });
}).then(function() {
    var shapeOptions = {};
    var match;
    if (match = /image=(\d+)/.exec(location.search)) {
        shapeOptions.imageIndex = match[1];
    }
    if (/input=shake/.test(location.search)) {
        Linda.Microphone.available = function() {return false};
    }
    return Linda.init(
        document.getElementById("stage"),
        shapeOptions,
        {whisperRange: {lower: 120, upper: 255}}
    );
}).then(function(app) {
    console.warn("FIXME: app.run should accept delay time");
    setTimeout(function() {
        app.run();
    }, 2000);
}).catch(function(error) {
    console.error(error);
});
