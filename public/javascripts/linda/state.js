Linda.State = function() {
    this.state = "initializing";
    this.observers = [];
};
Linda.State.prototype.set = function(state) {
    var oldState = this.state;
    if (oldState === "animating" && state !== "listening") {
        return;
    }
    this.state = state;
    this.observers.forEach(function(observer) {
        setTimeout(function() {
            observer(state, oldState);
        });
    });
};
Linda.State.View = function(element, state) {
    this.element = element;
    state.observers.push(this.render.bind(this));
};
Linda.State.View.prototype.render = function(state, oldState) {
    if (state === oldState) {
        return;
    }
    this.element.setAttribute("class", state);
};
