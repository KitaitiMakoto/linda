Linda.PassingLines = function() {};
Linda.Animation.patterns.push(Linda.PassingLines);
Linda.PassingLines.draw = function(rotation, gradient) {
    gradient = gradient || 0;
    var progress = rotation;
    var halfWidth = this.thickness / 2;


console.warn("FIXME");
gradient = window.gradient;
var startPoint = {x: window.startX, y: window.startY + halfWidth}
var length = Math.abs(window.startX) * 2 * progress;
var endPoint = {x: startPoint.x + length, y: startPoint.y};
var mirrorStartPoint = {x: -startPoint.x, y: -startPoint.y};
var mirrorEndPoint = {x: -endPoint.x, y: -endPoint.y};



    startPoint = this.translate(this.rotate(startPoint, gradient));
    endPoint = this.translate(this.rotate(endPoint, gradient));
    mirrorStartPoint = this.translate(this.rotate(mirrorStartPoint, gradient));
    mirrorEndPoint = this.translate(this.rotate(mirrorEndPoint, gradient));

    this.beginDrawing()
        .moveTo(startPoint.x, startPoint.y)
        .lineTo(endPoint.x, endPoint.y)
        .moveTo(mirrorStartPoint.x, mirrorStartPoint.y)
        .lineTo(mirrorEndPoint.x, mirrorEndPoint.y);
}
