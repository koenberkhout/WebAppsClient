var graphics = (function() {

    var canvas;

    /**
     * @function init
     * @description Vraagt het canvaselement op uit de DOM en wijst deze toe
     * aan een variabele voor hergebruik.
     */
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

    /**
     * @function showWon
     * @description Geeft een overwinningstekst in het groen weer op het canvas
     */
    function showWon() {
        writeText("Gewonnen!", "#35a74a")
    }

    /**
     * @function showLost
     * @description Geeft een verliezingstekst in het rood weer op het canvas
     */
    function showLost() {
        writeText("Verloren!", "#ff0000")
    }

    /**
     * @function writeText
     * @description Geeft een bepaalde tekst in een bepaalde kleur weer op het canvas
     * @param {string} text de tekst
     * @param {string} color kleur van de tekst
     */
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

    /**
     * @function clear
     * @description Maakt het canvas leeg
     */
    function clear() {
        canvas.clearCanvas();
    }

    /**
     * @function showProgress
     * @description Toont een progress bar aan de bovenkant van het scherm (topbar),
     * een halftransparante overlay en wijzigt de knop waarop is gedrukt in twee
     * ronddraaiende pijltjes.
     * @param {string} action Begin van het id van de actieknop "save.." of "load.."
     */
    function showProgress(action) {
        topbar.show();
        $("#overlay").fadeIn(200);
        $(action + "Snake").hide();
        $(action + "SnakeIndicator").show();
    }

    /**
     * @function hideProgress
     * @description Verbergt de progress-elementen die eerder met showProgress op het scherm
     * waren gezet, en doet dit met een lichte vertraging :)
     * @param {string} action Begin van het id van de actieknop "save.." of "load.."
     */
    function hideProgress(action) {
        setTimeout(function() {
            topbar.hide();
            $(action + "SnakeIndicator").hide();
            $(action + "Snake").show();
            $("#overlay").fadeOut(200);
        }, 250);
    }

    /**
     * @function updateStats
     * @description Toont de statistieken (overwinningen/verliezen) in de tabel onder het spel.
     * @param {number} wonNow Aantal overwinningen deze sessie
     * @param {number} lostNow Aantal verliezen deze sessie
     * @param {number} wonEver Aantal overwinningen totaal (van server)
     * @param {number} lostEver Aantal verliezen totaal (van server)
     */
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