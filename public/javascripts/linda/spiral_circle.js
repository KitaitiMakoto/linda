Linda.SpiralCircle = {};
Linda.Animation.patterns.push(Linda.SpiralCircle);
Linda.SpiralCircle.draw = function(progress, gradient) {
    gradient = gradient || 0;
    var rotation = this.rotation * progress;
    this.beginDrawing();
    for (var rot = 0; rot <= rotation; rot += 0.1) {
        var x = rot * Math.cos(rot + gradient) * this.expandingRate;
        var y = rot * Math.sin(rot + gradient) * this.expandingRate;
        this.shape.graphics.lineTo(this.x + x, this.y + y);
    }
};
