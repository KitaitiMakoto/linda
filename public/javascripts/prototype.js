window.addEventListener("load", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas);
    var backgroundImages = JSON.parse(document.getElementById("background-images").innerHTML);
    var backgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    var img = new Image();
    img.src = "images/" + backgroundImage;
    img.addEventListener("load", function() {
        canvas.style.backgroundImage = "url('" + img.src + "')";
    });
    var shortSide = Math.min(canvas.width, canvas.height)
    var longSide = Math.max(canvas.width, canvas.height);

    Ticker.addEventListener("tick", stage);

    var numShapes = 12;
    var shapes = [];
    var shape = [Linda.Circle, Linda.Triangle, Linda.Square][Math.floor(Math.random() * 3)];
    for (var i = 0; i < numShapes; i++) {
        shapes.push(new shape({radius: shortSide * 0.1 / 2, thickness: 8}));
    }
    shapes.forEach(function(shape, index) {
        setTimeout(function() {
            stage.addChild(shape.shape);
            shape.tweenTo({radius: longSide * 2.4 / 2});
        }, index * 100);
    });
});
