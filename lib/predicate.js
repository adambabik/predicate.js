/*
 * predicate
 * https://github.com/dreame4/predicate
 *
 * Copyright (c) 2012 Adam "dreame4" Babik
 * Licensed under the MIT license.
 */

var isConditionalProp = function(prop) {
    return prop.slice(-1) === '?';
};

var isObject = function(item) {
    return typeof item === 'object' && item !== null && !Array.isArray(item);
};

var iterator = function(obj, props) {
    var result = obj[props.shift()],
        p;

    while(props.length > 0) {
        p = props.shift();

        if(!isObject(result)) {
            if(isConditionalProp(p)) {
                return null;
            } else {
                throw new Error('Result must be an object to get its property');
            }
        }

        if(isConditionalProp(p)) {
            p = p.slice(0, p.length-1);
        }

        result = result[p];
    }

    return result;
};

var predicate = function(predicate) {
    if(typeof predicate !== 'string') {
        throw new Error('predicate must a string');
    }

    if(predicate === '') {
        throw new Error('predicate cannot be an empty string');
    }

    var props = predicate.split('.');

    return function(obj) {
        return iterator(obj, props.slice());
    };
};

module.exports = predicate;