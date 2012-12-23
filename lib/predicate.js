/*jshint node: true, browser: true, expr: true */

/*
 * predicate.js
 * https://github.com/dreame4/predicate.js
 *
 * Copyright (c) 2012 Adam Babik
 * Licensed under the MIT license.
 */

;(function(root) {
    'use strict';

    var index = 0;

    var isArray = (function() {
        if(typeof Array.isArray === "function") {
            return Array.isArray;
        } else {
            return function(item) {
                return Object.prototype.toString(item) === "[object Array]";
            };
        }
    }());

    var isObject = function(item) {
        return typeof item !== "undefined" && item !== null && Object.prototype.toString(item) === "[object Object]";
    };

    var isConditionalOperator = function(prop) {
        return prop.slice(-1) === '?';
    };

    var iterator = function(obj, tokens) {
        var length = tokens.length,
            value = obj[tokens[index++]] || null;

        var property;
        while(index < length) {
            property = tokens[index++];

            // value is an object and there is more tokens
            if(isObject(value) && !isArray(value)) {
                value = value[property];
                continue;
            }

            // value is not an object but previous property was optional
            if(!isObject(value) && isConditionalOperator(tokens[index-2])) {
                return null;
            }

            if(!isObject(value)) {
                throw new TypeError("Cannot get '" + property + "' of null");
            }
        }

        return value;
    };

    var predicate = function(predicate) {
        if(typeof predicate !== 'string') {
            throw new Error('Predicate must be a string');
        }

        if(predicate === '') {
            throw new Error('Predicate cannot be an empty string');
        }

        var tokens = predicate.split('.');

        return function(obj) {
            if(!isObject(obj)) {
                throw new TypeError("Predicate can be executed only on an object");
            }
            index = 0;
            // call Array#slice on the second argument to copy an array cause it may be modified
            return iterator(obj, tokens.slice());
        };
    };

    if (typeof module === 'object') {
        module.exports = predicate;
    } else if(root === window) {
        if (typeof window.predicate === 'undefined') {
            window.predicate = predicate;
        } else {
            // Huh? Something is already here.
            console.warn('Cannot initialize predicate.js. `window.predicate` is already taken.');
        }
    }

}((1,eval)('this')));