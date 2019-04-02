var persistence = (function() {

    const API_URL  = "https://www.koenberkhout.nl/snake/";

    var won        = 0;
    var lost       = 0;
    var wonEver    = 0;
    var lostEver   = 0;


    /**
     * @function save
     * @description Stuurt het aantal overwinningen en verliezen die in de huidige
     * sessie zijn gemaakt naar de server in json-formaat. Het resultaat wordt opgeslagen
     * in wonEver en lostEver. Het opdaten op het scherm wordt gedelegeerd aan 'graphics'.
     */
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

    /**
     * @function load
     * @description Haalt de spelstatistieken op van de server (totaal aantal overwinningen
     * en verliezen) en delegeert het updaten van de weergave hiervan aan module 'grapics'.
     */
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

    /**
     * @function addWon
     * @description Verhoogt het aantal overwinningen van deze sessie met 1 en
     * delegeert het updaten van de weergave hiervan aan module 'grapics'.
     */
    function addWon() {
        won++;
        updateStats();
    }

    /**
     * @function addLost
     * @description Verhoogt het aantal verliezen van deze sessie met 1 en
     * delegeert het updaten van de weergave hiervan aan module 'grapics'.
     */
    function addLost() {
        lost++;
        updateStats();
    }

    /**
     * @function updateStats
     * @description Geeft de huidige statistieken mee aan de graphics-module
     * om deze te kunnen opdaten op het scherm.
     */
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