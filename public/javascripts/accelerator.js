"use strict";
document.addEventListener("DOMContentLoaded", function() {
    var acc = document.getElementById("acceleration");
    var acg = document.getElementById("accelerationIncludingGravity");
    window.addEventListener("devicemotion", function(event) {
        if (Math.abs(event.acceleration.x) > 0.1) {
            acc.innerHTML = event.acceleration.x;
        }
        if (Math.abs(event.accelerationIncludingGravity.x) > 1) {
            acg.innerHTML = event.accelerationIncludingGravity.x;
        }
    });

    var shake = document.getElementById("shake");
    var count = 0;
    window.addEventListener("shake", function(event) {
        shake.innerHTML = "shaken " + ++count + " times";
    });
});
