Linda.Spots = {};
Linda.Animation.patterns.push(Linda.Spots);
Linda.Spots.draw = function(progress) {
    if (progress === 0) {
        arguments.callee.spots = 0;
    }
    var expectedSpots = Linda.Spots.easing(progress);
    var spotsToDraw = expectedSpots - arguments.callee.spots;
    var canvas = this.shape.parent.canvas;
    for (var i = 0; i < spotsToDraw; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * canvas.width / 12;
        var graphics = (progress === 0)
                     ? this.clear()
                     : this.shape.graphics;
        graphics
            .beginBitmapFill(this.image)
            .drawCircle(x, y, radius)
            .endFill();
        arguments.callee.spots++;
    }
};
/*
 * @return count of spots
 */
Linda.Spots.easing = function(progress) {
    var ratio = -(Math.sqrt(1-progress*progress)- 1)
    return Math.floor(300 * ratio);
};
