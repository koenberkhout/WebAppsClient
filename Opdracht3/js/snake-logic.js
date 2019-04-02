var logic = (function() {

    const R       = 10,           // straal van een element
        STEP      = 2*R,          // stapgrootte
        WIDTH     = 360,          // breedte veld
        HEIGHT    = 360,          // hoogte veld
                                  // er moet gelden: WIDTH = HEIGHT
        MAX       = WIDTH/STEP-1, // netto veldbreedte
        LEFT      = "left",       // bewegingsrichtingen
        RIGHT     = "right",
        UP        = "up",
        DOWN      = "down",

        NUMFOODS  = 5,           // aantal voedselelementen

        XMIN      = R,            // minimale x waarde
        YMIN      = R,            // minimale y waarde
        XMAX      = WIDTH - R,    // maximale x waarde
        YMAX      = HEIGHT - R,   // maximale y waarde

        SNAKE     = "DarkRed" ,   // kleur van een slangsegment
        FOOD      = "Olive",      // kleur van voedsel
        HEAD      = "DarkOrange", // kleur van de kop van de slang

        SLEEPTIME = 500;          // tijd voor automatisch bewegen

    var snake,
        foods     = [],           // voedsel voor de slang
        direction,                // de richting, bij begin UP
        snakeTimer;               // slang automatisch laten bewegen



    /**
     * @function init
     * @description Haal eventueel bestaand voedsel en een bestaande slang weg,
     * creëer een slang, genereer voedsel, en teken alles
     */
    function init() {
        graphics.init();
        snake = undefined;
        direction = UP;
        foods = [];
        createStartSnake();
        createFoods();
        draw();

        snakeTimer = setInterval(function() {
            move();
        }, SLEEPTIME);
    }

    /**
     * @function stop
     * @description Laat slang en voedsel verdwijnen, en teken leeg veld
     */
    function stop() {
        graphics.clear();
        snake = undefined;
        foods = [];
        clearInterval(snakeTimer);
    }

    /**
     * @function draw
     * @description Geef het graphics-object opdracht om de slang en het voedsel op het canvas te tekenen.
     */
    function draw() {
        graphics.draw(snake.segments, foods);
    }

    function setDirection(newDirection) {
        direction = newDirection;
    }

    function runsOverBody() {
        return Math.random() >= 0.8;
    }

    /**
     * @function move
     * @description Beweeg slang in aangegeven richting tenzij slang uit het canvas zou verdwijnen
     * @param {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
     */
    function move() {
        if (runsOverBody()) {
            lost();
        } else if (snake.canMove()) {
            snake.doMove();
            draw();
        } else {
            console.log("Snake cannot move " + direction);
        }
    }

    function won() {
        end();
        persistence.addWon();
        graphics.showWon();
    }

    function lost() {
        end();
        persistence.addLost();
        graphics.showLost();
    }

    function end() {
        stop();
        $(document).trigger("snake:end");
    }

    /**
     * @constructor Snake
     * @param {Element[]} segments een array met aaneengesloten slangsegmenten.
     * Het laatste element van segments wordt de kop van de slang en krijgt een andere kleur.
     */
    function Snake(segments) {
        this.segments = segments;
        this.setHeadColor();
    }

    /**
     * @function setHeadColor
     * @description zet het attribuut color van de kop van de slang
     * @global
     */
    Snake.prototype.setHeadColor = function () {
        var segments = this.segments;
        segments[segments.length - 1].color = HEAD;
    }

    /**
     * @function getHead
     * @description Haalt de kop van slang op door het laatste segment van de slang op te vragen
     * @returns {Element} Geeft segment van de slang terug dat de kop van de slang bevat
     * @global
     */
    Snake.prototype.getHead = function () {
        var segments  = this.segments;
        var snakeHead = segments[segments.length - 1];
        return snakeHead;
    }

    /**
     * @function canMove
     * @description Controleert of de slang over de rand van het canvas zou lopen (false)
     * of binnen het canvas zou blijven (true) bij beweging in de aangegeven richting.
     * @param {string} direction De richting van de beweging
     * @returns {boolean} Geeft true terug indien mogelijk en false indien niet mogelijk
     * @global
     */
    Snake.prototype.canMove = function() {
        var head    = this.getHead();
        var canMove = false;

        switch (direction) {
            case UP:
                if (head.y - STEP >= YMIN) canMove = true;
                break;
            case DOWN:
                if (head.y + STEP <= YMAX) canMove = true;
                break;
            case LEFT:
                if (head.x - STEP >= XMIN) canMove = true;
                break;
            case RIGHT:
                if (head.x + STEP <= XMAX) canMove = true;
                break;
            default:
                console.log("Unknown movement: " + direction);
                break;
        }
        return canMove;
    }

    /**
     * @function doMove
     * @description Voert de verplaatsing van de slang uit door de nieuwe positie van de kop te updaten,
     * op de oude positie een nieuw normaal segment toe te voegen en het staartelement te verwijderen
     * indien de kop geen voedsel is tegengekomen.
     * @param {string} direction de richting
     * @global
     */
    Snake.prototype.doMove = function() {
        //De segmenten van 'dit' slangobject:
        var segments = this.segments;

        //Kop toewijzen aan variabele en verwijderen uit array:
        var head = segments.pop();

        //Nieuw 'normaal' segment op de oude positie van de kop:
        segments.push(createSegment(head.x, head.y));

        //Update de nieuwe positie van de kop:
        updateHead(head, direction);

        //Verwijder het achterste segment, maar alleen indien geen voedsel tegengekomen:
        if (!encounterFood(head)) segments.shift();

        //Voeg de kop weer toe aan de array met segmenten:
        segments.push(head);
    }

    /**
     * @function encounterFood
     * @description Beoordeelt of er voedsel aanwezig is op de locatie waar de kop van de slang komt.
     * Als dit zo is dan wordt dit voedsel uit de foods-array verwijderd.
     * @param {Element} head de kop van de slang
     * @returns {boolean} true als er voedsel was, anders false
     */
    function encounterFood(head) {
        var encountered = false;
        foods.forEach(function (food, index) {
            if (food.x === head.x && food.y === head.y) {
                encountered = true;
                foods.splice(index, 1);
                console.log("Food.. yummie");
            }
        });
        return encountered;
    }

    /**
     * @function updateHead
     * @description Berekent en update de nieuwe positie van de kop van de slang
     * @param {Element} head de kop van de slang
     * @param {string} direction de richting
     */
    function updateHead(head, direction) {
        switch (direction) {
            case UP:
                head.y -= STEP;
                break;
            case DOWN:
                head.y += STEP;
                break;
            case LEFT:
                head.x -= STEP;
                break;
            case RIGHT:
                head.x += STEP;
                break;
            default:
                console.log("Unknown movement: " + direction + ". Can't update head.");
        }
    }

    /**
     * @constructor Element
     * @param {number} radius straal
     * @param {number} x x-coordinaat middelpunt
     * @param {number} y y-coordinaat middelpunt
     * @param {string} color kleur van het element
     */
    function Element(radius, x, y, color) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    /**
     * @function collidesWithOneOf
     * @description Controleert of 'dit' element dezelfde x en y heeft als
     * een van de elementen die als parameter worden meegegeven.
     * @param {Element[]} elements De array met elementen (slangsegmenten of foods)
     * @returns {boolean} Geeft true terug indien er sprake is van een collision
     * @global
     */
    Element.prototype.collidesWithOneOf = function (elements) {
        var x = this.x;
        var y = this.y;
        var collides = elements.some(function (element) {
            return (element.x === x && element.y === y);
        });
        return collides;
    }

    /**
     * @function createStartSnake
     * @description Slang creëren, bestaande uit twee segmenten in het midden van het veld
     */
    function createStartSnake() {
        var segments = [createSegment(R + WIDTH / 2, R + WIDTH / 2),
            createSegment(R + WIDTH / 2, WIDTH / 2 - R)];
        snake = new Snake(segments);
    }

    /**
     * @function createSegment
     * @description Slangsegment creëren op een bepaalde plaats
     * @param {number} x x-coordinaat middelpunt
     * @param {number} y y-coordinaart middelpunt
     * @returns {Element} element met straal R en color SNAKE
     */
    function createSegment(x, y) {
        return new Element(R, x, y, SNAKE);
    }

    /**
     * @function createFood
     * @description Voedselelement creëren op een bepaalde plaats
     * @param {number} x x-coordinaat middelpunt
     * @param {number} y y-coordinaart middelpunt
     * @returns {Element} element (x,y) met straal R en color FOOD
     */
    function createFood(x, y) {
        return new Element(R, x, y, FOOD);
    }

    /**
     * @function getRandomInt
     * @description Creëren van random geheel getal in het interval [min, max]
     * @param {number} min een geheel getal als onderste grenswaarde
     * @param {number} max een geheel getal als bovenste grenswaarde (max > min)
     * @returns {number} een random geheel getal x waarvoor geldt: min <= x <= max
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @function createFoods
     * @description [Element] array van random verdeelde voedselpartikelen
     */
    function createFoods() {
        var i,
            food;
        i = 0;
        while (i < NUMFOODS) {
            food = createFood(XMIN + getRandomInt(0, MAX) * STEP, YMIN + getRandomInt(0, MAX) * STEP);
            if (!food.collidesWithOneOf(snake.segments) && !food.collidesWithOneOf(foods)) {
                foods.push(food);
                i++;
            }
        }
    }

    return {
        init: init,
        stop: stop,
        moveLeft:  function() { setDirection(LEFT);  },
        moveUp:    function() { setDirection(UP);    },
        moveRight: function() { setDirection(RIGHT); },
        moveDown:  function() { setDirection(DOWN);  }
    }

})();
