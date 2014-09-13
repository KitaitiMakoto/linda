Linda.Splash = function() {};
Linda.Splash.run = function() {
    return Promise.all(Array.prototype.map.call(
        document.querySelectorAll("#splash span"),
        function(character, index) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    character.addEventListener("transitionend", resolve);
                    character.addEventListener("webkitTransitionEnd", resolve);
                    character.classList.add("splashed");
                }, index * 300);
            })
        }
    ));
};
