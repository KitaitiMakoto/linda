Linda.SpotLight = {};
Linda.Animation.patterns.push(Linda.SpotLight);
Linda.SpotLight.draw = function(progress) {
    var canvas = this.shape.parent.canvas;
    var radius = canvas.width * 0.8;
    var gradient = Linda.SpotLight.gradient(progress);
    var center = new Point(canvas.width * 0.2, canvas.height * 0.8);
    if (gradient === null) {
        this.clear();
        return;
    }
    this.beginDrawing()
        .setStrokeStyle(0)
        .beginBitmapFill(this.image)
        .arc(center.x, center.y, radius, gradient - Math.PI / 16, gradient + Math.PI / 16)
        .lineTo(center.x, center.y)
        .closePath()
        .endFill();
};
Linda.SpotLight.gradient = function(progress) {
    if (progress < 0.4) {
        return Math.PI / 4 * progress / 0.4;
    } else if (0.4 <= progress && progress < 0.45) {
        return Math.PI / 4;
    } else if (0.45 <= progress && progress < 0.5) {
        p = (progress - 0.45) / (0.5 - 0.45);
        return Math.PI / 4 - (Math.PI / 4 + Math.PI) * p;
    } else {
        return null;
    }
};
