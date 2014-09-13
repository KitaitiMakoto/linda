document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas, false);
    var imageUri = "images/bg_sea01.jpg";
    var image = new Image();
    Linda.Animation.patterns = [Linda.Spots];
    image.addEventListener("load", function(event) {
        var animation = new Linda.Animation([event.target], {
            x: canvas.width / 2,
            y: canvas.height / 2,
            thickness: canvas.height / 2
        });
        stage.addChild(animation.shape);
        setTimeout(function() {
            animation.animate(Math.random() * Math.PI, 600);
        }, 600);
        Ticker.addEventListener("tick", stage);
    });
    image.src = imageUri;
});
