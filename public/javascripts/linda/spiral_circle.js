Linda.SpiralCircle = function() {};
Linda.Spiral.constructors.push(Linda.SpiralCircle);
Linda.SpiralCircle.prototype = Object.create(Linda.Spiral.prototype);
Linda.SpiralCircle.prototype.draw = function(rotation, gradient) {
    gradient = gradient || 0;
    this.beginDrawing();
    for (var rot = 0; rot <= rotation; rot += 0.1) {
        var x = rot * Math.cos(rot + gradient) * this.expandingRate;
        var y = rot * Math.sin(rot + gradient) * this.expandingRate;
        this.shape.graphics.lineTo(this.x + x, this.y + y);
    }
};
