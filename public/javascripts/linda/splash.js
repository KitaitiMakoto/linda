Promise.delay = function(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, duration);
    });
};

Linda.Splash = function() {};
Linda.Splash.run = function() {
    return Array.prototype.reduce.call(
        document.querySelectorAll("#splash span:not(:last-child)"),
        function(sequence, character) {
            return sequence.then(function() {
                character.classList.add("splashed");
                return Promise.delay(300);
            });
        }, Promise.delay(800)
    ).then(function() {
        return new Promise(function(resolve, reject) {
            var character = document.querySelector("#splash span:last-child");
            character.addEventListener("transitionend", resolve);
            character.addEventListener("webkitTransitionEnd", resolve);
            character.classList.add("splashed");
        });
    });
};
