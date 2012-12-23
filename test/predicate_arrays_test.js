buster.spec.expose();

describe("predicate.js with arrays", function () {
    var json = {
        gallery: {
            name: 'My holiday',
            photos: [
                {
                    url: 'photo1.png',
                    data: {
                        views: 2344
                    }
                },
                {
                    url: 'photo2.png',
                    data: {
                        views: 556
                    }
                },
                {
                    url: 'photo3.png',
                    data: {
                        views: 98
                    }
                }
            ]
        }
    };
    var p = predicate("gallery.photos.@sum(data.views)");

    it("predicate should return correct sum value", function () {
        expect(p(json)).toEqual(2344+556+98);
    });
});