Opdracht 3:


*** Algemeen ***

De functionaliteit is verdeeld over 3 bestanden, welke ieder een module bevatten.
    - snake-graphics.js heeft de taak om op het canvas te tekenen.
    - snake-logic.js bevat de business logic van het spel, hierin worden beslissingen genomen.
    - snake-control.js vangt de besturing van de gebruiker op en zet deze om in opdrachten voor de business logic.


*** snake-grapics.js ***

Bevat een module die een public api heeft met de volgende functies: init, clear en draw, bereikbaar
via de variabele 'graphics'. Deze module is niet afhankelijk van andere modules.


*** snake-logic.js ***

Bevat een module met de bedrijfslogica van het spel. De public api bestaat uit de volgende functies:
init, stop, moveLeft, moveUp, moveRight en moveDown.