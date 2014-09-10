Linda.State = function() {
    this.state = "initializing";
    this.observers = [];
};
Linda.State.prototype.set = function(state) {
    var oldState = this.state;
    this.state = state;
    this.observers.forEach(function(observer) {
        observer(state, oldState);
    });
};
Linda.State.View = function(element, state) {
    this.element = element;
    state.observers.push(this.update.bind(this));
};
Linda.State.View.prototype.update = function(state, oldState) {
    if (state !== oldState) {
        this.render(state);
    }
};
Linda.State.View.prototype.render = function(state) {
    this.element.setAttribute("class", state);
    this.element.textContent = state;
};
