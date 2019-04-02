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
        clear();
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

    function showWon() {
        writeText("Gewonnen!", "#35a74a")
    }

    function showLost() {
        writeText("Verloren!", "#ff0000")
    }

    function writeText(text, color) {
        clear();

        canvas.drawText({
            fillStyle: color,
            fontStyle: 'bold',
            fontSize: '30pt',
            fontFamily: 'Trebuchet MS, sans-serif',
            text: text,
            x: 180, y: 100,
            align: 'center',
            maxWidth: 360,
            lineHeight: 2
        });
    }

    function clear() {
        canvas.clearCanvas();
    }

    function showProgress(action) {
        topbar.show();
        $("#overlay").fadeIn(200);
        $(action + "Snake").hide();
        $(action + "SnakeIndicator").show();
    }

    function hideProgress(action) {
        setTimeout(function() {
            topbar.hide();
            $(action + "SnakeIndicator").hide();
            $(action + "Snake").show();
            $("#overlay").fadeOut(200);
        }, 250);
    }

    function updateStats(wonNow, lostNow, wonEver, lostEver) {
        $("#wonNow").text(wonNow);
        $("#lostNow").text(lostNow);
        $("#wonEver").text(wonEver);
        $("#lostEver").text(lostEver);
    }

    return {
        init: init,
        clear: clear,
        draw: draw,
        showProgress: showProgress,
        hideProgress: hideProgress,
        updateStats: updateStats,
        showWon: showWon,
        showLost: showLost
    }

})();