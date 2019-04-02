$(document).ready(function () {
    control.init();

    $("#startSnake").click(control.start);
    $("#stopSnake").click(control.stop);
    $("#saveSnake").click(control.save);
    $("#loadSnake").click(control.load);

    $(document).on("snake:end", control.removeHandler);
});