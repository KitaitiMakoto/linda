Linda.PassingLines = {};
Linda.Animation.patterns.push(Linda.PassingLines);
Linda.PassingLines.draw = function(progress) {
    var gradient = this.rotation || 0;
    var canvas = this.shape.parent.canvas;
    var canvasWidth = canvas.width;
    var diagonal = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
    var length = Math.min(diagonal * progress, diagonal);
    var lineWidth = diagonal / 2;
    var startPoint = new Point(-diagonal / 2, -diagonal / 2 + lineWidth / 2);
    var endPoint = new Point(startPoint.x + length, startPoint.y);
    var mirrorStartPoint = new Point(-startPoint.x, -startPoint.y);
    var mirrorEndPoint = new Point(-endPoint.x, -endPoint.y);

    startPoint = this.translate(this.rotate(startPoint, gradient));
    endPoint = this.translate(this.rotate(endPoint, gradient));
    mirrorStartPoint = this.translate(this.rotate(mirrorStartPoint, gradient));
    mirrorEndPoint = this.translate(this.rotate(mirrorEndPoint, gradient));

    this.beginDrawing()
        .setStrokeStyle(lineWidth)
        .moveTo(startPoint.x, startPoint.y)
        .lineTo(endPoint.x, endPoint.y)
        .moveTo(mirrorStartPoint.x, mirrorStartPoint.y)
        .lineTo(mirrorEndPoint.x, mirrorEndPoint.y);
}
