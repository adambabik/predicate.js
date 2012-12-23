buster.spec.expose();

describe("predicate.js with objects", function() {
    var json;

    beforeEach(function() {
        json = {
            gallery: {
                title: "Test gallery",
                date: "2011-12-12 22:33:02",
                author: {
                    name: "Johnny Novak",
                    city: "New York"
                }
            }
        };
    });

    it("access property on missing value wihout using Safe Navigation operator", function() {
        var testPredicate = predicate("gallery.location.city");
        expect(function() {
            testPredicate(json);
        }).toThrow("TypeError");

        testPredicate = predicate("test.test");
        expect(function() {
            testPredicate(json);
        }).toThrow("TypeError"); 

        testPredicate = predicate("test");
        expect(testPredicate(json)).toBeNull();
    });

    it("access existing property", function() {
        var testPredicate = predicate("gallery.date");
        expect(testPredicate(json)).toEqual("2011-12-12 22:33:02");
    });

    it("access non-existing property using Safe Navigation operator", function() {
        var testPredicate = predicate("gallery.location?.city");
        expect(testPredicate(json)).toBeNull();
    });
});