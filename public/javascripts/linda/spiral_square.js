Linda.SpiralSquare = function(image, options) {
    options = options || {};
    this.init(image, options);
    this.unit = options.unit || 12;
};
Linda.SpiralSquare.prototype = Object.create(Linda.Spiral.prototype);
Linda.SpiralSquare.prototype.draw = function(angle) {
    angle = angle || 0;
    var coord = {x: -this.unit, y: 0};
    var pos = this.translate(this.rotate(coord, angle));
    this.beginDrawing()
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
        var pos = this.translate(this.rotate(coord, angle));
        this.shape.graphics.lineTo(pos.x, pos.y);
    }
};
Linda.SpiralSquare.prototype.rotate = function(coord, angle) {
    return {
        x: coord.x * Math.cos(angle) - coord.y * Math.sin(angle),
        y: coord.x * Math.sin(angle) + coord.y * Math.cos(angle)
    };
};
Linda.SpiralSquare.prototype.translate = function(coord) {
    return {
        x: coord.x + this.x,
        y: coord.y + this.y
    }
};
