Linda.RadiatedSpots = {};
Linda.Animation.patterns.push(Linda.RadiatedSpots);
Linda.RadiatedSpots.draw = function(progress) {
    var radius = this.radiatedSpotsRadius;
    var distance = this.radiatedSpotsDistance;
    var gradient = -2 * Math.PI * progress;
    var graphics = this.beginDrawing()
        .setStrokeStyle(0)
        .beginBitmapFill(this.image)
        .drawCircle(this.x, this.y, radius);
    for (var i = 0; i < 8; i++) {
        var angle = i * Math.PI / 4;
        for (var j = 0; j < 12; j++) {
            var coord = new Point((radius * 2 + distance) * (j + 1), 0);
            coord = this.translate(this.rotate(this.rotate(coord, angle), gradient));
            graphics.beginBitmapFill(this.image)
                .drawCircle(coord.x, coord.y, radius);
        }
    }
};
