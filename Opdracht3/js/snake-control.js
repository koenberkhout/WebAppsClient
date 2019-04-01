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

function startSnake() {
    logic.init();
    $(document).on("keydown", keydownHandler);
}

function stopSnake() {
    logic.stop();
    $(document).off("keydown", keydownHandler);
}

$(document).ready(function () {
    $("#startSnake").click(startSnake);
    $("#stopSnake").click(stopSnake);
});