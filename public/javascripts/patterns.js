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

    var controls = new Vue({
        el: "#controls",
        data: {
            tweens: []
        },
        methods: {
            add: function(event) {
                event.preventDefault();
                var index = event.targetVM.$index;
                var tween = this.tweens[index];
                var form = event.target;
                var props = {};
                tween.args.forEach(function(arg) {
                    var value = form[arg].value;
                    if (value !== "") {
                        props[arg] = value;
                    }
                });
                tweens.$data.tweens.push({
                    func: tween.func,
                    args: [props, form.duration.value]
                });
            }
        },
        created: function() {
            this.tweens.push(
                {func: "moveTo", args: ["x", "y"], desc: "キャンバスサイズに対する割合。0.5で半分"},
                {func: "moveBy", args: ["x", "y"], desc: "現在位置から移動する距離"},
                {func: "scaleTo", args: ["scaleX", "scaleY"], desc: "拡大率。1が元の大きさ"},
                {func: "appear", args: [], desc: "出現する"},
                {func: "disappear", args: [], desc: "消える"},
                {func: "tweenTo", args: ["x", "y", "scaleX", "scaleY", "alpha"], desc: "汎用"}
            );
        }
    });

    window.run = function() {
        window.scrollTo(0, 0);
        var promise = circle.draw()
            .then(function(circle) {
                return circle.tweenTo({x: 0, y:0, scaleX: 1, scaleY: 1, alpha: 1}, 0);
            });
        tweens.$data.tweens.forEach(function(tween) {
            promise = promise.then(function(circle) {
                return Linda.Circle.prototype[tween.func].apply(circle, tween.args);
            });
        });
    };
    window.clearTweens = function() {
        tweens.$data.tweens.splice(0);
        circle.draw();
    };
});
