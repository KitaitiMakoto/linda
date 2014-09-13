Linda.PassingLines = function() {};
Linda.Animation.patterns.push(Linda.PassingLines);
Linda.PassingLines.draw = function(progress) {
    var gradient = this.rotation || 0;
    var canvas = this.shape.parent.canvas;
    var canvasWidth = canvas.width;
    var length = Math.min(canvasWidth * progress, canvasWidth);
    var halfWidth = this.thickness / 2;
    var startPoint = {x: -canvasWidth / 2, y: -canvas.height / 2 + halfWidth}
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
