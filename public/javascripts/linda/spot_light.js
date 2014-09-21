Linda.SpotLight = {};
Linda.Animation.patterns.push(Linda.SpotLight);
Linda.SpotLight.draw = function(progress) {
    var canvas = this.shape.parent.canvas;
    var canvasWidth = canvas.width;
    var radius = canvasWidth / 2 * (1 - progress);
    var gradient = 2 * Math.PI * progress;
    this.beginDrawing()
        .setStrokeStyle(0)
        .beginBitmapFill(this.image)
        .arc(this.x, this.y, radius, gradient, gradient + Math.PI / 6)
        .lineTo(this.x, this.y)
        .closePath()
        .endFill();
};
