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
        var loader = document.getElementById("linda-loader");
        if (! loader) {
            return reject(new Error("linda-loader not found"));
        }
        loader.addEventListener("load", function(event) {
            resolve();
            event.target.removeEventListener("load", arguments.callee);
        });
    });
}).then(function() {
    return Linda.init(
        document.getElementById("stage"),
        null,
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
