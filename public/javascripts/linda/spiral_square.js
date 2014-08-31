Linda.SpiralSquare = function(options) {
    options = options || {};
    this.image = options.image;
    this.thickness = options.thickness || 24;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.unit = options.unit || 12;
    this.shape = new Shape();
};
Linda.SpiralSquare.prototype.draw = function(angle) {
    angle = angle || 0;
    var coord = {x: -this.unit, y: 0};
    var pos = translate(rotate(coord, angle), {x: this.x, y: this.y});
    this.clear()
        .beginBitmapStroke(this.image)
        .setStrokeStyle(this.thickness)
        .moveTo(this.x, this.y)
        .lineTo(pos.x, pos.y);
    for (var i = 0; i < 720; i++) {
        var direction = i % 4;// 0 => left, 1 => down, 2 => right, 3 => up
        var length = this.unit * (i + 1) * 2;
        switch(direction) {
        case 0:
            coord.x -= length;
            break;
        case 1:
            coord.y -= length;
            break;
        case 2:
            coord.x += length;
            break;
        case 3:
            coord.y += length;
            break;
        }
        var pos = translate(rotate(coord, angle), {x: this.x, y: this.y});
        this.shape.graphics.lineTo(pos.x, pos.y);
    }
};
Linda.SpiralSquare.prototype.animate = function(rotation, duration) {

};
Linda.SpiralSquare.prototype.clear = function() {
    return this.shape.graphics.clear();
};
