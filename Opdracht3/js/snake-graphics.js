var graphics = (function() {

    var canvas;

    function init() {
        if (!canvas) {
            canvas = $("#mySnakeCanvas");
        }
    }

    /**
     * @function draw
     * @description Teken de slang en het voedsel op het canvas
     */
    function draw(segments, foods) {
        canvas.clearCanvas();
        segments.forEach(function (e) {
            drawElement(e);
        });
        foods.forEach(function (e) {
            drawElement(e);
        });
    }

    /**
     * @function drawElement
     * @description Een element tekenen op het canvas
     * @param {Element} element een Element object
     * @param canvas het tekenveld
     */
    function drawElement(element) {
        canvas.drawArc({
            draggable: false,
            fillStyle: element.color,
            x: element.x,
            y: element.y,
            radius: element.radius
        });
    }

    function clear() {
        canvas.clearCanvas();
    }

    return {
        init: init,
        clear: clear,
        draw: draw
    }

})();