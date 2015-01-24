document.addEventListener("DOMContentLoaded", function() {
    // background();
    clip();
});

function background() {
    var element = document.querySelector("section section div div");
    element.style.width = element.style.height = "0";
    var startedAt;
    var id = requestAnimationFrame(function(timestamp) {
        if (! startedAt) {
            startedAt = timestamp;
        }
        var radius = (timestamp - startedAt) / (100) + 25;
        console.info(radius);
        if (radius > 47.5) {
            cancelAnimationFrame(id);
            return;
        }
        element.style.width = element.style.height = radius * 2 + "vmin";
        id = requestAnimationFrame(arguments.callee);
    });
}

function clip() {
    var element = document.querySelector("#clip circle");
    var r = 0;
    var startedAt;
    var id = requestAnimationFrame(function(timestamp) {
        if (! startedAt) {
            startedAt = timestamp;
        }
        var ratio = (timestamp - startedAt) / (10 * 1000) + (0.15625 * 2);
        if (ratio > 1) {
            cancelAnimationFrame(id);
            return;
        }
        r = ratio * 100;
        element.setAttribute("r", (r / 2) + "%");
        console.info(element);
        id = requestAnimationFrame(arguments.callee);
    });
}
