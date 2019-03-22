var assert = chai.assert;

describe("Tests voor snake.js", function () {
    describe("Functie collidesWithOneOf", function () {
        var myElements = [
            createSegment(40, 40),
            createSegment(40, 60),
            createSegment(40, 80)
        ];
        it("'Dit' element niet in elements", function () {
            var myElement = createSegment(100, 100);
            assert.isFalse(myElement.collidesWithOneOf(myElements));
        });
        it("'Dit' element wel in elements", function () {
            var myElement = createSegment(40, 60);
            assert.isTrue(myElement.collidesWithOneOf(myElements));
        });
    });
});