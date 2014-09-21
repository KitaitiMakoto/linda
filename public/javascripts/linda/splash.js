Linda.Splash = function() {};
Linda.Splash.run = function() {
    return (new Promise(function(resolve, reject) {
        setTimeout(resolve, 800);
    })).then(function() {
        var characters = document.querySelectorAll("#splash span");
        characters = Array.prototype.slice.call(characters, 0, characters.length - 1);
        return characters.reduce(function(sequence, character, index) {
            return sequence.then(function() {
                character.classList.add("splashed");
                return new Promise(function(resolve, reject) {
                    setTimeout(resolve, 300);
                });
            });
        }, Promise.resolve())
    }).then(function() {
        return new Promise(function(resolve, reject) {
            var character = document.querySelector("#splash span:last-child");
            character.addEventListener("transitionend", resolve);
            character.addEventListener("webkitTransitionEnd", resolve);
            character.classList.add("splashed");
        });
    });
};
