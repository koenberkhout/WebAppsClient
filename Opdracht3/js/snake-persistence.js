var persistence = (function() {

    const API_URL  = "https://www.koenberkhout.nl/snake/";

    var won        = 0;
    var lost       = 0;
    var wonEver    = 0;
    var lostEver   = 0;


    function save() {
        graphics.showProgress("#save");

        $.ajax({
            type: 'POST',
            url: API_URL,
            data: JSON.stringify ({won: won, lost: lost}),
            contentType: "application/json",
            dataType: 'json'
        })
        .always(function() {
            graphics.hideProgress("#save");
        })
        .done(function(result) {
            won  = 0;
            lost = 0;
            wonEver = parseInt(result.won);
            lostEver = parseInt(result.lost);
            updateStats();
        })
        .fail(function() {
            console.log("De statistieken kunnen niet worden opgeslagen");
        })
    }

    function load() {
        graphics.showProgress("#load");

        $.get({
            url: API_URL,
            cache: false
        })
        .always(function() {
            graphics.hideProgress("#load");
        })
        .done(function(result) {
            wonEver = parseInt(result.won);
            lostEver = parseInt(result.lost);
            updateStats();
        })
        .fail(function() {
            console.log("De statistieken kunnen niet worden geladen");
        });
    }

    function addWon() {
        won++;
        updateStats();
    }

    function addLost() {
        lost++;
        updateStats();
    }

    function updateStats() {
        graphics.updateStats(won, lost, wonEver, lostEver);
    }

    return {
        save: save,
        load: load,
        addWon:  addWon,
        addLost: addLost
    }

})();