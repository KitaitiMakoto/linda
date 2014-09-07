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
    var shapeOptions = {};
    var match;
    if (match = /image=(\d+)/.exec(location.search)) {
        shapeOptions.imageIndex = match[1];
    }
    if (match = /shape=(\w+)/.exec(location.search)) {
        shapeOptions.shapeConstructor = Linda[match[1]];
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
    app.run(2000);
}).catch(function(error) {
    console.error(error);
    alert(error);
});
