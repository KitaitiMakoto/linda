Linda.Splash = function() {};
Linda.Splash.run = function() {
    return Array.prototype.reduce.call(
        document.querySelectorAll("#splash span"),
        function(splash, character) {
            return splash.then(function() {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        character.classList.add("splashed");
                        resolve();
                    }, 500);
                })
            });
        }, Promise.resolve()
    ).then(function() {
        return new Promise(function(resolve, reject) {
            setTimeout(resolve, 1200);
        });
    });
};
