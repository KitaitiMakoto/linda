Linda.Animation = function(options) {
    options = options || {};
    this.images = {
        "low": [],
        "mid": [],
        "high": []
    };
    this.thickness = options.thickness || 24;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.expandingRate = options.expandingRate || (this.thickness / 3);
    this.radiatedSpotsRadius = options.radiatedSpotsRadius || 12;
    this.radiatedSpotsDistance = options.radiatedSpotsDistance || 24;
    this.shape = new Shape();
};
Linda.Animation.availableImageTypes = ["image/png", "image/jpeg", "image.gif"];
Linda.Animation.patterns = [];
Linda.Animation.Params = {
    low: {
        rotation: 24 * Math.PI,
        duration: 12000
    },
    mid: {
        rotation: 24 * Math.PI,
        duration: 6000
    },
    high: {
        rotation: 24 * Math.PI,
        duration: 3000
    }
};
Linda.Animation.prototype.beginDrawing = function() {
    return this.clear()
        .beginBitmapStroke(this.image)
        .setStrokeStyle(this.thickness);
};
Linda.Animation.prototype.clear = function() {
    return this.shape.graphics.clear();
};
Linda.Animation.prototype.getDrawFunction = function() {
    var patterns = Linda.Animation.patterns;
    var pattern = patterns[Math.floor(Math.random() * patterns.length)];
    return pattern.draw;
};
Linda.Animation.prototype.getImage = function(level) {
    var images = this.images[level];
    if (this.useLastImage) {
        this.useLastImage = false;
        return images[images.length - 1];
    }
    return images[Math.floor(Math.random() * images.length)];
};
Linda.Animation.prototype.animate = function(level) {
    var params = Linda.Animation.Params[level];
    this.draw = this.getDrawFunction();
    this.image = this.getImage(level);
    this.rotation = params.rotation + Math.random();
    var scope = this;
    return new Promise(function(resolve, reject) {
        var startedAt = null;
        var requestID = requestAnimationFrame(function(timestamp) {
            if (! startedAt) {
                startedAt = timestamp;
            }
            var progress = Math.min((timestamp - startedAt) / params.duration, 1);
            var gradient = scope.rotation * progress;
            scope.draw(progress, gradient);
            if (progress === 1) {
                cancelAnimationFrame(requestID);
                resolve(scope);
            } else {
                requestID = requestAnimationFrame(arguments.callee);
            }
        });
    });
};
Linda.Animation.prototype.rotate = function(coord, angle) {
    return new Point(
        coord.x * Math.cos(angle) - coord.y * Math.sin(angle),
        coord.x * Math.sin(angle) + coord.y * Math.cos(angle)
    );
};
Linda.Animation.prototype.translate = function(coord) {
    return new Point(
        coord.x + this.x,
        coord.y + this.y
    );
};
Linda.Animation.prototype.addImage = function(source, level) {
    var image = new Image();
    image.src = source;
    var canvas = this.shape.parent.canvas;
    var adaptedImage = Linda.adaptImage(image, canvas.width, canvas.height);
    var images = this.images;
    if (level) {
        images[level].push(adaptedImage);
    } else {
        var self = this;
        Object.keys(images).forEach(function(level) {
            images[level].push(adaptedImage);
        });
    }
};
Linda.Animation.prototype.loadImage = function(file) {
    var self = this;
    return new Promise(function(resolve, reject) {
        if (Linda.Animation.availableImageTypes.indexOf(file.type) === -1) {
            resolve();
            return;
        }
        var reader = new FileReader();
        reader.addEventListener("load", function(event) {
            self.addImage(event.target.result);
            resolve();
        });
        reader.readAsDataURL(file);
    });
};
