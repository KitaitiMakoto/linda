document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("stage");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var shortSide = Math.min(canvas.width, canvas.height);
    var stage = new Stage(canvas);
    stage.getMatrix()
        .translate(canvas.width / 2, canvas.height / 2)
        .decompose(stage);
    var circle = new Linda.Circle(stage, {radius: shortSide * 0.6 / 2});

    Ticker.addEventListener("tick", stage);

    circle
        .draw()
        .then(function(circle) {
            return circle.moveTo({x: -0.3, y: -0.1}, 1000);
        }).then(function(circle) {
            return circle.moveBy({x: 0.15}, 100);
        }).then(function(circle) {
            return circle.scaleTo({scaleX: 0.6, scaleY: 0.6}, 800);
        }).then(function(circle) {
            return circle.tweenTo({x: 0, y: 0, scaleX: 1, scaleY: 1}, 100);
        }).then(function(circle) {
            var promise = Promise.resolve(circle);
            for (var i = 0; i < 3; i++) {
                promise = promise.then(function(circle) {
                    return circle.disappear(100);
                }).then(function(circle) {
                    return circle.appear(100);
                });
            }
            return promise;
        });

    var tweens = new Vue({
        el: "#tweens",
        data: {
            tweens: []
        },
        methods: {
            remove: function(event) {
                this.tweens.splice(event.targetVM.$index, 1);
            },
            reset: function(event) {
                this.tweens.length = 0;
            }
        },
        created: function() {
            this.tweens.push(
                {func: "moveTo", args: [{x: -0.3, y: -0.1}, 1000]},
                {func: "moveBy", args: [{x: 0.15}, 100]},
                {func: "scaleTo", args: [{scaleX: 0.6, scaleY: 0.6}, 800]},
                {func: "tweenTo", args: [{x: 0, y:0, scaleX: 1, scaleY: 1}, 100]}
            );
            for (var i = 0; i < 3; i++) {
                this.tweens.push(
                    {func: "disappear", args: [100]},
                    {func: "appear", args: [100]}
                );
            }
        }
    });

    window.run = function() {
        window.scrollTo(0, 0);
        var promise = circle.draw();
        tweens.$data.tweens.forEach(function(tween) {
            promise = promise.then(function(circle) {
                return Linda.Circle.prototype[tween.func].apply(circle, tween.args);
            });
        });
    };
    window.reset = function() {
        console.info(tweens.$data.tweens);
        tweens.$data.tweens.splice(0);
    };
});
