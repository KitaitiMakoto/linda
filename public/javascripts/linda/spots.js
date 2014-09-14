Linda.Spots = {};
Linda.Animation.patterns.push(Linda.Spots);
Linda.Spots.draw = function(progress) {
    var canvas = this.shape.parent.canvas;
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
};
