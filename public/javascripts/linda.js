Linda = {
    initializeStage: function(canvasElem, translate) {
	if (arguments.length < 2) {
	    translate = true;
	}
        canvasElem.width = window.innerWidth;
        canvasElem.height = window.innerHeight;
        var stage = new Stage(canvasElem);
	if (translate) {
        stage.getMatrix()
            .translate(canvasElem.width / 2, canvasElem.height / 2)
            .decompose(stage);
	}
        return stage;
    }
};
