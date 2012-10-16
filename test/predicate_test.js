var predicate = require('../lib/predicate.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['object properties'] = {
    setUp: function(done) {
        done();
    },

    'create predicate': function(test) {
        var pred = predicate('path');
        test.equal(typeof pred, 'function', 'Computed predicate should be a function');
        test.done();
    },

    'predicate with one property': function(test) {
        var p = predicate('path'),
            testString = 'this is a path property',
            o = { 'path': testString };

        test.equal(p(o), testString, 'Predicate should get proper value');
        test.done();
    },

    'predicate with multiple properties': function(test) {
        var p = predicate('path.to.property'),
            o = {
                path: {
                    to: {
                        property: true
                    }
                }
            };

        var result = p(o);
        test.equal(result, true, 'Predicate should get `true`');
        test.done();
    },

    'multiple call generated predicate': function(test) {
        var p = predicate('path.to.property'),
            o = {
                path: {
                    to: {
                        property: true
                    }
                }
            };

        test.equal(p(o), true, 'First call, predicate should get `true`');
        test.equal(p(o), true, 'Second call, predicate should get `true`');
        test.done();  
    },

    'conditional properties': function(test) {
        var p = predicate('path.to?.property'),
            properObj = {
                path: {
                    to: {
                        property: true
                    }
                }
            },
            invalidObj = {
                path: 'no path'
            };

        test.equal(p(properObj), true, 'Conditional predicate should return `true`');
        test.equal(p(invalidObj), null, 'Condtional predicate should return `null`');
        test.done();
    },/**/

    'tricky values and properties': function(test) {
        var p = predicate('path.to?.property?');

        test.equal(p({
            path: { 
                to: null 
            }
        }), null);

        test.equal(p({
            path: null
        }), null);

        test.equal(p({
            path: {
                to: []
            }
        }), null);

        test.throws(p({}), null, 'Should throw error');

        p = predicate('my.array');

        test.deepEqual(p({
            my: {
                array: [1,2,3]
            }
        }), [1,2,3], 'Should return array with proper values');

        test.done();
    }
};
