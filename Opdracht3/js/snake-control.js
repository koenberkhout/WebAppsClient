var control = (function() {

    /**
     * @function keydownHandler
     * @description Bekijkt of de ingedrukte toets een van de pijltjestoetsen is en zo ja,
     * dan wordt de corresponderende functie in 'logic' aangeroepen.
     * @param e Het event
     */
    function keydownHandler(e) {
        switch (e.which) {
            case 37:
                logic.moveLeft();
                break;
            case 38:
                logic.moveUp();
                break;
            case 39:
                logic.moveRight();
                break;
            case 40:
                logic.moveDown();
                break;
        }
    }

    /**
     * @function init
     * @description Initialiseert/prepareert het spel in de 'logic' module.
     */
    function init() {
        logic.init();
    }

    /**
     * @function start
     * @description Start het spel, en voegt de keydownHandler toe zodat er
     * gereageerd kan worden op het indrukken van de pijltjestoetsen.
     */
    function start() {
        logic.start();
        $(document).on("keydown", keydownHandler);
    }

    /**
     * @function stop
     * @description Stopt het spel en ontkoppelt de keydownHandler.
     */
    function stop() {
        logic.stop();
        removeHandler();
    }

    /**
     * @function removeHandler
     * @description Ontkoppelt de keydownHandler van het 'keydown' event.
     */
    function removeHandler() {
        $(document).off("keydown", keydownHandler);
    }

    /**
     * @function save
     * @description Delegeert het opslaan van het spel aan de persistence-module.
     */
    function save() {
        persistence.save();
    }

    /**
     * @function load
     * @description Delegeert het laden van het spel aan de persistence-module.
     */
    function load() {
        persistence.load();
    }

    return {
        init: init,
        start: start,
        stop: stop,
        save: save,
        load: load,
        removeHandler: removeHandler
    }

})();