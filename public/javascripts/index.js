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
    return Linda.init(
        document.getElementById("stage"),
        {},
        {whisperRange: {lower: 120, upper: 255}}
    );
}).then(function(app) {
    app.run(2000);
    document.querySelector("body").classList.remove("uninitialized");
}).catch(function(error) {
    console.error(error);
    alert(error);
});
