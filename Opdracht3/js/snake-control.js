var control = (function() {

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

    function start() {
        logic.init();
        $(document).on("keydown", keydownHandler);
    }

    function stop() {
        logic.stop();
        removeHandler();
    }

    function removeHandler() {
        $(document).off("keydown", keydownHandler);
    }

    function save() {
        persistence.save();
    }

    function load() {
        persistence.load();
    }

    return {
        start: start,
        stop: stop,
        save: save,
        load: load,
        removeHandler: removeHandler
    }

})();

$(document).ready(function () {
    $("#startSnake").click(control.start);
    $("#stopSnake").click(control.stop);
    $("#saveSnake").click(control.save);
    $("#loadSnake").click(control.load);

    $(document).on("snake:end", control.removeHandler);
});