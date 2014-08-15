window.addEventListener("load", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas);
    var backgroundImages = JSON.parse(document.getElementById("background-images").innerHTML);
    var backgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    canvas.style.backgroundImage = "url('../images/" + backgroundImage + "')";
    var shortSide = Math.min(canvas.width, canvas.height)
    var longSide = Math.max(canvas.width, canvas.height);

    Ticker.addEventListener("tick", stage);

    var numCircles = 12;
    var circles = [];
    for (var i = 0; i < numCircles; i++) {
        circles.push(new Linda.Circle({radius: shortSide * 0.1 / 2, thickness: 8}));
    }
    circles.forEach(function(circle, index) {
        setTimeout(function() {
            stage.addChild(circle.shape);
            circle.tweenTo({radius: longSide * 2 / 2});
        }, index * 100);
    });
});
