Opdracht 3:


*** Verantwoordelijkheden ***

De functionaliteit is verdeeld over 5 bestanden, waarvan de eerste 4 ieder een module bevatten.
Zie voor de publieke api's de afbeelding 'klassendiagram.jpg' in de root folder.

1. snake-control.js (Module): vangt de besturing van de gebruiker op en zet deze om in opdrachten voor de business logic.

2. snake-logic.js (Module): bevat de business logic van het spel, hierin worden beslissingen genomen. Deze module stuurt
   ook de graphics- en persistence modules aan.

3. snake-persistence.js (Module): houdt de huidige score bij en biedt de mogelijkheid om deze score naar de server
   te uploaden. Daarnaast kunnen de totaalscores van de server worden opgehaald, welke vervolgens door
   de graphics-module kunnen worden weergegeven.

4. snake-graphics.js (Module): heeft de taak om op het canvas te tekenen en de visuele representatie van de huidige
   en op de server opgeslagen scores weer te geven. Na winst of verlies wordt er 'gewonnen' of 'verloren'
   weergegeven op het speelveld.

5. snake-init.js: geen module, maar in dit bestand wordt e.e.a geinitialiseerd 'on document ready'.


*** Afhankelijkheden ***

Zie de afhankelijkheden in de afbeelding 'klassendiagram.jpg' in de root folder.

1. snake-control.js is afhankelijk van snake-logic.js en maakt gebruik van deze module via de variabele 'logic'.
2. snake-logic.js is afhankelijk van snake-persistence.js en snake-graphics.js (via variabelen 'persistence' en 'graphics'.
3. snake-persistence is afhankelijk van snake-graphics.js en gebruikt deze via variabele 'graphics'.

Om het spel te initialiseren zodra de html is geladen wordt vanuit snake-init.js
code uit 'control' aangeroepen om het spel te kunnen starten.


*** Ajax ***

De huidige stand kan naar de server worden gestuurd (POST), de server verwacht hiervoor een json-representatie
van het aantal overwinningen en verliezen. De server telt deze stand op bij de totalen en geeft als responsebody
deze nieuw berekende totalen in json.

De totaalstand kan via de server worden opgevraagd (GET), de server geeft als responsebody de totalen, in json.

{
    "won" : 3,
    "lost" : 9
}