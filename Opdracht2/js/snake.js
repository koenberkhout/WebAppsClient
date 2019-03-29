const R      = 10,           // straal van een element
    STEP     = 2*R,          // stapgrootte
    WIDTH    = 360,          // breedte veld
    HEIGHT   = 360,          // hoogte veld
                             // er moet gelden: WIDTH = HEIGHT
    MAX      = WIDTH/STEP-1, // netto veldbreedte
    LEFT     = "left",       // bewegingsrichtingen
    RIGHT    = "right",
    UP       = "up",
    DOWN     = "down",

    NUMFOODS = 15,           // aantal voedselelementen

    XMIN     = R,            // minimale x waarde
    YMIN     = R,            // minimale y waarde
    XMAX     = WIDTH - R,    // maximale x waarde
    YMAX     = HEIGHT - R,   // maximale y waarde

    SNAKE    = "DarkRed" ,   // kleur van een slangsegment
    FOOD     = "Olive",      // kleur van voedsel
    HEAD     = "DarkOrange"; // kleur van de kop van de slang

var snake,
    foods = [];                // voedsel voor de slang

$(document).ready(function () {
    $("#startSnake").click(init);
    $("#stopSnake").click(stop);
});


/**
 * @function init
 * @description Haal eventueel bestaand voedsel en een bestaande slang weg,
 * creëer een slang, genereer voedsel, en teken alles
 */
function init() {
    snake = undefined;
    foods = [];
    createStartSnake();
    createFoods();
    draw();
}

/**
 * @function stop
 * @description Laat slang en voedsel verdwijnen, en teken leeg veld
 */
function stop() {
    snake = undefined;
    foods = [];
    $("#mySnakeCanvas").clearCanvas();
}

/**
 * @function move
 * @description Beweeg slang in aangegeven richting tenzij slang uit het canvas zou verdwijnen
 * @param {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
 */
function move(direction) {
    if (snake.canMove(direction)) {
        snake.doMove(direction);
        draw();
    } else {
        console.log("snake cannot move " + direction);
    }
}

/**
 * @function draw
 * @description Teken de slang en het voedsel op het canvas
 */
function draw() {
    var canvas = $("#mySnakeCanvas").clearCanvas();
    snake.segments.forEach(function (e) {
        drawElement(e, canvas);
    });
    foods.forEach(function (e) {
        drawElement(e, canvas);
    });
}

/**
 * @constructor Snake
 * @param {Element[]} segments een array met aaneengesloten slangsegmenten.
 * Het laatste element van segments wordt de kop van de slang.
 */
function Snake(segments) {
    var head = segments[segments.length - 1];
    head.color = HEAD;
    this.segments = segments;
}

/**
 * @function canMove
 * @description Controleert of de slang over de rand van het canvas zou lopen (false)
 * of binnen het canvas zou blijven (true) bij beweging in de aangegeven richting.
 * @param {string} direction De richting van de beweging
 * @returns {boolean} Geeft true terug indien mogelijk, en voor wat betreft de discussie omtrent multiple returns zie
 * {@link https://softwareengineering.stackexchange.com/questions/118703/where-did-the-notion-of-one-return-only-come-from#answer-118793}
 * @global
 */
Snake.prototype.canMove = function (direction) {
    var segments = this.segments;
    var head = segments[segments.length - 1];
    switch (direction) {
        case UP:
            return (head.y - STEP) >= YMIN;
        case DOWN:
            return (head.y + STEP) <= YMAX;
        case LEFT:
            return (head.x - STEP) >= XMIN;
        case RIGHT:
            return (head.x + STEP) <= XMAX;
    }
}

/**
 * @function doMove
 * @description Voert de verplaatsing van de slang uit door de nieuwe positie van het hoofd te updaten,
 * op de oude positie een nieuw normaal segment toe te voegen en het staartelement te verwijderen.
 * @param {string} direction de richting
 * @global
 */
Snake.prototype.doMove = function (direction) {
    //De segmenten van 'dit' slangobject:
    var segments = this.segments;

    //Hoofd toewijzen aan variabele en verwijderen uit array:
    var head = segments.pop();

    //Nieuw 'normaal' segment op de oude positie van het hoofd:
    segments.push(createSegment(head.x, head.y));

    //Update de nieuwe positie van het hoofd:
    updateHead(head, direction);

    //Verwijder het achterste segment, maar alleen indien geen voedsel tegengekomen:
    if (!encounterFood(head)) segments.shift();

    //Voeg het hoofd weer toe aan de array met segmenten:
    segments.push(head);
}

/**
 * @function encounterFood
 * @description Beoordeelt of er voedsel aanwezig is op de locatie waar het hoofd van de slang komt.
 * Als dit zo is dan wordt dit voedsel uit de foods-array verwijderd.
 * @param {Element} head het hoofd van de slang
 * @return {boolean} true als er voedsel was, anders false
 */
function encounterFood(head) {
    var encountered = false;
    foods.forEach(function (food, index) {
        if (food.x === head.x && food.y === head.y) {
            encountered = true;
            foods.splice(index, 1);
            console.log("food.. yummie");
        }
    });
    return encountered;
}

/**
 * @function updateHead
 * @description Berekent en update de nieuwe positie van het hoofd van de slang
 * @param {Element} head het hoofd van de slang
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
    var collides = false;
    elements.forEach(function (element) {
        if (element.x === x && element.y === y) {
            collides = true;
        }
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
 * @function drawElement
 * @description Een element tekenen op het canvas
 * @param {Element} element een Element object
 * @param canvas het tekenveld
 */
function drawElement(element, canvas) {
    canvas.drawArc({
        draggable: false,
        fillStyle: element.color,
        x: element.x,
        y: element.y,
        radius: element.radius
    });
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