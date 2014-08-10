Linda = {
    initializeStage: function(canvasElem) {
        canvasElem.width = window.innerWidth;
        canvasElem.height = window.innerHeight;
        var stage = new Stage(canvasElem);
        stage.getMatrix()
            .translate(canvasElem.width / 2, canvasElem.height / 2)
            .decompose(stage);
        return stage;
    }
};
