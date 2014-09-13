document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    var stage = Linda.initializeStage(canvas, false);
    var imageUri = "images/bg_sea01.jpg";
    var image = new Image();
    Linda.Animation.patterns = [Linda.PassingLines];
    image.addEventListener("load", function(event) {
        var animation = new Linda.Animation([event.target], {
            x: canvas.width / 2,
            y: canvas.height / 2,
            thickness: canvas.height / 2
        });
        stage.addChild(animation.shape);
window.gradient = 0.3;
window.startX = -canvas.width / 2;
window.startY = -canvas.height / 2;
        setTimeout(function() {
            animation.animate(1, 1000);
        }, 600);
        Ticker.addEventListener("tick", stage);
    });
    image.src = imageUri;
});
