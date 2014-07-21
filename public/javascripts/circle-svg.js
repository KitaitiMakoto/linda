"use strict";

window.addEventListener("load", function() {
    var stage = document.getElementById("stage");
    var group = document.getElementById("circle");
    var origin = {x: window.innerWidth / 2, y: window.innerHeight / 2}
    group.setAttribute("transform", "translate(" + origin.x + ", " + origin.y + ")");
});
